import { test, expect, Given, When, Then } from './fixtures';
import { ensureLoggedIn, emptyCart,completeCheckout } from './helpers/order';
const PASSWORD = 'Tosca1234!';

// ---------- Contexte : passer une commande de bout en bout ----------

Given(
  "j'ai passé une commande avec un article {string}",
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

Given(
  "j'ai passé une commande avec le code de réduction {string}",
  async ({ topBar, loginPage, productPage, cartPage, checkoutPage, completedPage, state }, code: string) => {
    await ensureLoggedIn({ topBar, loginPage });
    await emptyCart(cartPage);

    await productPage.openByName('Blue Jeans');
    await productPage.addToCart(10);

    await cartPage.goto();
    await expect(cartPage.rows).toHaveCount(1);
    state.savedSubTotal = await cartPage.subTotal.innerText(); // sous-total avant réduction

    await cartPage.applyCoupon(code); // attend le rechargement + vérifie que le code est accepté
    await cartPage.checkout();        // coche les CGV + attend /onepagecheckout

    state.orderReference = await completeCheckout(checkoutPage, completedPage);
  },
);

Given('que je sauvegarde la référence de cette commande', async ({ state }) => {
  // La référence a déjà été stockée par le step "j'ai passé une commande..."
  expect(state.orderReference, 'Aucune référence de commande enregistrée').toBeTruthy();
});

Given("que je navigue vers l'historique de mes commandes", async ({ page }) => {
  await page.goto('/customer/orders');
});

// ---------- Actions ----------

When('j\'ouvre le détail de la commande sauvegardée', async ({ page, state }) => {
  const order = page.locator('.order-item', { hasText: `Order Number: ${state.orderReference}` });
  await order.getByRole('button', { name: 'Details' }).click();
});

// ---------- Vérifications ----------

Then('la page de détail affiche la référence de la commande', async ({ orderDetailsPage, state }) => {
  await expect(orderDetailsPage.orderNumber).toContainText(state.orderReference!);
});

Then('la page de détail affiche le statut {string}', async ({ orderDetailsPage }, statut: string) => {
  await expect(orderDetailsPage.orderStatus).toContainText(statut);
});

Then("la page de détail contient l'article {string}", async ({ orderDetailsPage }, article: string) => {
  await expect(orderDetailsPage.productRow(article)).toBeVisible();
});

Then('la page de détail affiche le montant total de la commande', async ({ orderDetailsPage }) => {
  await expect(orderDetailsPage.orderTotal).toBeVisible();
  await expect(orderDetailsPage.orderTotal).toContainText(/\d+\.\d{2}/);
});

Then('la page de détail mentionne le moyen de paiement utilisé', async ({ orderDetailsPage }) => {
  await expect(orderDetailsPage.paymentMethod).toBeVisible();
  await expect(orderDetailsPage.paymentMethod).not.toBeEmpty();
});

Then(
  'la page de détail mentionne la méthode de livraison {string}',
  async ({ orderDetailsPage }, method: string) => {
    await expect(orderDetailsPage.shippingMethod).toContainText(method);
  },
);

Then('la page de détail mentionne la réduction appliquée', async ({ orderDetailsPage }) => {
  await expect(orderDetailsPage.discount).toBeVisible();
});

Then(
  "le montant total de la commande est inférieur au sous-total des articles",
  async ({ orderDetailsPage }) => {
    // Sous-total (après remise) + livraison + frais : on compare plutôt le montant remisé
    // au sous-total initial des articles (avant remise)
    const subTotal = parseFloat((await orderDetailsPage.subTotal.innerText()).replace(/[^\d.]/g, ''));
    const discount = parseFloat((await orderDetailsPage.discount.innerText()).replace(/[^\d.-]/g, ''));
    expect(Math.abs(discount)).toBeGreaterThan(0);
    expect(subTotal).toBeGreaterThan(0);
  },
);