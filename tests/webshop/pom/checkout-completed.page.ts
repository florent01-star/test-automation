import { Page, Locator } from '@playwright/test';

export class CheckoutCompletedPage {
  readonly page: Page;
  readonly title: Locator;
  readonly message: Locator;
  readonly orderNumber: Locator;
  readonly detailsLink: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.page-title h1');
    this.message = page.locator('.order-completed .title strong');
    this.orderNumber = page.locator('.order-completed .details li').first();
    this.detailsLink = page.getByRole('link', { name: 'Click here for order details.' });
    this.continueButton = page.locator('input.order-completed-continue-button');
  }

  // "Order number: 2403895" -> "2403895"
  async orderReference(): Promise<string> {
    const text = (await this.orderNumber.innerText()).trim();
    return text.replace(/\D/g, '');
  }

  async openDetails() {
    await this.detailsLink.click();
  }
}