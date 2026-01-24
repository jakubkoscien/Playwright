import { test, expect } from '../src/fixtures/testFixtures';
import fs from 'fs';

const usersToRegister : [] = JSON.parse(fs.readFileSync('./src/utils/registerUser.json', 'utf-8'));

test.describe("Register Tests", async() => {

    for(const {email, password} of usersToRegister) {   
        test("Successful user registration", async({registerPage}) => {
            await registerPage.register(email, password);
            expect(registerPage.successMessage).toBeVisible();
        });
    };

    test("Registry with empty email", async({registerPage}) => {
        await registerPage.register();
        expect(registerPage.emailAlert).toBeVisible();
    });
})