import z from "astro/zod";
import type {ContactMessage, ContactMessageInterface} from "@lib/contactForm/contactMessage/types.ts";


const contactDataSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    message: z.string().min(2),
});

export type SendContactMessageRequest = {
    name?: string;
    email?: string;
    message?: string;
    terms?: boolean;
}

export class SendContactMessageHandler {
    constructor(
        private readonly contactMessage: ContactMessageInterface
    ) {}

    async invoke(data: SendContactMessageRequest): Promise<void> {
        const validation = contactDataSchema.safeParse(data);
        if (!validation.success) {
            throw new Error('Please fill in all fields correctly');
        }

        if (data.terms !== undefined && data.terms) {
            throw new Error('Failed to send a contact message');
        }

        try {
            await this.contactMessage.sendMessage(data as ContactMessage);
        } catch (error) {
            throw new Error('Failed to send a contact message', { cause: error });
        }
    }
}