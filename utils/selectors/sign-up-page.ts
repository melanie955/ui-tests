import { Locator, Page } from "@playwright/test";

export class SignUpPageSelectors {
  readonly page: Page;
  readonly signUpHeading: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly termsAndConditions: Locator;
  readonly privacyPolicy: Locator;
  readonly invalidEmailError: Locator;
  readonly noEmailError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpHeading = this.page.getByRole("heading", {
      name: "Start your application",
    });
    this.emailInput = this.page.getByLabel("Email address *");
    this.submitButton = this.page.getByRole("button", { name: "Submit" });
    this.termsAndConditions = this.page.getByRole("link", {
      name: "Terms and Conditions",
    });
    this.privacyPolicy = this.page.getByRole("link", {
      name: "Privacy Policy",
    });
    this.noEmailError = this.page.getByText("Please enter an email address");
    this.invalidEmailError = this.page.getByText(
      "Please enter a valid email address",
    );
  }
}
