import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { getPriceAsNumber } from "app/helpers/priceHelper";

export class ReviewPage extends BasePage {
  private checkoutLocator: Locator = this.page.locator("#checkout");

  private getProductItemLocator = (title: string) =>
    this.page
      .locator(".item-title")
      .getByText(title)
      .locator('//ancestor::*[@class = "item"]');

  private productPriceLocator = (title: string) =>
    this.getProductItemLocator(title).locator(".item-price");

  async clickCheckout() {
    await this.checkoutLocator.click({ delay: 500 });
  }

  async getProductPrice(title: string) {
    const priceAsText = await this.productPriceLocator(title).textContent();
    return getPriceAsNumber(priceAsText!);
  }
}
