import { Locator, Page } from "@playwright/test";
import { MONZO_URL } from "../constants";

export class LandingPage {
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

  async goto() {
    await this.page.goto(MONZO_URL);

    // move mouse so cookies banner appears
    await this.page.mouse.up();

    await this.acceptCookies.click();
  }

  async clickMenuButton() {
    await this.menuButton.click();
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async clickOpenAccount() {
    await this.openAccountButton.first().click();
  }

  async clickApplyForAccount() {
    await this.applyForAccountButton.click();
  }
}
