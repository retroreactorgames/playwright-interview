import { chromium, test } from "@playwright/test";
import LoginPage from "../pages/loginPage";

test.describe("Login Tests", () => {
  let login: LoginPage;
  const correctUsername = "tomsmith";
  const incorrectUsername = "tomsmithh";
  const correctPassword = "SuperSecretPassword!";
  const incorrectPassword = "SuperSecretPassword";

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await page.goto("https://the-internet.herokuapp.com/login");
  });

  test("The user logs in successfully", async ({ page }) => {
    await login.fillUsername(correctUsername);
    await login.fillPassword(correctPassword);
    await login.clickSubmitButton();
    await login.verifyUserSuccessfulLogin();
  });

  test("The user fails to login because of an invalid username", async ({
    page,
  }) => {
    await login.fillUsername(incorrectUsername);
    await login.fillPassword(correctPassword);
    await login.clickSubmitButton();
    await login.verifyInvalidUsernameElements();
  });

  test("The user fails to login because of an invalid password", async ({
    page,
  }) => {
    await login.fillUsername(correctUsername);
    await login.fillPassword(incorrectPassword);
    await login.clickSubmitButton();
    await login.verifyInvalidPasswordElements();
  });
});
