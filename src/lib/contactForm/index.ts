import {Web3FormsContactMessage} from "@lib/contactForm/contactMessage/Web3FormsContactMessage.ts";
import {SendContactMessageHandler} from "@lib/contactForm/SendContactMessageHandler.ts";

const web3formsContactMessage = new Web3FormsContactMessage(
    import.meta.env.PUBLIC_WEB3FORMS_ACCESS_TOKEN
);

export const sendContactFormMessageHandler = new SendContactMessageHandler(web3formsContactMessage);