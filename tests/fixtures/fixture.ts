import { CheckoutPage } from "@pages/CheckoutPage";
import { ConfigurePage } from "@pages/ConfigurePage";
import { ProductPage } from "@pages/ProductPage";
import { ReviewPage } from "@pages/ReviewPage";
import { test as base } from "@playwright/test";

type Pages = {
  productPage: ProductPage;
  configurePage: ConfigurePage;
  checkoutPage: CheckoutPage;
  reviewPage: ReviewPage;
};

export const test = base.extend<Pages>({
  productPage: async ({ page }, use) => {
    const product = new ProductPage(page);

    await use(product);
  },
  configurePage: async ({ page }, use) => {
    const configure = new ConfigurePage(page);

    await use(configure);
  },
  checkoutPage: async ({ page }, use) => {
    const checkout = new CheckoutPage(page);

    await use(checkout);
  },
  reviewPage: async ({ page }, use) => {
    const checkout = new ReviewPage(page);

    await use(checkout);
  },
});
