import { Page, Locator } from '@playwright/test';

export class DesktopsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly products: Locator;
  readonly sortBy: Locator;
  readonly pageSize: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.page-title h1');
    this.products = page.locator('.product-item');
    this.sortBy = page.locator('#products-orderby');
    this.pageSize = page.locator('#products-pagesize');
  }

  async goto() {
    await this.page.goto('/desktops');
  }

  // Filtre sur le nom EXACT : évite de cibler plusieurs cartes
  // (ex. « Desktop PC with CDRW » et « Elite Desktop PC »)
  product(name: string): Locator {
    return this.products.filter({
      has: this.page.getByRole('link', { name, exact: true }),
    });
  }

  async openProduct(name: string) {
    await this.product(name).getByRole('link', { name, exact: true }).first().click();
  }

  // Uniquement pour les produits qui ont un bouton « Add to cart » dans la grille.
  // Pour les autres (et pour « Build your own computer »), passer par openProduct().
  async addToCart(name: string) {
    await this.product(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async priceOf(name: string): Promise<string> {
    return (await this.product(name).locator('.prices').innerText()).trim();
  }
}
