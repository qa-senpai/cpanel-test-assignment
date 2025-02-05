import { getPriceAsNumber } from "app/helpers/priceHelper";
import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class ProductPage extends BasePage {
  private getProductTileLocator = (productTitle: string) =>
    this.page
      .getByText(productTitle)
      .locator(`//ancestor::div[@class = 'product clearfix']`);

  private getOrderNowButtonLocator = (productTitle: string) =>
    this.getProductTileLocator(productTitle).locator(`//a`);

  private geProductPriceLocator = (productTitle: string) =>
    this.getProductTileLocator(productTitle).locator(`.price`);

  async goto() {
    await super.goto("/store/cpanel-licenses");
  }

  async orderProductByTitle(productTitle: string) {
    await this.geProductPriceLocator(productTitle).waitFor();
    const priceAsText = await this.geProductPriceLocator(
      productTitle
    ).textContent();

    await this.getOrderNowButtonLocator(productTitle).click({ delay: 500 });

    await expect(
      this.page.locator("h1", { hasText: "Configure" })
    ).toBeVisible();

    return getPriceAsNumber(priceAsText!);
  }
}
