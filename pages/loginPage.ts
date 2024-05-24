import { Page, Locator, expect } from "@playwright/test";

export default class LoginPage {
  private usernameField: Locator;
  private passwordField: Locator;
  private submitButton: string;
  private logoutButton: string;
  private loginSuccessBanner: string;
  private invalidUserText: string;
  private invalidPasswordText: string;

  constructor(public page: Page) {
    this.usernameField = this.page.locator("#username");
    this.passwordField = this.page.locator("#password");
    this.submitButton = "'Login'"; //For the lack of ids and failing for attributes like "type" I decided to use text to keep it simple and fast.
    this.logoutButton = "'Logout'";
    this.loginSuccessBanner = ".flash.success";
    this.invalidUserText = "'Your username is invalid!'";
    this.invalidPasswordText = "'Your password is invalid!'";
  }

  async fillUsername(username: string) {
    await this.usernameField.waitFor();
    await this.usernameField.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordField.waitFor();
    await this.passwordField.fill(password);
  }

  async clickSubmitButton() {
    await this.page.click(this.submitButton);
  }

  async verifyUserSuccessfulLogin() {
    await expect(this.page.locator(this.loginSuccessBanner)).toBeVisible();
    await expect(this.page.locator(this.logoutButton)).toBeVisible();
  }

  async verifyInvalidUsernameElements() {
    await expect(this.page.locator(this.invalidUserText)).toBeVisible();
    await expect(this.page.locator(this.logoutButton)).toBeHidden();
  }

  async verifyInvalidPasswordElements() {
    await expect(this.page.locator(this.invalidPasswordText)).toBeVisible();
    await expect(this.page.locator(this.logoutButton)).toBeHidden();
  }
}
