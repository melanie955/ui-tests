import { Locator, Page } from "@playwright/test";

export class LandingPageSelectors {
  readonly page: Page;
  readonly signUpButton: Locator;
  readonly acceptCookies: Locator;
  readonly openAccountButton: Locator;
  readonly applyForAccountButton: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = this.page.getByRole("menuitem", { name: "Sign up" });
    this.acceptCookies = this.page.getByRole("button", { name: "Accept" });
    this.openAccountButton = this.page.getByText("Open a Monzo account");
    this.applyForAccountButton = this.page.getByText(
      "Apply for a Monzo account",
    );
    this.menuButton = this.page.getByLabel("Open navigation");
  }
}
