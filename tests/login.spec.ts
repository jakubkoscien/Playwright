import { test, expect } from '../src/fixtures/testFixtures';
import fs from 'fs';

const validUsers : [] = JSON.parse(fs.readFileSync('./src/utils/validLoginUser.json', 'utf-8'));

test.describe('Login Tests', () => {

    for (const {email, password} of validUsers) {
        test("Sign in using valid user credentials", async({loginPage}) => {
            await loginPage.signIn(email, password);
            await expect(loginPage.successMessage).toBeVisible();
        });
    }

    test("Sign in using invalid user credentials", async({loginPage}) => {
        await loginPage.signIn("invalidMail@invalid.com", "invalidPassword");
        await expect(loginPage.failureMessage).toBeVisible();
    });

    test("Checking UI elements on Login Page", async({loginPage}) => {
        await expect(loginPage.emailInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.signinButton).toBeVisible();
        await expect(loginPage.forgotPasswordButton).toBeVisible();
        await expect(loginPage.registerButton).toBeVisible();
    });

    test("Sign in with empty credentials", async({loginPage}) => {
        await loginPage.fillCredentials();
        await loginPage.signinButton.isEnabled().then( async (isEnabled) => {
            if (isEnabled) {
                await loginPage.signinButton.click();
            }
        });
        await expect(loginPage.emptyCredentialsMessage).toBeVisible();
    });    

    test("Verify password field is masked", async({loginPage}) => {
        const passwordFieldType = await loginPage.passwordInput.getAttribute('type');
        expect(passwordFieldType).toBe('password');
    });

    test("Sign in with empty password field", async({loginPage}) => {
        await loginPage.signIn("validEmail@example.com");
        await expect(loginPage.emptyPasswordFieldMessage).toBeVisible();
    });

    test("Verify html login format validation", async({loginPage}) => {
        await loginPage.signIn("invalidEmailFormat");
        const validationMessage = await loginPage.emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
        expect(validationMessage).toContain("Please include an '@' in the email address. 'invalidEmailFormat' is missing an '@'.");
    });
});
