import { Page, Locator } from '@playwright/test';

export class TopBar {
  readonly page: Page;
  private readonly links: Locator;
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly accountLink: Locator;   // affiche l'email quand connecté
  readonly cartLink: Locator;
  readonly wishlistLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.links = page.locator('.header-links');
    this.registerLink = this.links.getByRole('link', { name: 'Register' });
    this.loginLink = this.links.getByRole('link', { name: 'Log in' });
    this.logoutLink = this.links.getByRole('link', { name: 'Log out' });
    this.accountLink = this.links.locator('a.account');
    this.cartLink = this.links.getByRole('link', { name: /Shopping cart/ });
    this.wishlistLink = this.links.getByRole('link', { name: /Wishlist/ });
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator('.search-box input[type="submit"]');
  }

  async isLoggedIn(): Promise<boolean> {
    return this.logoutLink.isVisible();
  }

  async loggedUserEmail(): Promise<string> {
    return (await this.accountLink.textContent())?.trim() ?? '';
  }

  // "Shopping cart (3)" -> 3
  async cartCount(): Promise<number> {
    return this.extractCount(this.cartLink.locator('.cart-qty'));
  }

  async wishlistCount(): Promise<number> {
    return this.extractCount(this.wishlistLink.locator('.wishlist-qty'));
  }

  async goToRegister() { await this.registerLink.click(); }
  async goToLogin()    { await this.loginLink.click(); }
  async goToCart()     { await this.cartLink.click(); }
  async logout()       { await this.logoutLink.click(); }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  private async extractCount(locator: Locator): Promise<number> {
    const text = (await locator.textContent()) ?? '0';
    return parseInt(text.replace(/\D/g, ''), 10) || 0;
  }
}