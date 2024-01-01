import { Page, expect } from "@playwright/test";
import { TERMS_AND_CONDITIONS_URL } from "../constants";

export class TermsAndConditionsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validateTermsAndConditionsPage() {
    await expect(this.page).toHaveURL(TERMS_AND_CONDITIONS_URL);
  }
}
