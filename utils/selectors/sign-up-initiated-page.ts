import { Locator, Page } from "@playwright/test";

export class SignUpInitiatedPageSelectors {
  readonly page: Page;
  readonly signUpInitiatedHeading: Locator;
  readonly qrCode: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpInitiatedHeading = this.page.getByRole("heading", {
      name: "Finish on the mobile app",
    });
    this.qrCode = this.page.locator("#mainContent").getByRole("img");
  }
}
