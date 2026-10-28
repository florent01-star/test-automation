import { Page, Locator } from '@playwright/test';

export class AccueilPage {
  readonly page: Page;
  readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerLink = page.getByRole('link', { name: 'Register' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickRegister() {
    await this.registerLink.click();
  }
}
