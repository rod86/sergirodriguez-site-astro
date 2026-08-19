import type {SendContactMessageFunction} from "@lib/contactForm/types.ts";

export const sendContactMessage: SendContactMessageFunction = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    formData.append("access_key", import.meta.env.PUBLIC_WEB3FORMS_ACCESS_TOKEN);
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
        throw new Error("Failed to send a message: " + (json.message ?? json.error));
    }
}