import { Page, expect } from "@playwright/test";
import { LandingPageSelectors } from "../selectors/landing-page";
import {
  PRIVACY_POLICY_URL,
  SIGN_UP_INITIATED_URL,
  SIGN_UP_URL,
  TERMS_AND_CONDITIONS_URL,
} from "../constants";
import { SignUpPageSelectors } from "../selectors/sign-up-page";
import { faker } from "@faker-js/faker";
import { SignUpInitiatedPageSelectors } from "../selectors/sign-up-initiated-page";

export class SignUpJourney {
  readonly page: Page;
  readonly landingPage: LandingPageSelectors;
  readonly signUpPage: SignUpPageSelectors;
  readonly signUpInitiatedPage: SignUpInitiatedPageSelectors;

  constructor(page: Page) {
    this.page = page;
    this.landingPage = new LandingPageSelectors(this.page);
    this.signUpPage = new SignUpPageSelectors(this.page);
    this.signUpInitiatedPage = new SignUpInitiatedPageSelectors(this.page);
  }

  async clickMenuButton() {
    await this.landingPage.menuButton.click();
  }

  async clickSignUp() {
    await this.landingPage.signUpButton.click();
  }

  async clickOpenAccount() {
    await this.landingPage.openAccountButton.first().click();
  }

  async clickApplyForAccount() {
    await this.landingPage.applyForAccountButton.click();
  }

  async validateSignUpPage() {
    await expect(this.page).toHaveURL(SIGN_UP_URL);
    await expect.soft(this.signUpPage.signUpHeading).toBeVisible();
  }

  async enterUserEmail(validEmail: boolean) {
    const userEmail = validEmail
      ? faker.internet.email()
      : faker.person.firstName();
    await this.signUpPage.emailInput.fill(userEmail);
  }

  async submit() {
    await this.signUpPage.submitButton.click();
  }

  async validateSignUpInitiatedPage() {
    await expect(this.page).toHaveURL(SIGN_UP_INITIATED_URL);
    await expect
      .soft(this.signUpInitiatedPage.signUpInitiatedHeading)
      .toBeVisible();
    await expect.soft(this.signUpInitiatedPage.qrCode).toBeVisible();
  }

  async navigateDirectToSignUp() {
    await this.page.goto(SIGN_UP_URL);
  }

  async validateNoEmailError() {
    await expect(this.signUpPage.noEmailError).toBeVisible();
  }

  async validateInvalidEmailError() {
    await expect(this.signUpPage.invalidEmailError).toBeVisible();
  }

  async viewTermsAndConditions() {
    await this.signUpPage.termsAndConditions.click();
  }

  async validateTermsAndConditionsPage() {
    await expect(this.page).toHaveURL(TERMS_AND_CONDITIONS_URL);
  }

  async viewPrivacyPolicy() {
    await this.signUpPage.privacyPolicy.click();
  }

  async validatePrivacyPolicyPage() {
    await expect(this.page).toHaveURL(PRIVACY_POLICY_URL);
  }
}
