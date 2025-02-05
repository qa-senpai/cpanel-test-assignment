import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { getPriceAsNumber } from "app/helpers/priceHelper";

export class ConfigurePage extends BasePage {
  private ipAddressLocator: Locator = this.page.locator("#customfield11");
  private continueLocator: Locator = this.page.locator(
    "#btnCompleteProductConfig"
  );
  private monthlyCostLocator: Locator = this.page
    .locator(".summary-totals")
    .locator(".float-left", { hasText: "Monthly" })
    .locator("+ .float-right");

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
    const promise = this.page.waitForRequest(RegExp("cart_validate_ip"));
    await this.ipAddressLocator.fill(ipAddress);
    await this.ipAddressLocator.press("Enter");
    await promise;
  }

  async selectAddon(addonTitle: string) {
    await this.getAddonPriceLocator(addonTitle).waitFor();
    const priceDirty = await this.getAddonPriceLocator(
      addonTitle
    ).textContent();
    const promise = this.page.waitForResponse(RegExp("cart"));
    await this.getAddonLocatorByText(addonTitle).click({ delay: 500 });
    await promise;

    return getPriceAsNumber(priceDirty!);
  }

  async clickContinue() {
    await this.continueLocator.click({ delay: 500 });
  }

  async getMonthlyPayment() {
    await this.monthlyCostLocator.waitFor();
    const sum = await this.monthlyCostLocator.textContent();
    return getPriceAsNumber(sum!);
  }

  async getTotalDueToday() {
    await this.getTotalDueTodaySumLocator.waitFor();
    const sum = await this.getTotalDueTodaySumLocator.textContent();
    return getPriceAsNumber(sum!);
  }
}
