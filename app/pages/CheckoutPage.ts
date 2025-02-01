import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  getCategoryByHeadingLocator = (heading: string) =>
    this.page.locator(".sub-heading").getByText(heading);

  orderCompleteButtonLocator = this.page.locator("#btnCompleteOrder");
}
