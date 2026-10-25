import { Page, Locator } from '@playwright/test';
import { parseAmount } from './checkout.page';

export class OrderDetailsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly orderNumber: Locator;
  readonly orderStatus: Locator;
  readonly orderTotal: Locator;
  readonly paymentMethod: Locator;
  readonly shippingMethod: Locator;
  readonly products: Locator;
  readonly subTotal: Locator;
  readonly discount: Locator;

  totalRow(label: string): Locator {
  return this.page.locator('.cart-total tr', { hasText: label }).locator('.cart-total-right');
  }

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.page-title h1');
    this.orderNumber = page.locator('.order-overview .order-number strong');
    this.orderStatus = page.getByText(/Order Status/i);
    this.orderTotal = page.locator('.order-overview').getByText(/Order Total/i);
    this.paymentMethod = page
      .locator('.payment-method-info .payment-method .value, .payment-method-info .payment-method, .payment-method')
      .first();
    this.shippingMethod = page
      .locator('.shipping-method-info .shipping-method .value, .shipping-method-info .shipping-method, .shipping-method')
      .first();
    this.products = page.locator('.data-table tbody tr');
    this.subTotal = this.totalRow('Sub-Total');
    this.discount = this.totalRow('Discount');;
  }

  /** Ligne produit du tableau filtrée par nom */
  productRow(name: string): Locator {
    return this.products.filter({ hasText: name });
  }

  async orderReference(): Promise<string> {
    return (await this.orderNumber.innerText()).replace(/\D/g, '');
  }

  async subTotalAmount(): Promise<number> {
    return parseAmount(await this.subTotal.innerText());
  }

  /** Montant de la remise (négatif), 0 si absente */
  async discountAmount(): Promise<number> {
    if ((await this.discount.count()) === 0) return 0;
    return parseAmount(await this.discount.locator('.product-price').innerText());
  }
}