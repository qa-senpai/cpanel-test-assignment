import { test } from "@fixtures/fixture";
import { expect } from "@playwright/test";

const productData = {
  productTitle: "cPanel Solo® Cloud (1 Account)",
  price: 0,
};

const addonData = {
  productTitle: "Monthly CloudLinux for cPanel License",
  price: 0,
};

test("order product", async ({
  productPage,
  configurePage,
  checkoutPage,
  reviewPage,
}) => {
  await productPage.goto();

  productData.price = await productPage.orderProductByTitle(
    productData.productTitle
  );

  await configurePage.fillIpAddress("2.2.2.2");

  addonData.price = await configurePage.selectAddon(addonData.productTitle);

  await expect(
    configurePage.getProductInSummaryLocator(productData)
  ).toBeVisible();

  await expect(
    configurePage.getProductInSummaryLocator(addonData)
  ).toBeVisible();

  let totalPrice = await configurePage.getMonthlyPayment();
  expect((productData.price + addonData.price).toFixed(1)).toEqual(
    totalPrice.toFixed(1)
  );

  await configurePage.clickContinue();

  const productPrice = await reviewPage.getProductPrice(
    productData.productTitle
  );

  const addonPrice = await reviewPage.getProductPrice(addonData.productTitle);
  totalPrice = await configurePage.getTotalDueToday();

  // expect(productData.price).toEqual(productPrice);
  // expect(addonData.price).toEqual(addonPrice);
  // expect((productPrice + addonPrice).toFixed(1)).toEqual(totalPrice.toFixed(1));

  await reviewPage.clickCheckout();

  const categories = [
    "Personal Information",
    "Billing Address",
    "Account Security",
    "Terms & Conditions",
  ];

  for (const cat of categories) {
    await expect(checkoutPage.getCategoryByHeadingLocator(cat)).toBeVisible();
  }

  await expect(checkoutPage.orderCompleteButtonLocator).toBeDisabled();
});
