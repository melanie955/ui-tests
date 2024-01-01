import { Locator, Page, expect } from "@playwright/test";
import { SIGN_UP_INITIATED_URL } from "../constants";

export class SignUpInitiatedPage {
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

  async validateSignUpInitiatedPage() {
    await expect(this.page).toHaveURL(SIGN_UP_INITIATED_URL);
    await expect.soft(this.signUpInitiatedHeading).toBeVisible();
    await expect.soft(this.qrCode).toBeVisible();
  }
}
