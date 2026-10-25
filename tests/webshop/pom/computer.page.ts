import { Page, Locator, expect } from '@playwright/test';

export class ComputerPage {
   readonly page: Page;
  readonly priceLabel: Locator;
  readonly addToCartButton: Locator;
  readonly addToCartResult: Locator;
  readonly qtyInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.priceLabel      = page.locator('.product-price');
    this.addToCartButton = page.locator('.add-to-cart-button');
    this.addToCartResult = page.locator('.bar-notification.success');
    this.qtyInput        = page.locator('.qty-input input, #addtocart_16_EnteredQuantity').first();
  }

  async open() {
    await this.page.goto('/build-your-own-computer');
  }

  private attributeArea(title: string): Locator {
    return this.page.locator(
      `//dt[contains(normalize-space(.), '${title}')]/following-sibling::dd[1]`
    );
  }

  private async selectAttribute(title: string, partialLabel: string) {
    const select = this.attributeArea(title).locator('select');
    const fullLabel = (await select
      .locator('option', { hasText: partialLabel.trim() })
      .first()
      .textContent())!.trim();
    await select.selectOption({ label: fullLabel });
  }

  async selectProcessor(label: string) { await this.selectAttribute('Processor', label); }
  async selectRam(label: string)       { await this.selectAttribute('RAM', label); }
  async selectHdd(label: string)       { await this.attributeArea('HDD').locator('label', { hasText: label }).click(); }
  async selectOs(label: string)        { await this.attributeArea('OS').locator('label', { hasText: label }).click(); }

  /**
 * Décoche toutes les options software actuellement cochées.
 * Nécessaire car une option est pré-cochée par défaut sur la page.
 */
async uncheckAllSoftware() {
  const checked = this.attributeArea('Software').locator('input[type="checkbox"]:checked');
  const count = await checked.count();
  for (let i = 0; i < count; i++) {
    await checked.first().uncheck(); // .first() à chaque tour : la liste rétrécit
  }
}

/**
 * Coche ou décoche une option software par son label.
 * Tolère le prix dans le label : "Acrobat Reader [+10.00]" → "Acrobat Reader"
 */
async toggleSoftware(label: string, checked: boolean) {
  // "Acrobat Reader [+10.00]" → "Acrobat Reader" (on jette le prix)
  const base = label.split('[')[0].trim();

  const checkbox = this.attributeArea('Software')
    .locator('label')
    .filter({ hasText: new RegExp(`^\\s*${base.replace(/ /g, '\\s*')}`, 'i') })
    .locator('..')                              // remonte au parent (<li> ou <dd>)
    .locator('input[type="checkbox"]')          // l'input est frère du label, pas enfant
    .first();

  checked ? await checkbox.check() : await checkbox.uncheck();
}

  async setQty(qty: number) {
    await this.qtyInput.fill(String(qty));
  }

  async addToCart() {
    await this.addToCartButton.click();
    await expect(this.addToCartResult).toBeVisible();
  }

  async getPrice(): Promise<string> {
    return (await this.priceLabel.innerText()).trim();
  }

    // Prix de base du "Build your own computer" (sans option)
  readonly basePrice = 1200;

  // Libellés de toutes les options actuellement choisies
  async selectedOptionLabels(): Promise<string[]> {
    const labels: string[] = [];

    // Listes déroulantes (Processor, RAM)
for (const title of ['Processor', 'RAM']) {
  const select = this.attributeArea(title).locator('select');
  const value = await select.locator('option:checked, option[selected]').first().innerText();
  labels.push(value.trim());
}


    // Radios + checkboxes cochés (HDD, OS, Software)
    const checked = this.page.locator('input[name^="product_attribute_16_"]:checked');
    const count = await checked.count();
    for (let i = 0; i < count; i++) {
      const id = await checked.nth(i).getAttribute('id');
      labels.push(await this.page.locator(`label[for="${id}"]`).innerText());
    }
    return labels;
  }

  // Prix de base + somme des suppléments [+X.XX]
  async expectedPrice(): Promise<number> {
    const labels = await this.selectedOptionLabels();
    const extras = labels.reduce((sum, label) => {
      const match = label.match(/\[\+([\d.]+)\]/);
      return sum + (match ? parseFloat(match[1]) : 0);
    }, 0);
    return this.basePrice + extras;
  }

  parseAmount(text: string): number {
  // Cherche le premier montant, avec un éventuel "-" collé devant (ex: "-124.50")
  const match = text.replace(/,/g, '').match(/-?\d+(\.\d+)?/);

  if (!match) {
    throw new Error(`parseAmount : impossible de lire un montant dans "${text}"`);
  }
  return parseFloat(match[0]);
}

}