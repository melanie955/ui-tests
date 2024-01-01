import { Page } from "@playwright/test";
import { LandingPageSelectors } from "./selectors/landing-page";
import { MONZO_URL } from "./constants";

export class CommonUtils {
  readonly page: Page;
  readonly landingPageSelectors: LandingPageSelectors;

  constructor(page: Page) {
    this.page = page;
    this.landingPageSelectors = new LandingPageSelectors(this.page);
  }

  async navigateToMonzo() {
    // navigate to Monzo
    await this.page.goto(MONZO_URL);

    // move mouse so cookies banner appears
    await this.page.mouse.up();

    // accept cookies
    await this.landingPageSelectors.acceptCookies.click();
  }
}
