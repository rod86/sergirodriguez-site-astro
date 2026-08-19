export type ContactFormData = {
    name: string;
    email: string;
    message: string;
}

export interface ContactMessageInterface {
    sendMessage: (data: ContactFormData) => Promise<void>;
}