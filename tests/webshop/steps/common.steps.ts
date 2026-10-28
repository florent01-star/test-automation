import { expect, Given, When, Then } from './fixtures';
import { addProduct, fillCartWithDifferentProducts } from './helpers/shopping';
import { USER, USER2 } from './helpers/env';


// ---------- Navigation ----------
Given("je suis sur la page d'accueil", async ({ accueilPage }) => {
  await accueilPage.goto();
});

Given('je suis sur la page du panier', async ({ cartPage }) => {
  await cartPage.goto();
});

When('je consulte le panier', async ({ topBar }) => {
  await topBar.goToCart();
});

// ---------- Checkout invité ----------
When("je choisis de commander en tant qu'invité", async ({ page }) => {
  await page.locator('input.checkout-as-guest-button').click();
  await expect(page).toHaveURL(/onepagecheckout/);
});

// ---------- Connexion ----------
Given(
  'que je suis connecté en tant que {string}',
  async ({ loginPage, topBar, state }, email: string) => {
    await loginPage.goto();
    await loginPage.login(email, USER.password);
    await expect(topBar.logoutLink).toBeVisible();
    state.lastEmail = email;
  },
);

Then("ce compte n'a aucune adresse sauvegardée", async ({ addressPage }) => {
  await addressPage.open();
  await addressPage.deleteAll();
});

Given(
  /^que j'ai (\d+) articles? "([^"]+)" dans mon panier$/,
  async ({ page }, quantity: string, name: string) => {
    await addProduct(page, name, Number(quantity));
  },
);

Given(/^que j'ai (\d+) articles? différents? dans mon panier$/, async ({ page }, count: string) => {
  await fillCartWithDifferentProducts(page, Number(count));
});

Given(/^que j'ai (\d+) articles? dans mon panier$/, async ({ page }, count: string) => {
  await fillCartWithDifferentProducts(page, Number(count));
});

// ---------- Boutons génériques ----------
When('je clique sur {string}', async ({ page, cartPage, checkoutPage }, label: string) => {
  switch (label) {
    case 'Checkout':
      // Sur la page panier, le bouton exige les CGV (cochées par un step précédent)
      await cartPage.checkoutButton.click();
      return;
    case 'Update cart':
      await cartPage.updateButton.click();
      return;
    case 'Apply coupon':
      await cartPage.applyCouponButton.click();
      return;
    case 'Add gift card':
      await cartPage.addGiftCardButton.click();
      return;
    case 'Estimate shipping':
      await cartPage.estimateShippingButton.click();
      return;
    case 'Continue shopping':
      await cartPage.continueShopping.click();
      return;
    case 'Confirm':
      await checkoutPage.confirm();
      return;
    case 'Continue': {
      // "Continue" dépend de l'étape active du checkout : on clique le bouton visible
      await checkoutPage.clickContinue();
      return;
    }
    default:
      await page.getByRole('button', { name: label }).click();
  }
});

// ---------- Messages ----------
Then('le message {string} est affiché', async ({ page }, message: string) => {
  await expect(page.getByText(message, { exact: false }).first()).toBeVisible();
});

Then(/^le message d'erreur '(.+)' est affiché en rouge$/, async ({ page }, message: string) => {
  const error = page.getByText(message, { exact: false }).first();
  await expect(error).toBeVisible();
  // Rouge nopCommerce : rgb(228, 67, 75) pour .field-validation-error / .validation-summary-errors
  await expect(error).toHaveCSS('color', /rgb\(2[0-9]{2}, \d+, \d+\)/);
});

// ---------- Compteurs panier ----------
Then(/^le panier contient (\d+) articles?$/, async ({ topBar }, count: string) => {
  await expect.poll(() => topBar.cartCount()).toBe(Number(count));
});

Then('le panier est vide', async ({ cartPage }) => {
  await expect(cartPage.rows).toHaveCount(0);
});

Given("je navigue vers l'historique de mes commandes", async ({ page }) => {
  await page.goto('/customer/orders');
});

Given("je suis sur la page d'inscription", async ({ page }) => {
  await page.goto('/register');
});

Then(
  "je suis connecté avec mail et mot de passe",
  async ({ loginPage, topBar, state }) => {
    await topBar.goToLogin(); // clique sur le lien "Log in"
    await loginPage.login(USER.email, USER.password);
    state.lastEmail = USER.email;
    await expect(topBar.logoutLink).toBeVisible();
  },
);

Then(
  "je suis connecté sans adresse sauvegardée",
  async ({ loginPage, topBar, state }) => {
    await topBar.goToLogin(); // clique sur le lien "Log in"
    await loginPage.login(USER2.email, USER2.password);
    state.lastEmail = USER2.email;
    await expect(topBar.logoutLink).toBeVisible();
  },
);