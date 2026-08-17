import {submitContactForm} from "@lib/contactForm/contactForm.ts";

const contactData = {
    name: 'John Smith',
    email: 'johnsmith@example.org',
    message: 'Hi, I have a project proposal for you',
}
const accessToken = "test-access-token";


describe('Contact Form', () => {
    const fetchMock = vi.fn();

    beforeEach(() => {
        fetchMock.mockReset();
        vi.stubGlobal('fetch', fetchMock);
        vi.stubEnv('PUBLIC_WEB3FORMS_ACCESS_TOKEN', accessToken);
    });

    it('sends a contact message successfully', async () => {
        const apiResponse = {
            "success": true,
            "data": contactData,
            "message": "Form submitted successfully!"
        }
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json:  () => Promise.resolve(apiResponse),
        });
        const formData = new FormData();
        formData.append("name", contactData.name);
        formData.append("email", contactData.email);
        formData.append("message", contactData.message);
        formData.append("access_key", accessToken);
        const body = JSON.stringify(Object.fromEntries(formData));

        const result = await submitContactForm(contactData);
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
            submitContactForm(contactData)
        ).rejects.toThrow(new Error(`Failed to send a message: ${expectedMessage}`));
    });
});