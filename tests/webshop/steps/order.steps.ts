import { Given, When, Then, expect } from './fixtures';
import { parseAmount } from './helpers/amount';
import { ensureLoggedIn, emptyCart, completeCheckout } from './helpers/order';
import { DEFAULT_ADDRESS } from '../pom/checkout.page';

// ---------- Contexte : passer une commande de bout en bout ----------

Given(
  "j'ai passé une commande avec l'article {string}",
  async ({ topBar, loginPage, productPage, cartPage, checkoutPage, completedPage, state }, article: string) => {
    await ensureLoggedIn({ topBar, loginPage });
    await emptyCart(cartPage);

    await productPage.openByName(article);
    await productPage.addToCart(1);

    await cartPage.goto();
    await expect(cartPage.rows).toHaveCount(1);
    await cartPage.checkout();

    state.orderReference = await completeCheckout(checkoutPage, completedPage);
  },
);

// ---------- Panier ----------

When('je sauvegarde le montant total du panier', async ({ cartPage, state }) => {
  // En panier, le total final n'est connu qu'au checkout : on retient le sous-total
  state.savedCartTotal = parseAmount(await cartPage.subTotal.innerText());
});

// ---------- Adresse ----------

When("je renseigne l'adresse de facturation pour un invité", async ({ checkoutPage, page }) => {
  // Pour un invité, nopCommerce propose d'abord "Checkout as Guest"
  const guest = page.getByRole('button', { name: 'Checkout as Guest' });
  if (await guest.isVisible().catch(() => false)) await guest.click();
  await checkoutPage.fillNewBillingAddress(DEFAULT_ADDRESS);
  await checkoutPage.continueShippingAddress();
});

When("je sélectionne l'adresse de facturation sauvegardée", async ({ checkoutPage }) => {
  await checkoutPage.selectSavedBillingAddress();
  await checkoutPage.clickContinue();
  await checkoutPage.continueShippingAddress();
});

When(
  'je renseigne une nouvelle adresse de facturation sans la sauvegarder',
  async ({ checkoutPage }) => {
    await checkoutPage.fillNewBillingAddress(DEFAULT_ADDRESS);
    await checkoutPage.continueShippingAddress();
  },
);

// ---------- Purchase Order ----------

When('je renseigne le numéro de bon de commande {string}', async ({ checkoutPage }, num: string) => {
  await checkoutPage.fillPurchaseOrder(num);
});

// ---------- Livraison / paiement (utilisés aussi par payment-method.feature) ----------

When('je choisis la méthode de livraison {string}', async ({ checkoutPage }, name: string) => {
  await checkoutPage.chooseShippingMethod(name);
});

When('je choisis le moyen de paiement {string}', async ({ checkoutPage }, name: string) => {
  await checkoutPage.choosePaymentMethod(name);
});

// ---------- Résultat ----------

Then("une référence de commande m'est fournie", async ({ completedPage, state }) => {
  const reference = await completedPage.orderReference();
  expect(reference).toMatch(/^\d+$/);
  state.orderReference = reference;
});

Then(
  'le montant total de la commande correspond au montant sauvegardé du panier',
  async ({ completedPage, orderDetailsPage, state }) => {
    await completedPage.openDetails();
    const total = parseAmount(await orderDetailsPage.orderTotal.innerText());
    expect(total).toBeCloseTo(state.savedCartTotal ?? 0, 2);
  },
);

Then('le statut de la commande est {string}', async ({ completedPage, orderDetailsPage }, statut: string) => {
  await completedPage.openDetails();
  await expect(orderDetailsPage.orderStatus).toContainText(statut);
});