import type {ContactFormData, ContactMessageInterface} from "@lib/contactForm/types.ts";
import z from "astro/zod";

const contactDataSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    message: z.string().min(2),
});

export class SubmitContactFormHandler {
    constructor(
        private readonly contactMessage: ContactMessageInterface
    ) {}

    async invoke(data: ContactFormData): Promise<void> {
        const validation = contactDataSchema.safeParse(data);
        if (!validation.success) {
            throw new Error('Please fill in all fields correctly');
        }

        try {
            await this.contactMessage.sendMessage(data);
        } catch {
            throw new Error('Failed to send a contact message')
        }
    }
}