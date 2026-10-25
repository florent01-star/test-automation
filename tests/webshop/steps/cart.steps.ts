import { test, expect, Given, When, Then } from './fixtures';
import { parseAmount, fmt } from './helpers/amount';
import { Page } from '@playwright/test';

// ---------- Suppression ----------
When("je supprime l'article {string}", async ({ cartPage, state }, article: string) => {
  state.deletedArticle = article;
  await cartPage.remove(article);
});

When('je supprime tous les articles du panier', async ({ cartPage }) => {
  await cartPage.goto();
  await cartPage.removeAll();
});

Then("l'article {string} n'apparait plus dans le panier", async ({ cartPage }, article: string) => {
  await expect(cartPage.row(article)).toHaveCount(0);
});

// ---------- Quantité ----------
When(
  "je modifie la quantité de l'article {string} à {string}",
  async ({ cartPage, state }, article: string, quantite: string) => {
    state.lastQuantity = Number(quantite);
    await cartPage.row(article).locator('input.qty-input').fill(quantite);
  },
);

Then(
  /^le total de la ligne '(.+)' correspond au prix unitaire multiplié par '(\d+)'$/,
  async ({ cartPage }, article: string, quantite: string) => {
    const unit = parseAmount(await cartPage.unitPrice(article).innerText());
    const line = parseAmount(await cartPage.lineTotal(article).innerText());
    expect(line).toBeCloseTo(fmt(unit * Number(quantite)), 2);
  },
);

Then('le sous-total du panier correspond à la somme des lignes', async ({ cartPage }) => {
  const lines = await cartPage.rows.locator('.product-subtotal').allInnerTexts();
  const sum = lines.reduce((acc, t) => acc + parseAmount(t), 0);
  const subTotal = parseAmount(await cartPage.subTotal.innerText());
  expect(subTotal).toBeCloseTo(fmt(sum), 2);
});

// ---------- Coupons & cartes cadeaux ----------
When('je saisis le code de réduction {string}', async ({ cartPage, state }, code: string) => {
  state.initialSubTotal = parseAmount(await cartPage.subTotal.innerText());
  await cartPage.couponInput.fill(code);
});

When('je saisis le code de carte cadeau {string}', async ({ cartPage }, code: string) => {
  await cartPage.giftCardInput.fill(code);
});

Then('le total après remise est inférieur au sous-total initial', async ({ cartPage, state }) => {
  const total = parseAmount(await cartPage.total.innerText());
  expect(total).toBeLessThan(state.initialSubTotal ?? Infinity);
});

Then(
  'le montant total du panier après réduction est inférieur au sous-total initial',
  async ({ cartPage, state }) => {
    await expect(cartPage.discountLine).toBeVisible();

    const rawSubTotal = (await cartPage.subTotal.textContent()) ?? '';
    const rawTotal = (await cartPage.total.textContent()) ?? '';

    const subTotal = parseAmount(rawSubTotal);
    const total = rawTotal.includes('Calculated during checkout')
      ? null
      : parseAmount(rawTotal);

    const reference = state.initialSubTotal ?? subTotal;

    if (total !== null) {
      expect(total).toBeLessThan(reference);
    } else {
      // Total masqué : on vérifie via la ligne de réduction
      const discount = parseAmount((await cartPage.discountLine.textContent()) ?? '');
      expect(discount).toBeGreaterThan(0);
      expect(subTotal - discount).toBeLessThan(reference);
    }
  },
);

// ---------- CGV & checkout ----------
When("je coche l'acceptation des conditions générales", async ({ cartPage }) => {
  await cartPage.termsCheckbox.check();
});

When("je ne coche pas l'acceptation des conditions", async ({ cartPage }) => {
  await cartPage.termsCheckbox.uncheck();
});

Then('je reste sur la page du panier', async ({ page }) => {
  await expect(page).toHaveURL(/\/cart/);
});

// ---------- Livraison ----------
When('je sélectionne le pays {string}', async ({ cartPage }, pays: string) => {
  await cartPage.countrySelect.selectOption({ label: pays });
});

When('je saisis le code postal {string}', async ({ cartPage }, zip: string) => {
  await cartPage.zipInput.fill(zip);
});

Then('les options de livraison sont affichées avec leur coût', async ({ page }) => {
  const options = page.locator('.shipping-results li, .shipping-option, .estimate-shipping-popup li');
  await expect(options.first()).toBeVisible();
  await expect(options.first()).toContainText(/\d+\.\d{2}/);
});

// ---------- Navigation ----------
Then("je suis redirigé sur la page d'accueil", async ({ page }) => {
  await expect(page).toHaveURL(/demowebshop\.tricentis\.com\/?$/);
});

Then('le panier est vide avec le message {string}', async ({ cartPage }, msg: string) => {
  await expect(cartPage.emptyMessage).toContainText(msg);
});

const PRODUCT_URLS: Record<string, string> = {
  'Black & White Diamond Heart': '/black-white-diamond-heart',
  'Blue Jeans': '/blue-jeans',
  'Casual Golf Belt': '/casual-belt',
};

async function addProductToCart(page: Page, name: string, qty: number) {
  const url = PRODUCT_URLS[name];
  if (!url) throw new Error(`URL inconnue pour le produit "${name}"`);
  await page.goto(url);
  await page.locator('.qty-input').fill(String(qty));
  await page.locator('input[value="Add to cart"]').first().click();
  await expect(page.locator('.bar-notification.success')).toBeVisible();
}

Given('j\'ai {int} article {string} dans mon panier', async ({ page }, qty: number, name: string) => {
  await addProductToCart(page, name, qty);
});

Given('j\'ai {int} article dans mon panier', async ({ page }, qty: number) => {
  await addProductToCart(page, 'Black & White Diamond Heart', qty);
});

Given('j\'ai {int} articles différents dans mon panier', async ({ page }, count: number) => {
  const products = ['Blue Jeans', 'Casual Golf Belt', 'Black & White Diamond Heart'];
  for (const p of products.slice(0, count)) {
    await addProductToCart(page, p, 1);
  }
});
