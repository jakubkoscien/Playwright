import { Page, Locator } from '@playwright/test';

export default class LoginPage{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signinButton: Locator;
    readonly successMessage: Locator;
    readonly failureMessage: Locator;
    readonly emptyCredentialsMessage: Locator;
    readonly emptyPasswordFieldMessage: Locator;
    readonly registerButton: Locator;
    readonly forgotPasswordButton: Locator;

    constructor (page: Page){
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.signinButton = page.getByRole('button', { name: 'Sign in' })
        this.successMessage = page.getByText('Login Successful! Welcome to Premium Banking.');
        this.failureMessage = page.getByText('Invalid email id and password');
        this.emptyCredentialsMessage = page.getByText('Email and Password are required');
        this.emptyPasswordFieldMessage = page.getByText('Password is required');
        this.registerButton = page.getByRole('link', { name: 'Register now' })
        this.forgotPasswordButton = page.getByRole('link', { name: 'Forgot password?' })
    }
        
    async goto() {
        await this.page.goto("https://testerbud.com/practice-login-form");
    }

    async fillCredentials(username: string = "", password: string = "") {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async signIn(username: string = "", password: string = "") {
        await this.fillCredentials(username, password);
        await this.signinButton.click();
    }
}