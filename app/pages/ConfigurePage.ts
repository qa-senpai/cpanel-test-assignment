import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { getPriceAsNumber } from "app/helpers/priceHelper";

export class ConfigurePage extends BasePage {
  private ipAddressLocator: Locator = this.page.locator("#customfield11");
  private continueLocator: Locator = this.page.locator(
    "#btnCompleteProductConfig"
  );

  private getAddonLocatorByText = (text: string) => this.page.getByText(text);
  private getAddonPriceLocator = (text: string) =>
    this.getAddonLocatorByText(text)
      .locator(`//ancestor::div[contains(@class, 'panel-addon')]`)
      .locator(".panel-price");
  private getTotalDueTodaySumLocator = this.page.locator(".amt");

  getProductInSummaryLocator = (addonData: {
    productTitle: string;
    price: number;
  }) =>
    this.page
      .locator("#producttotal")
      .getByText(addonData.productTitle)
      .locator(`//ancestor::*[@class = 'clearfix']`)
      .getByText(`${addonData.price}`);

  async fillIpAddress(ipAddress: string) {
    await this.page.waitForLoadState("load");
    await this.ipAddressLocator.fill(ipAddress);
    await this.ipAddressLocator.press("Enter");
  }

  async selectAddon(addonTitle: string) {
    await this.getAddonPriceLocator(addonTitle).waitFor();
    const priceDirty = await this.getAddonPriceLocator(
      addonTitle
    ).textContent();
    await this.getAddonLocatorByText(addonTitle).click({ delay: 500 });

    return getPriceAsNumber(priceDirty!);
  }

  async clickContinue() {
    await this.continueLocator.click({ delay: 500 });
  }

  async getTotalDueToday() {
    await this.getTotalDueTodaySumLocator.waitFor();
    const sum = await this.getTotalDueTodaySumLocator.textContent();
    return getPriceAsNumber(sum!);
  }
}
