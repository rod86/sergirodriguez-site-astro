import {Web3FormsContactMessage} from "@lib/contactForm/contactMessage/Web3FormsContactMessage.ts";
import {SendContactMessageHandler} from "@lib/contactForm/SendContactMessageHandler.ts";
import config from "@config";

const web3formsContactMessage = new Web3FormsContactMessage(config.web3Forms.accessToken);

export const sendContactFormMessageHandler = new SendContactMessageHandler(web3formsContactMessage);