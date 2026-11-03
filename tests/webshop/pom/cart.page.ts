import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly rows: Locator;
  readonly updateButton: Locator;
  readonly continueShopping: Locator;
  readonly termsCheckbox: Locator;
  readonly checkoutButton: Locator;
  readonly emptyMessage: Locator;
  readonly subTotal: Locator;
  readonly total: Locator;
  readonly couponInput: Locator;
  readonly applyCouponButton: Locator;
  readonly giftCardInput: Locator;
  readonly addGiftCardButton: Locator;
  readonly countrySelect: Locator;
  readonly zipInput: Locator;
  readonly estimateShippingButton: Locator;
  readonly shippingOptions: Locator;
  readonly discountLine: Locator;
  readonly messages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.locator('table.cart tbody tr');
    this.updateButton = page.locator('input[name="updatecart"]');
    this.continueShopping = page.locator('input[name="continueshopping"]');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
    this.emptyMessage = page.locator('.order-summary-content');
    //this.subTotal = page.locator('.cart-total tr', { hasText: 'Sub-Total' }).locator('.product-price');
    //this.total = page.locator('.cart-total .order-total .product-price');
    //this.discountLine = this.page.locator('tr', { hasText: 'Discount' });
    this.subTotal = page.getByRole('row', { name: 'Sub-Total' }).getByRole('cell').nth(1);
    this.total = this.page
      .getByRole('row', { name: /^Total/ })
      .getByRole('cell')
      .nth(1);
    this.discountLine = this.page.getByRole('row', { name: /Discount/ });
    this.couponInput = page.locator('input[name="discountcouponcode"]');
    this.applyCouponButton = page.locator('input[name="applydiscountcouponcode"]');
    this.giftCardInput = page.locator('input[name="giftcardcouponcode"]');
    this.addGiftCardButton = page.locator('input[name="applygiftcardcouponcode"]');
    this.countrySelect = page.locator('#CountryId');
    this.zipInput = page.locator('#ZipPostalCode');
    this.estimateShippingButton = page.locator(
      'input[name="estimateshipping"], #estimate-shipping-button',
    );
    this.shippingOptions = page.locator('.shipping-results li, .shipping-option');
    this.messages = page.locator('.message-error, .message, .coupon-box .message');
  }

  async goto() {
    await this.page.goto('/cart');
  }

  lineTotal(productName: string): Locator {
    return this.row(productName).locator('.product-subtotal');
  }

  // CartPage
  row(productName: string): Locator {
    return this.page.locator('tr.cart-item-row', { hasText: productName });
  }

  attributes(productName: string): Locator {
    return this.row(productName).locator('div.attributes');
  }

  async attributesText(productName: string): Promise<string> {
    return await this.row(productName).locator('.attributes').innerText();
  }

  unitPrice(productName: string): Locator {
    return this.row(productName).locator('span.product-unit-price');
  }

  async attributeLine(productName: string, label: string): Promise<string> {
    const text = await this.attributes(productName).innerText();
    const line = text.split('\n').find((l) => l.trim().startsWith(label));
    return line?.split(':')[1]?.trim() ?? '';
  }

  async quantityOf(productName: string): Promise<number> {
    const value = await this.row(productName).locator('input.qty-input').inputValue();
    return parseInt(value, 10);
  }

  async setQuantity(productName: string, quantity: number) {
    await this.row(productName).locator('input.qty-input').fill(String(quantity));
    await this.updateButton.click();
  }

  async remove(productName: string) {
    await this.row(productName).locator('input[name="removefromcart"]').check();
    await this.updateButton.click();
  }

  async checkout() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
  }

  async applyCoupon(code: string) {
    await this.couponInput.fill(code);
    await this.applyCouponButton.click();
  }

  async applyGiftCard(code: string) {
    await this.giftCardInput.fill(code);
    await this.addGiftCardButton.click();
  }

  async estimateShipping(country: string, zip: string) {
    await this.countrySelect.selectOption({ label: country });
    await this.zipInput.fill(zip);
    await this.estimateShippingButton.click();
  }

  async articleNames(): Promise<string[]> {
    return this.rows.locator('.product a.product-name, .product-name').allInnerTexts();
  }

  async removeAll() {
    const boxes = this.page.locator('input[name="removefromcart"]');
    const count = await boxes.count();

    if (count === 0) return; // panier déjà vide, rien à faire ✅

    for (let i = 0; i < count; i++) {
      await boxes.nth(i).check();
    }
    await this.updateButton.click();
  }
}
