import type {Mocked} from "vitest";
import type {ContactMessageInterface} from "@lib/contactForm/types.ts";
import {SubmitContactFormHandler} from "@lib/contactForm/SubmitContactFormHandler.ts";

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
        vi.mocked(contactMessageMock.sendMessage).mockRejectedValue(new Error('Unable to send a contact message: limit quota reached'));

        await expect(
            handler.invoke(contactData)
        ).rejects.toThrow(new Error('Failed to send a contact message'));
    });
});