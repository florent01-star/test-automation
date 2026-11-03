import { Page } from '@playwright/test';
import { ProductDetailsPage } from '../../pom/product-details.page';
import { CartPage } from '../../pom/cart.page';

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
