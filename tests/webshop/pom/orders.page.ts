import { Page, Locator } from '@playwright/test';

export class OrdersPage {
  readonly page: Page;
  readonly orders: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orders = page.locator('.order-list .section.order-item');
  }

  async goto() {
    await this.page.goto('/customer/orders');
  }

  order(reference: string): Locator {
    return this.orders.filter({ hasText: `Order Number: ${reference}` });
  }

  async openDetails(reference: string) {
    await this.order(reference).getByRole('button', { name: 'Details' }).click();
  }
}