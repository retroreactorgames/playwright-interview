import { test } from "@playwright/test";
import DynamicallyLoadedPage from "../pages/dynamicallyLoadedPage";

test.describe("Dynamically Loaded Elements Tests", () => {
  let dynamicallyLoadedPage: DynamicallyLoadedPage;

  test.beforeEach(async ({ page }) => {
    dynamicallyLoadedPage = new DynamicallyLoadedPage(page);
  });

  test("The user waits for element on page that is hidden", async ({
    page,
  }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");
    await dynamicallyLoadedPage.clickToButtonToStartTest();
    await dynamicallyLoadedPage.WaitForLoadingBarToAppear();
    await dynamicallyLoadedPage.WaitForLoadingBarToDisappear();
    await dynamicallyLoadedPage.VerifyLoadingIsFinished();
  });

  test("The user waits for element rendered after the fact", async ({
    page,
  }) => {
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/2");
    await dynamicallyLoadedPage.clickToButtonToStartTest();
    await dynamicallyLoadedPage.WaitForLoadingBarToAppear();
    await dynamicallyLoadedPage.WaitForLoadingBarToDisappear();
    await dynamicallyLoadedPage.VerifyLoadingIsFinished();
  });
});
