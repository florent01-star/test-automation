import { Page, Locator, expect } from '@playwright/test';

export class AddressPage {
  readonly page: Page;
  readonly emailLink: Locator;          // le lien = l'email dans le header
  readonly addressesLink: Locator;
  readonly noAddressesMessage: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    // Le lien "My account" affiche l'email de l'utilisateur connecté
    this.emailLink = page.locator('.header-links .account, .header a[href*="/customer/info"]');
    this.addressesLink = page.getByRole('link', { name: /addresses/i }).first();
    this.noAddressesMessage = page.getByText(/no addresses/i);
    this.deleteButtons = page.locator('input.button-2.delete-address-button');
  }

  async open() {
    // 1. Cliquer sur l'email dans le header → page My Account
    await this.emailLink.click();

    // 2. Puis sur "Addresses"
    await this.addressesLink.click();

    await this.page.waitForLoadState('networkidle');
  }

  async isEmpty(): Promise<boolean> {
    return this.noAddressesMessage.isVisible();
  }

  async deleteFirst() {
  const deleteButton = this.page.getByRole('button', { name: 'Delete' }).first();

  const dialogAccepted = this.page
    .waitForEvent('dialog')
    .then((dialog) => dialog.accept());

  await deleteButton.click();
  await dialogAccepted;

  // la suppression fait une navigation vers /customer/addressdelete/...
  await this.page.waitForLoadState('networkidle');
}

async deleteAll() {
  // Tant qu'il reste des adresses, on en supprime une
  while ((await this.deleteButtons.count()) > 0) {
    await this.deleteFirst();
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }
  // Fini : plus aucun bouton Delete → le message doit être visible
  await expect(this.noAddressesMessage).toBeVisible();
}
}