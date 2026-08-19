import type {Mocked} from "vitest";
import {ContactMessageError, type ContactMessageInterface} from "@lib/contactForm/contactMessage/types.ts";
import {SubmitContactFormHandler, type SubmitContactFormRequest} from "@lib/contactForm/SubmitContactFormHandler.ts";

const contactData = {
    name: 'John Smith',
    email: 'johnsmith@example.org',
    message: 'Hi, I have a project proposal for you',
}

describe('Submit Contact Form Handler', () => {
    const contactMessageMock: Mocked<ContactMessageInterface> = {
        sendMessage: vi.fn(),
    }

    let handler: SubmitContactFormHandler;
    beforeEach(() => {
        vi.resetAllMocks();

        handler = new SubmitContactFormHandler(contactMessageMock);
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

    it.each<[string, unknown]>([
        ['Empty object', {}],
        ['Invalid email', { ...contactData, email: 'invalid-email' }],
    ])('Validation fails %s', async (_, values) => {
        await expect(
            handler.invoke(values as SubmitContactFormRequest)
        ).rejects.toThrow(new Error('Please fill in all fields correctly'));
    });
});