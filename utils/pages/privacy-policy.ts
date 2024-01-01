import { Page } from "playwright-core";
import { expect } from "playwright/test";
import { PRIVACY_POLICY_URL } from "../constants";

export class PrivacyPolicyPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validatePrivacyPolicyPage() {
    await expect(this.page).toHaveURL(PRIVACY_POLICY_URL);
  }
}
