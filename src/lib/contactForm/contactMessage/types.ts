
export type ContactMessage = {
    name: string;
    email: string;
    message: string;
}

export interface ContactMessageInterface {
    sendMessage: (data: ContactMessage) => Promise<void>;
}

export class ContactMessageError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ContactMessageError';
        Object.setPrototypeOf(this, ContactMessageError.prototype);
    }
}