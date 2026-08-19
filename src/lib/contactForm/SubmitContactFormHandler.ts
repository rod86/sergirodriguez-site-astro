import z from "astro/zod";
import type {ContactMessage, ContactMessageInterface} from "@lib/contactForm/contactMessage/types.ts";


const contactDataSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    message: z.string().min(2),
});

export type SubmitContactFormRequest = {
    name?: string;
    email?: string;
    message?: string;
}

export class SubmitContactFormHandler {
    constructor(
        private readonly contactMessage: ContactMessageInterface
    ) {}

    async invoke(data: SubmitContactFormRequest): Promise<void> {
        const validation = contactDataSchema.safeParse(data);
        if (!validation.success) {
            throw new Error('Please fill in all fields correctly');
        }

        try {
            await this.contactMessage.sendMessage(data as ContactMessage);
        } catch (error) {
            throw new Error('Failed to send a contact message', { cause: error });
        }
    }
}