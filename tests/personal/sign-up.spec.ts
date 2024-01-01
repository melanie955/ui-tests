import { test } from "@playwright/test";
import { SignUpJourney } from "../../utils/journeys/sign-up-journey";
import { CommonUtils } from "../../utils/common-utils";

test.describe("signing up to a personal Monzo account", () => {
  test.beforeEach(async ({ page }) => {
    const commonUtils = new CommonUtils(page);
    await commonUtils.navigateToMonzo();
  });

  test("e2e sign up via landing page", async ({ page }) => {
    const signUpJourney = new SignUpJourney(page);

    // click open account on landing page
    await signUpJourney.clickOpenAccount();

    // check user is taken to the sign up page
    await signUpJourney.validateSignUpPage();

    // enter valid user email and submit
    await signUpJourney.enterUserEmail(true);
    await signUpJourney.submit();

    // check user is taken to the sign up initiated page
    await signUpJourney.validateSignUpInitiatedPage();
  });

  test("start sign up via nav bar", async ({ page, isMobile }) => {
    const signUpJourney = new SignUpJourney(page);

    // user opens nav bar on mobile
    if (isMobile) {
      await signUpJourney.clickMenuButton();
    }

    // click sign up button from nav bar
    await signUpJourney.clickSignUp();

    // check user is taken to the sign up page
    await signUpJourney.validateSignUpPage();
  });

  test("start sign up via apply for account", async ({ page }) => {
    const signUpJourney = new SignUpJourney(page);

    // click apply for account on landing page
    await signUpJourney.clickApplyForAccount();

    // check user is taken to the sign up page
    await signUpJourney.validateSignUpPage();
  });

  test("view terms and conditions during sign up", async ({ page }) => {
    // navigate directly to the sign up page
    const signUpJourney = new SignUpJourney(page);
    await signUpJourney.navigateDirectToSignUp();

    // click view terms and conditions
    await signUpJourney.viewTermsAndConditions();

    // check user is taken to terms and conditions page
    await signUpJourney.validateTermsAndConditionsPage();
  });

  test("view privacy policy during sign up", async ({ page }) => {
    // navigate directly to the sign up page
    const signUpJourney = new SignUpJourney(page);
    await signUpJourney.navigateDirectToSignUp();

    // click view privacy policy
    await signUpJourney.viewPrivacyPolicy();

    // check user is taken to privacy policy page
    await signUpJourney.validatePrivacyPolicyPage();
  });

  test("sign up with an invalid email", async ({ page }) => {
    // navigate directly to the sign up page
    const signUpJourney = new SignUpJourney(page);
    await signUpJourney.navigateDirectToSignUp();

    // enter an invalid email and submit
    await signUpJourney.enterUserEmail(false);
    await signUpJourney.submit();

    // check the user sees the invalid email error message
    await signUpJourney.validateInvalidEmailError();

    // check the user remains on the sign up page
    await signUpJourney.validateSignUpPage();
  });

  test("sign up without providing an email", async ({ page }) => {
    // navigate directly to the sign up page
    const signUpJourney = new SignUpJourney(page);
    await signUpJourney.navigateDirectToSignUp();

    // click submit without entering a user email
    await signUpJourney.submit();

    // check the user sees the no email error message
    await signUpJourney.validateNoEmailError();

    // check the user remains on the sign up page
    await signUpJourney.validateSignUpPage();
  });
});
