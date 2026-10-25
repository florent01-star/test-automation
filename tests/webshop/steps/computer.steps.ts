import { test, expect, Given, When, Then } from './fixtures';



// ─── Ouverture de la page ───────────────────────────────────────────
Given("je suis sur la page {string}", async ({ computerPage }, url: string) => {
  await computerPage.open(); // ou goto(url) si tu veux paramétrer
});

// ─── Configuration des options ──────────────────────────────────────
When("je configure l'ordinateur avec:", async ({ computerPage }, dataTable) => {
  const data = dataTable.rowsHash();

  if (data['Processor']) await computerPage.selectProcessor(data['Processor']);
  if (data['RAM']) await computerPage.selectRam(data['RAM']);
  if (data['HDD']) await computerPage.selectHdd(data['HDD']);
  if (data['OS']) await computerPage.selectOs(data['OS']);

  // Software : repartir de zéro (décoche l'option pré-cochée par défaut)
  await computerPage.uncheckAllSoftware();

  // Format 1 : valeur directe, ex. | Software | Acrobat Reader [+10.00] |
  // 'aucun' (peu importe la casse) → on ne coche rien
  if (data['Software'] && data['Software'].toLowerCase() !== 'aucun') {
    await computerPage.toggleSoftware(data['Software'], true);
  }

  // Format 2 : une ligne par software, ex. | Acrobat Reader | oui |
  for (const [label, value] of Object.entries(data)) {
    if (['Processor', 'RAM', 'HDD', 'OS', 'Software'].includes(label)) continue;
    if (value === 'oui' || value === 'true') {
      await computerPage.toggleSoftware(label, true);
    }
  }
});

When("je mets la quantite a {int}", async ({ computerPage }, qty: number) => {
  await computerPage.setQty(qty);
});

// ─── Ajout au panier ────────────────────────────────────────────────
When("j'ajoute l'ordinateur au panier", async ({ computerPage }) => {
  await computerPage.addToCart();
});

// ─── Vérifications ──────────────────────────────────────────────────
Then("le prix affiche est {string}", async ({ computerPage }, expected: string) => {
  await expect(computerPage.priceLabel).toHaveText(expected);
});

Then("le produit {string} est dans le panier", async ({ cartPage }, productName: string) => {
  await cartPage.goto();
  await expect(cartPage.row(productName)).toBeVisible();
});

Then(
  'je retrouve les options choisies',
  async ({ cartPage }, dataTable ) => {
    const data = dataTable.rowsHash() as Record<string, string>;

    for (const [attribute, expected] of Object.entries(data)) {
      if (!expected || expected.toLowerCase() === 'aucun') continue;

      const expectedName = expected.replace(/\s*\[\+[\d.,]+\]\s*/i, '').trim();

      const line = await cartPage.attributeLine('Build your own computer', attribute);
      expect(line, `Attribut ${attribute}`).toContain(expectedName);
    }
  }
);

Then('le sous-total du panier est {string}', async ({ cartPage }, expected: string) => {
  if (!cartPage.page.url().includes('/cart')) {
    await cartPage.goto();
  }
  await expect(cartPage.subTotal).toContainText(expected);
});
