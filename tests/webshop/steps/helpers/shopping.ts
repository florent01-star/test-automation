import { Page } from '@playwright/test';
import { ProductDetailsPage } from '../../pom/product-details.page';
import { CartPage } from '../../pom/cart.page';
import { CheckoutPage } from '../../pom/checkout.page';
import { CheckoutCompletedPage } from '../../pom/checkout-completed.page';

// Produits simples utilisés pour remplir un panier "avec des articles différents"
export const SIMPLE_PRODUCTS = ['Blue Jeans', 'Casual Golf Belt', 'Black & White Diamond Heart'];

export async function addProduct(page: Page, name: string, quantity = 1) {
  const product = new ProductDetailsPage(page);
  await product.openByName(name);
  await product.addToCart(quantity);
}

export async function emptyCart(page: Page) {
  const cart = new CartPage(page);
  await cart.goto();
  if ((await cart.rows.count()) > 0) await cart.removeAll();
}

export async function fillCartWithDifferentProducts(page: Page, count: number) {
  for (const name of SIMPLE_PRODUCTS.slice(0, count)) {
    await addProduct(page, name, 1);
  }
}

// Passe une commande complète (utilisateur déjà connecté avec adresse sauvegardée)
export async function placeOrder(
  page: Page,
  opts: { product: string; quantity?: number; coupon?: string },
): Promise<string> {
  await emptyCart(page);
  await addProduct(page, opts.product, opts.quantity ?? 1);

  const cart = new CartPage(page);
  await cart.goto();
  if (opts.coupon) await cart.applyCoupon(opts.coupon);
  await cart.checkout();

  const checkout = new CheckoutPage(page);
  await checkout.selectSavedBillingAddress();
  await checkout.continueShippingAddress();
  await checkout.chooseShippingMethod('Ground');
  await checkout.choosePaymentMethod('Check / Money Order');
  await checkout.continuePaymentInfo();
  await checkout.confirm();

  const completed = new CheckoutCompletedPage(page);
  return completed.orderReference();
}