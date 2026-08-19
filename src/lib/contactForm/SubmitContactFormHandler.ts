import type {ContactFormData, ContactMessageInterface} from "@lib/contactForm/types.ts";

export class SubmitContactFormHandler {
    constructor(
        private readonly contactMessage: ContactMessageInterface
    ) {}

    async invoke(data: ContactFormData): Promise<void> {
        try {
            await this.contactMessage.sendMessage(data);
        } catch {
            throw new Error('Failed to send a contact message')
        }
    }
}