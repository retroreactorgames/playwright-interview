import { Page, Locator, expect } from "@playwright/test";

export default class DynamicallyLoadedPage {
  private loadingBar: Locator;
  private startButton: string;
  private finishedText: Locator;

  constructor(public page: Page) {
    this.loadingBar = this.page.locator("#loading");
    this.startButton = 'button:has-text("start")'; //the id is not getting the button properly
    this.finishedText = this.page.locator("#finish");
  }

  async clickToButtonToStartTest() {
    await this.page.locator(this.startButton).waitFor();
    await this.page.locator(this.startButton).click();
  }

  async WaitForLoadingBarToAppear(timeout: number = 30000) {
    await this.loadingBar.waitFor();
    await expect(this.loadingBar).toBeVisible({ timeout });
  }

  async WaitForLoadingBarToDisappear(timeout: number = 30000) {
    await this.loadingBar.waitFor();
    await expect(this.loadingBar).toBeHidden({ timeout });
  }

  async VerifyLoadingIsFinished() {
    await this.finishedText.waitFor();
    await expect(this.finishedText).toBeVisible();
  }
}
