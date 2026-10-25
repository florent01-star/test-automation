import { Page, Locator } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly price: Locator;
  readonly quantity: Locator;
  readonly addToCartButton: Locator;
  readonly notification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.product-name h1');
    this.price = page.locator('.product-price').first();
    this.quantity = page.locator('.add-to-cart .qty-input');
    this.addToCartButton = page.locator('.add-to-cart-button').first();
    this.notification = page.locator('#bar-notification .content');
  }

  // Ouvre un produit via la recherche : indépendant de la catégorie
  async openByName(name: string) {
    await this.page.goto(`/search?q=${encodeURIComponent(name)}`);
    await this.page
      .locator('.product-item .product-title')
      .getByRole('link', { name, exact: true })
      .first()
      .click();
  }

  

  async addToCart(quantity = 1) {
    await this.quantity.fill(String(quantity));
    await this.addToCartButton.click();
    await this.notification.waitFor({ state: 'visible' });
  }

  productRow(name: string): Locator {
  return this.page
    .locator('.data-table tbody tr')
    .filter({ hasText: name });
}
}