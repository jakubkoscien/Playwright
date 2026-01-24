import { Page, Locator } from '@playwright/test';

export default class RegisterPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly backToLoginPageButton: Locator;
    readonly signInLink: Locator;
    readonly successMessage: Locator;
    readonly emailAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByLabel("Email Address");
        this.passwordInput = page.getByLabel("Password", {exact: true});
        this.confirmPasswordInput = page.getByLabel("Confirm Password")
        this.registerButton = page.getByRole("button", {name: 'Register'});
        this.backToLoginPageButton = page.getByRole("button", {name: "Back To Login Page"})
        this.signInLink = page.getByRole("link", {name: "Sign in"});
        this.successMessage = page.getByText('Registration Successful');
        this.emailAlert = page.getByRole("alert").filter({ hasText: "Email is required" })
    }

    async goto() {
        await this.page.goto("https://testerbud.com/register");
    }

    async fillCredentials(email: string = "", password: string = "") {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
    }

    async register(email: string = "", password: string ="") {
        await this.fillCredentials(email, password);
        await this.registerButton.click();
    }
}
