import { Locator, Page, expect } from "@playwright/test";
import { SIGN_UP_URL } from "../constants";
import { faker } from "@faker-js/faker";

export class SignUpPage {
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

  async goto() {
    await this.page.goto(SIGN_UP_URL);
  }

  async validateSignUpPage() {
    await expect(this.page).toHaveURL(SIGN_UP_URL);
    await expect.soft(this.signUpHeading).toBeVisible();
  }

  async enterUserEmail(validEmail: boolean) {
    const userEmail = validEmail
      ? faker.internet.email()
      : faker.person.firstName();
    await this.emailInput.fill(userEmail);
  }

  async submit() {
    await this.submitButton.click();
  }

  async validateNoEmailError() {
    await expect(this.noEmailError).toBeVisible();
  }

  async validateInvalidEmailError() {
    await expect(this.invalidEmailError).toBeVisible();
  }

  async viewPrivacyPolicy() {
    await this.privacyPolicy.click();
  }

  async viewTermsAndConditions() {
    await this.termsAndConditions.click();
  }
}
