import {vi} from "vitest";
import { sendContactMessage } from "@lib/contactForm/web3forms.ts";
import {submitContactFormData} from "@lib/contactForm/contactForm.ts";

vi.mock('@lib/contactForm/web3forms.ts', () => ({
    sendContactMessage: vi.fn(),
}));

const contactData = {
    name: 'John Smith',
    email: 'johnsmith@example.org',
    message: 'Hi, I have a project proposal for you',
}

describe('Contact Form', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('sends a contact message successfully', async () => {
        await submitContactFormData(contactData);
        expect(sendContactMessage).toHaveBeenCalledWith(contactData);
    });
});