import { Page, Locator } from '@playwright/test';

export type ComputerConfig = {
  processor?: string;    // ex. '2.5 GHz'
  ram?: string;          // ex. '2 GB'
  hdd?: string;          // ex. '400 GB' (obligatoire sur le site)
  os?: string;           // ex. 'Windows 10'
  software?: string[];   // liste EXACTE souhaitée, ex. ['Acrobat Reader']
  quantity?: number;
};

// Le HDD n'a pas de valeur par défaut sur le site : on en impose une
const DEFAULTS: ComputerConfig = { hdd: '320 GB' };

export class BuildComputerPage {
  readonly page: Page;
  readonly title: Locator;
  readonly price: Locator;
  readonly quantity: Locator;
  readonly addToCartButton: Locator;
  readonly notification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.product-name h1');
    this.price = page.locator('.product-price').first();
    this.quantity = page.locator('.add-to-cart .qty-input');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.notification = page.locator('#bar-notification .content');
  }

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/build-your-cheap-own-computer');
  }

  // Bloc d'une option, repéré par son libellé (Processor, RAM, HDD, OS, Software)
  private attribute(label: string): Locator {
    return this.page
      .locator('.attributes dt', { hasText: new RegExp(`^\\s*${label}`) })
      .locator('xpath=following-sibling::dd[1]');
  }

  private async selectByText(label: string, text: string) {
    const select = this.attribute(label).locator('select');
    const value = await select.locator('option', { hasText: text }).first().getAttribute('value');
    await select.selectOption(value ?? '');
  }

  // Coche exactement les logiciels demandés et décoche les autres
  // (Microsoft Office est coché par défaut sur le site)
  private async setSoftware(wanted: string[]) {
    const boxes = this.attribute('Software').getByRole('checkbox');
    const count = await boxes.count();
    for (let i = 0; i < count; i++) {
      const box = boxes.nth(i);
      const id = await box.getAttribute('id');
      const label = await this.page.locator(`label[for="${id}"]`).innerText();
      await box.setChecked(wanted.some((w) => label.includes(w)));
    }
  }

  async configure(input: ComputerConfig) {
    const config = { ...DEFAULTS, ...input };
    if (config.processor) await this.selectByText('Processor', config.processor);
    if (config.ram) await this.selectByText('RAM', config.ram);
    if (config.hdd) await this.attribute('HDD').getByLabel(config.hdd).check();
    if (config.os) await this.attribute('OS').getByLabel(config.os).check();
    if (config.software) await this.setSoftware(config.software);
    if (config.quantity) await this.quantity.fill(String(config.quantity));
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}