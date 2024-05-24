import { test } from "@playwright/test";
import DropdownPage from "../pages/dropdownPage";

test.describe("Dropdown Tests", () => {
  let dropdownPage: DropdownPage;

  test.beforeEach(async ({ page }) => {
    dropdownPage = new DropdownPage(page);
    await page.goto("https://the-internet.herokuapp.com/dropdown");
  });

  test("The user selects option 1", async () => {
    await dropdownPage.selectOptionByIndex(1);
    await dropdownPage.VerifyWhichIsSelectedByIndex(1);
  });

  test("The user selects option 1 and then select option 2", async () => {
    await dropdownPage.selectOptionByIndex(1);
    await dropdownPage.selectOptionByIndex(2);
    await dropdownPage.VerifyWhichIsSelectedByIndex(2);
  });

  test("The user selects option 1 and cannot select option 0", async () => {
    //Using the documented method from Playwright, I can actually select the index 0,
    //So I imagine there is a bug in the website since my test is failing
    await dropdownPage.selectOptionByIndex(1);
    await dropdownPage.selectOptionByIndex(0);
    await dropdownPage.VerifyWhichIsSelectedByIndex(1); //Failing on purpose
  });
});
