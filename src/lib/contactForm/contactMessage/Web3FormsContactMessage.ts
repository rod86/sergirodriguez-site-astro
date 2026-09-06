import {
    type ContactMessage,
    ContactMessageError,
    type ContactMessageInterface
} from "@lib/contactForm/contactMessage/types.ts";


export class Web3FormsContactMessage implements ContactMessageInterface {
    constructor(
        private readonly accessKey: string
    ) {}

    async sendMessage(data: ContactMessage): Promise<void> {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("message", data.message);
        formData.append("access_key", this.accessKey);
        const body = JSON.stringify(Object.fromEntries(formData));

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body
            }
        );

        const json = await response.json();
        if (!response.ok || !json.success) {
            throw new ContactMessageError("Failed to send a message: " + (json.message ?? json.error));
        }
    }
}