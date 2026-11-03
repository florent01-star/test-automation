import { Page, Locator } from '@playwright/test';

export type Category =
  | 'Books'
  | 'Computers'
  | 'Electronics'
  | 'Apparel & Shoes'
  | 'Digital downloads'
  | 'Jewelry'
  | 'Gift Cards';

export class NavBar {
  readonly page: Page;
  private readonly menu: Locator;

  constructor(page: Page) {
    this.page = page;
    // On cible la barre du haut : la colonne "Categories" à gauche porte les mêmes libellés
    this.menu = page.locator('.header-menu');
  }

  async goTo(category: Category, subCategory?: string) {
    const top = this.menu.getByRole('link', { name: category, exact: true });
    if (!subCategory) {
      await top.click();
      return;
    }
    await top.hover();
    await this.menu.getByRole('link', { name: subCategory, exact: true }).click();
  }
}
