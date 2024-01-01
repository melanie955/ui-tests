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

    // click open account on landing page
    await landingPage.clickOpenAccount();

    // check user is taken to the sign up page
    const signUpPage = new SignUpPage(page);
    await signUpPage.validateSignUpPage();

    // enter valid user email and submit
    await signUpPage.enterUserEmail(true);
    await signUpPage.submit();

    // check user is taken to the sign up initiated page
    const signUpInitiatedPage = new SignUpInitiatedPage(page);
    await signUpInitiatedPage.validateSignUpInitiatedPage();
  });

  test("start sign up via nav bar", async ({ page, isMobile }) => {
    const landingPage = new LandingPage(page);

    // user opens nav bar on mobile
    if (isMobile) {
      await landingPage.clickMenuButton();
    }

    // click sign up button from nav bar
    await landingPage.clickSignUp();

    // check user is taken to the sign up page
    const signUpPage = new SignUpPage(page);
    await signUpPage.validateSignUpPage();
  });

  test("start sign up via apply for account", async ({ page }) => {
    const landingPage = new LandingPage(page);

    // click apply for account on landing page
    await landingPage.clickApplyForAccount();

    // check user is taken to the sign up page
    const signUpPage = new SignUpPage(page);
    await signUpPage.validateSignUpPage();
  });

  test("view terms and conditions during sign up", async ({ page }) => {
    // navigate directly to the sign up page
    const signUpPage = new SignUpPage(page);
    await signUpPage.goto();

    // click view terms and conditions
    await signUpPage.viewTermsAndConditions();

    // check user is taken to terms and conditions page
    const termsAndConditionsPage = new TermsAndConditionsPage(page);
    await termsAndConditionsPage.validateTermsAndConditionsPage();
  });

  test("view privacy policy during sign up", async ({ page }) => {
    // navigate directly to the sign up page
    const signUpPage = new SignUpPage(page);
    await signUpPage.goto();

    // click view privacy policy
    await signUpPage.viewPrivacyPolicy();

    // check user is taken to privacy policy page
    const privacyPage = new PrivacyPolicyPage(page);
    await privacyPage.validatePrivacyPolicyPage();
  });

  test("sign up with an invalid email", async ({ page }) => {
    // navigate directly to the sign up page
    const signUpPage = new SignUpPage(page);
    await signUpPage.goto();

    // enter an invalid email and submit
    await signUpPage.enterUserEmail(false);
    await signUpPage.submit();

    // check the user sees the invalid email error message
    await signUpPage.validateInvalidEmailError();

    // check the user remains on the sign up page
    await signUpPage.validateSignUpPage();
  });

  test("sign up without providing an email", async ({ page }) => {
    // navigate directly to the sign up page
    const signUpPage = new SignUpPage(page);
    await signUpPage.goto();

    // click submit without entering a user email
    await signUpPage.submit();

    // check the user sees the no email error message
    await signUpPage.validateNoEmailError();

    // check the user remains on the sign up page
    await signUpPage.validateSignUpPage();
  });
});
