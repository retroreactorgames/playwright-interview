import { Page, Locator, expect } from "@playwright/test";

export default class DropdownPage {
  private dropdown: Locator;
  private option0: string;
  private option1: string;
  private option2: string;
  private dropdownHeader: Locator;

  constructor(public page: Page) {
    this.dropdown = this.page.locator("#dropdown");
    this.option0 = 'option[value=""]';
    this.option1 = 'option[value="1"]';
    this.option2 = 'option[value="2"]';
  }

  async selectOptionByIndex(value: number) {
    await this.dropdown.selectOption({ index: value });
  }

  async VerifyWhichIsSelectedByIndex(index: number) {
    const selector = this[`option${index}`];
    await expect(this.page.locator(selector)).toHaveAttribute("selected");
  }
}
