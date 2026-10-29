import { Page, Locator, expect } from '@playwright/test';

export type BillingAddress = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address1: string;
  zip: string;
  phone: string;
};

export const DEFAULT_ADDRESS: BillingAddress = {
  firstName: 'Flo',
  lastName: 'Test',
  email: 'testflorent2@gmail.com',
  country: 'France',
  city: 'Lyon',
  address1: '8 Rue du test',
  zip: '69100',
  phone: '0761345612',
};

export type CardInfo = {
  type: string;
  holder: string;
  number: string;
  expireMonth: string; // '04'
  expireYear: string; // '2028'
  code: string;
};

// Conteneurs des boutons "Continue" de chaque étape (nopCommerce)
const STEP = {
  billing: '#billing-buttons-container',
  shippingAddress: '#shipping-buttons-container',
  shippingMethod: '#shipping-method-buttons-container',
  paymentMethod: '#payment-method-buttons-container',
  paymentInfo: '#payment-info-buttons-container',
} as const;

export class CheckoutPage {
  readonly page: Page;

  // Étape 1 : adresse de facturation
  readonly billingSelect: Locator;
  // Étape 5 : informations de paiement
  readonly paymentInfoBlock: Locator;
  readonly purchaseOrderNumber: Locator;
  // Étape 6 : confirmation
  readonly confirmButton: Locator;
  readonly orderSummary: Locator;
  readonly orderTotal: Locator;
  readonly paymentFee: Locator;
  // Erreurs
  readonly errors: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billingSelect = page.locator('#billing-address-select');
    this.paymentInfoBlock = page.locator('#checkout-step-payment-info');
    this.purchaseOrderNumber = page.locator('#PurchaseOrderNumber');
    this.confirmButton = page.locator(
      '#confirm-order-buttons-container .confirm-order-next-step-button',
    );
    this.orderSummary = page.locator('#checkout-confirm-order-load');
    this.orderTotal = page.locator(
      '#checkout-confirm-order-load .cart-total .order-total .product-price',
    );
    this.paymentFee = page
      .locator('#checkout-confirm-order-load .cart-total tr', {
        hasText: 'Payment method additional fee',
      })
      .locator('.product-price');
    this.errors = page.locator(
      '.message-error, .validation-summary-errors, .field-validation-error',
    );
  }

  // ---------- Commun : clic sur "Continue" d'une étape ----------
  async clickContinue() {
    // 1. Attendre la fin des loaders AJAX
    const loading = this.page.getByText('Loading next step...').locator('visible=true');
    await expect.poll(async () => await loading.count(), { timeout: 15_000 }).toBe(0);

    // 2. Premier bouton "Continue" VISIBLE
    const button = this.page
      .getByRole('button', { name: 'Continue' })
      .locator('visible=true')
      .first();

    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await button.click();

    // 3. Attendre le chargement de l'étape suivante
    await expect.poll(async () => await loading.count(), { timeout: 15_000 }).toBe(0);
  }

  // ---------- Étape 1 : facturation ----------
  async continueBilling() {
    //await this.clickContinue(STEP.billing);
    await this.clickContinue();
  }

  /** Sélectionne l'adresse sauvegardée (présélectionnée par défaut). Ne clique PAS sur Continue. */
  async selectSavedBillingAddress() {
    await this.billingSelect.waitFor({ state: 'visible' });
  }

  async fillNewBillingAddress(address: BillingAddress = DEFAULT_ADDRESS) {
    // Invité ou connecté sans adresse : formulaire affiché directement
    // Sinon on bascule sur "New Address"
    if (await this.billingSelect.isVisible().catch(() => false)) {
      await this.billingSelect.selectOption({ label: 'New Address' });
    }
    await this.page.locator('#BillingNewAddress_FirstName').fill(address.firstName);
    await this.page.locator('#BillingNewAddress_LastName').fill(address.lastName);
    await this.page.locator('#BillingNewAddress_Email').fill(address.email);
    await this.page
      .locator('#BillingNewAddress_CountryId')
      .selectOption({ label: address.country });
    await this.page.locator('#BillingNewAddress_City').fill(address.city);
    await this.page.locator('#BillingNewAddress_Address1').fill(address.address1);
    await this.page.locator('#BillingNewAddress_ZipPostalCode').fill(address.zip);
    await this.page.locator('#BillingNewAddress_PhoneNumber').fill(address.phone);
    await this.continueBilling();
  }

  // ---------- Étape 2 : adresse de livraison ----------
  // Le site propose la même adresse que la facturation par défaut
  async continueShippingAddress() {
    await this.clickContinue();
  }

  // ---------- Étape 3 : méthode de livraison ----------
  async continueShippingMethod() {
    await this.clickContinue();
  }

  async chooseShippingMethod(name: string) {
    await this.page
      .getByRole('radio', { name }) // ex: 'Ground (10.00)'
      .check();
    await this.continueShippingMethod();
  }

  // ---------- Étape 4 : moyen de paiement ----------
  async continuePaymentMethod() {
    await this.clickContinue();
  }

  async choosePaymentMethod(name: string) {
    const option = this.page.locator('#checkout-payment-method-load .method-list li', {
      hasText: name,
    });
    await option.waitFor({ state: 'visible' });
    await option.getByRole('radio').check();
    await this.continuePaymentMethod();
  }

  // ---------- Étape 5 : informations de paiement ----------
  async continuePaymentInfo() {
    await this.clickContinue();
  }

  async fillCard(card: CardInfo) {
    await this.page.locator('#CreditCardType').selectOption({ label: card.type });
    await this.page.locator('#CardholderName').fill(card.holder);
    await this.page.locator('#CardNumber').fill(card.number);
    await this.page.locator('#ExpireMonth').selectOption(card.expireMonth);
    await this.page.locator('#ExpireYear').selectOption(card.expireYear);
    await this.page.locator('#CardCode').fill(card.code);
  }

  async fillPurchaseOrder(number: string) {
    await this.purchaseOrderNumber.waitFor({ state: 'visible' });
    await this.purchaseOrderNumber.fill(number);
  }

  // ---------- Étape 6 : confirmation ----------
  /** Confirme la commande et attend la redirection vers /checkout/completed */
  async confirm() {
    await this.confirmButton.waitFor({ state: 'visible' });
    await Promise.all([
      this.page.waitForURL('**/checkout/completed**'),
      this.confirmButton.click(),
    ]);
  }

  async orderTotalAmount(): Promise<number> {
    return parseAmount(await this.orderTotal.innerText());
  }

  async paymentFeeAmount(): Promise<number> {
    if ((await this.paymentFee.count()) === 0) return 0;
    return parseAmount(await this.paymentFee.innerText());
  }

  // ---------- Générique ----------
  /** Clique sur le "Continue" de l'étape actuellement ouverte (step générique Gherkin) */
  async continueCurrentStep() {
    await this.page
      .getByText('Loading next step...')
      .waitFor({ state: 'hidden' })
      .catch(() => {});
    const button = this.page
      .locator(
        Object.values(STEP)
          .map((s) => `${s} input[value="Continue"]:visible`)
          .join(', '),
      )
      .first();
    await expect(button).toBeEnabled();
    await button.click();
  }
}

/** Convertit "1,234.50" / "-10.00" en nombre (garde le signe) */
export function parseAmount(text: string): number {
  return parseFloat(text.replace(/[^\d.-]/g, ''));
}
