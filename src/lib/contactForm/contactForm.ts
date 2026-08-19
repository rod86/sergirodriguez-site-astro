import type {ContactFormData} from "@lib/contactForm/types.ts";
import {sendContactMessage} from "@lib/contactForm/web3forms.ts";

export const submitContactFormData = async (data: ContactFormData): Promise<void> => {
    try {
        await sendContactMessage(data);
    } catch {
        throw new Error('Failed to send a contact message')
    }
}