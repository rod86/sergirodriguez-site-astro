import type {Mocked} from "vitest";
import {ContactMessageError, type ContactMessageInterface} from "@lib/contactForm/contactMessage/types.ts";
import {SendContactMessageHandler, type SendContactMessageRequest} from "@lib/contactForm/SendContactMessageHandler.ts";

const contactData = {
    name: 'John Smith',
    email: 'johnsmith@example.org',
    message: 'Hi, I have a project proposal for you',
}

describe('Send Contact Message Handler', () => {
    const contactMessageMock: Mocked<ContactMessageInterface> = {
        sendMessage: vi.fn(),
    }

    let handler: SendContactMessageHandler;
    beforeEach(() => {
        vi.resetAllMocks();

        handler = new SendContactMessageHandler(contactMessageMock);
    });

    it('sends a contact message successfully', async () => {
        await handler.invoke(contactData);
        expect(contactMessageMock.sendMessage).toHaveBeenCalledWith(contactData);
    });

    it('fails to send a contact message', async () => {
        const originalError = new ContactMessageError('Unable to send a contact message: limit quota reached');
        vi.mocked(contactMessageMock.sendMessage).mockRejectedValue(originalError);

        await expect(
            handler.invoke(contactData)
        ).rejects.toThrow(new Error('Failed to send a contact message', { cause: originalError }));
    });

    it('fails to send a message when terms are accepted (honeypot)', async () => {
        await expect(
            handler.invoke({ ...contactData, terms: true })
        ).rejects.toThrow(new Error('Failed to send a contact message'));
        expect(contactMessageMock.sendMessage).not.toHaveBeenCalled();
    });

    it.each<[string, unknown]>([
        ['Empty object', {}],
        ['Invalid email', { ...contactData, email: 'invalid-email' }],
    ])('Validation fails %s', async (_, values) => {
        await expect(
            handler.invoke(values as SendContactMessageRequest)
        ).rejects.toThrow(new Error('Please fill in all fields correctly'));
    });
});