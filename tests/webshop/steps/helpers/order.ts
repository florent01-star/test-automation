import { expect, Page } from '@playwright/test';
import { TopBar } from '../../pom/topbar.page'
import { LoginPage } from '../../pom/login.page';
import { CartPage } from '../../pom/cart.page';
import { CheckoutPage } from '../../pom/checkout.page';
import { CheckoutCompletedPage } from '../../pom/checkout-completed.page';

export const USER_EMAIL = 'testflorent2@gmail.com';
export const PASSWORD = 'Tosca1234!';

type LoginDeps = {
  topBar: TopBar;
  loginPage: LoginPage;
};

export async function ensureLoggedIn({ topBar, loginPage }: LoginDeps): Promise<void> {
  if (!(await topBar.isLoggedIn())) {
    await loginPage.goto();
    await loginPage.login(USER_EMAIL, PASSWORD);
  }
}

export async function emptyCart(cartPage: CartPage): Promise<void> {
  await cartPage.goto();
  if ((await cartPage.rows.count()) > 0) await cartPage.removeAll();
  await expect(cartPage.rows).toHaveCount(0);
}

export async function completeCheckout(
  checkoutPage: CheckoutPage,
  completedPage: CheckoutCompletedPage,
): Promise<string> {
  await checkoutPage.selectSavedBillingAddress();
  await checkoutPage.continueBilling();
  await checkoutPage.continueShippingAddress();
  await checkoutPage.chooseShippingMethod('Ground');
  await checkoutPage.choosePaymentMethod('Check / Money Order');
  await checkoutPage.continuePaymentInfo();
  await checkoutPage.confirm(); // attend /checkout/completed

  const ref = await completedPage.orderReference();
  expect(ref).toMatch(/^\d+$/);
  return ref;
}
