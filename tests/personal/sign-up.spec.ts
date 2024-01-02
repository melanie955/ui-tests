import { test } from "@playwright/test";
import { LandingPage } from "../../utils/pages/landing-page";
import { SignUpInitiatedPage } from "../../utils/pages/sign-up-initiated";
import { TermsAndConditionsPage } from "../../utils/pages/terms-and-conditions";
import { PrivacyPolicyPage } from "../../utils/pages/privacy-policy";
import { SignUpPage } from "../../utils/pages/sign-up";

test.describe("signing up to a personal Monzo account", () => {
  test.beforeEach(async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto();
  });

  test("e2e sign up via landing page", async ({ page }) => {
    const landingPage = new LandingPage(page);

    await landingPage.clickOpenAccount();

    const signUpPage = new SignUpPage(page);

    await signUpPage.validateSignUpPage();

    await signUpPage.enterUserEmail();
    await signUpPage.submit();

    const signUpInitiatedPage = new SignUpInitiatedPage(page);

    await signUpInitiatedPage.validateSignUpInitiatedPage();
  });

  test("start sign up via nav bar", async ({ page, isMobile }) => {
    const landingPage = new LandingPage(page);

    // opens nav bar menu if user is on mobile
    if (isMobile) {
      await landingPage.clickMenuButton();
    }

    await landingPage.clickSignUp();

    const signUpPage = new SignUpPage(page);

    await signUpPage.validateSignUpPage();
  });

  test("start sign up via apply for account banner", async ({ page }) => {
    const landingPage = new LandingPage(page);

    await landingPage.clickApplyForAccount();

    const signUpPage = new SignUpPage(page);

    await signUpPage.validateSignUpPage();
  });

  test("view terms and conditions during sign up", async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.goto();

    await signUpPage.viewTermsAndConditions();

    const termsAndConditionsPage = new TermsAndConditionsPage(page);

    await termsAndConditionsPage.validateTermsAndConditionsPage();
  });

  test("view privacy policy during sign up", async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.goto();

    await signUpPage.viewPrivacyPolicy();

    const privacyPage = new PrivacyPolicyPage(page);

    await privacyPage.validatePrivacyPolicyPage();
  });

  test("sign up with an invalid email", async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.goto();

    await signUpPage.enterUserEmail(false);
    await signUpPage.submit();

    await signUpPage.validateInvalidEmailError();

    await signUpPage.validateSignUpPage();
  });

  test("sign up without providing an email", async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.goto();

    await signUpPage.submit();

    await signUpPage.validateNoEmailError();

    await signUpPage.validateSignUpPage();
  });
});
