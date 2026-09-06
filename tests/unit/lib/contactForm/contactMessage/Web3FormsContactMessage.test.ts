import {Web3FormsContactMessage} from "@lib/contactForm/contactMessage/Web3FormsContactMessage.ts";
import {ContactMessageError} from "@lib/contactForm/contactMessage/types.ts";

const contactData = {
    name: 'John Smith',
    email: 'johnsmith@example.org',
    message: 'Hi, I have a project proposal for you',
}
const accessKey = "test-access-key";

describe('Web3Forms Contact Message', () => {
    const fetchMock = vi.fn();

    let service: Web3FormsContactMessage;
    beforeEach(() => {
        fetchMock.mockReset();
        vi.stubGlobal('fetch', fetchMock);
        vi.resetAllMocks();
        service = new Web3FormsContactMessage(accessKey);
    });

    it('sends a contact message successfully', async () => {
        const apiResponse = {
            "success": true,
            "data": contactData,
            "message": "Form submitted successfully!"
        }
        fetchMock.mockResolvedValueOnce({
            ok: true,
            status: 200,
            json:  () => Promise.resolve(apiResponse),
        });
        const formData = new FormData();
        formData.append("name", contactData.name);
        formData.append("email", contactData.email);
        formData.append("message", contactData.message);
        formData.append("access_key", accessKey);
        const body = JSON.stringify(Object.fromEntries(formData));

        const result = await service.sendMessage(contactData);
        expect(fetchMock).toHaveBeenCalledWith(
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
        expect(result).toBeUndefined();
    });

    it.each([
        { status: 200, apiResponse: {"success": false, "message": "Too Many Requests!"}, expectedMessage: "Too Many Requests!" },
        { status: 500, apiResponse: {"success": false, "message": "Something went wrong on server"}, expectedMessage: "Something went wrong on server" },
        { status: 500, apiResponse: {"success": false, "error": "Something went wrong on server"}, expectedMessage: "Something went wrong on server" },
    ])('fails to send message ($expectedMessage)', async ({ status, apiResponse, expectedMessage}) => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            status,
            json:  () => Promise.resolve(apiResponse),
        });

        await expect(
            service.sendMessage(contactData)
        ).rejects.toThrow(new ContactMessageError(`Failed to send a message: ${expectedMessage}`));
    });
})