export type ContactFormData = {
    name: string;
    email: string;
    message: string;
}

export type SendContactMessageFunction = (data: ContactFormData) => Promise<void>;