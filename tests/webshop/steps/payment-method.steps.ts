import { test, expect, Given, When, Then } from './fixtures';
// Rappel : les écrans "Payment Information" diffèrent selon le moyen de paiement :
//  - Check / Money Order, Cash On Delivery : simple texte d'information
//  - Credit Card : formulaire carte
//  - Purchase Order : champ n° de bon de commande
// Les frais additionnels (5.00 / 7.00) ne s'affichent que pour certains moyens (à traiter dans un second temps).

// ---------- Carte bancaire ----------

When('je sélectionne le type de carte {string}', async ({ page }, type: string) => {
  await page.locator('#CreditCardType').selectOption({ label: type });
});

When('je renseigne le titulaire de la carte {string}', async ({ page }, holder: string) => {
  await page.locator('#CardholderName').fill(holder);
});

When('je renseigne le numéro de carte {string}', async ({ page }, number: string) => {
  await page.locator('#CardNumber').fill(number);
});

When("je renseigne la date d'expiration {string}", async ({ page }, date: string) => {
  // Format attendu : "04/2028"
  const [month, year] = date.split('/');
  await page.locator('#ExpireMonth').selectOption({ value: String(parseInt(month, 10)) });
  await page.locator('#ExpireYear').selectOption({ value: year });
});

When('je renseigne le code de sécurité {string}', async ({ page }, code: string) => {
  await page.locator('#CardCode').fill(code);
});

Then(
  "un message d'erreur concernant le numéro de carte est affiché",
  async ({ page }) => {
    // Erreur de validation à l'étape Payment Information
  await expect(
      page.getByText(/wrong card number/i),
    ).toBeVisible();
  },
);

Then('je ne peux pas confirmer la commande', async ({ page }) => {
  // L'étape "Confirm Order" ne s'est pas ouverte : le bouton Confirm n'est pas visible
  await expect(page.locator('#confirm-order-buttons-container input.confirm-order-next-step-button')).toBeHidden();
});



Then(
  "un message d'erreur concernant le numéro de bon de commande est affiché",
  async ({ page }) => {
    const error = page.locator(
      '#payment-info-load .message-error, #payment-info-load .field-validation-error, #payment-info-load .validation-summary-errors',
    );
    await expect(error.first()).toBeVisible();
    await expect(error.first()).toContainText(/purchase order/i);
  },
);