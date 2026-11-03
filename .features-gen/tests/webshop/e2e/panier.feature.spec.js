// Generated from: tests\webshop\e2e\panier.feature
import { test } from "../../../../tests/webshop/steps/fixtures.ts";

test.describe('Panier', () => {

  test.beforeEach('Contexte', async ({ Given, cartPage }, testInfo) => { if (testInfo.error) return;
    await Given('je suis sur la page du panier', null, { cartPage }); 
  });
  
  test.describe('Supprimer un article parmi trois', () => {

    test('Exemples: #1', async ({ Given, When, Then, And, cartPage, page, state, topBar }) => { 
      await Given('j\'ai 3 articles différents dans mon panier', null, { page }); 
      await And('je suis sur la page du panier', null, { cartPage }); 
      await When('je supprime l\'article \'Blue Jeans\'', null, { cartPage, state }); 
      await Then('le panier contient 2 articles', null, { topBar }); 
      await And('l\'article \'Blue Jeans\' n\'apparait plus dans le panier', null, { cartPage }); 
    });

    test('Exemples: #2', async ({ Given, When, Then, And, cartPage, page, state, topBar }) => { 
      await Given('j\'ai 3 articles différents dans mon panier', null, { page }); 
      await And('je suis sur la page du panier', null, { cartPage }); 
      await When('je supprime l\'article \'Casual Golf Belt\'', null, { cartPage, state }); 
      await Then('le panier contient 2 articles', null, { topBar }); 
      await And('l\'article \'Casual Golf Belt\' n\'apparait plus dans le panier', null, { cartPage }); 
    });

  });

  test.describe('Modifier la quantité met à jour les totaux', () => {

    test('Exemples: #1', async ({ Given, When, Then, And, cartPage, checkoutPage, page, state }) => { 
      await Given('j\'ai 2 articles différents dans mon panier', null, { page }); 
      await And('je suis sur la page du panier', null, { cartPage }); 
      await When('je modifie la quantité de l\'article \'Blue Jeans\' à \'5\'', null, { cartPage, state }); 
      await And('je clique sur "Update cart"', null, { cartPage, checkoutPage, page }); 
      await Then('le total de la ligne \'Blue Jeans\' correspond au prix unitaire multiplié par \'5\'', null, { cartPage }); 
      await And('le sous-total du panier correspond à la somme des lignes', null, { cartPage }); 
    });

    test('Exemples: #2', async ({ Given, When, Then, And, cartPage, checkoutPage, page, state }) => { 
      await Given('j\'ai 2 articles différents dans mon panier', null, { page }); 
      await And('je suis sur la page du panier', null, { cartPage }); 
      await When('je modifie la quantité de l\'article \'Casual Golf Belt\' à \'7\'', null, { cartPage, state }); 
      await And('je clique sur "Update cart"', null, { cartPage, checkoutPage, page }); 
      await Then('le total de la ligne \'Casual Golf Belt\' correspond au prix unitaire multiplié par \'7\'', null, { cartPage }); 
      await And('le sous-total du panier correspond à la somme des lignes', null, { cartPage }); 
    });

  });

  test('Appliquer un code de réduction invalide', async ({ Given, When, Then, And, cartPage, checkoutPage, page, state }) => { 
    await Given('j\'ai 1 article dans mon panier', null, { page }); 
    await And('je suis sur la page du panier', null, { cartPage }); 
    await When('je saisis le code de réduction "CODEINVALIDE123"', null, { cartPage, state }); 
    await And('je clique sur "Apply coupon"', null, { cartPage, checkoutPage, page }); 
    await Then('le message "The coupon code you entered couldn\'t be applied to your order" est affiché', null, { page }); 
  });

  test('Appliquer un code de réduction valide', async ({ Given, When, Then, And, cartPage, checkoutPage, page, state }) => { 
    await Given('j\'ai 1 article dans mon panier', null, { page }); 
    await And('je suis sur la page du panier', null, { cartPage }); 
    await When('je saisis le code de réduction "PercentageTotal"', null, { cartPage, state }); 
    await And('je clique sur "Apply coupon"', null, { cartPage, checkoutPage, page }); 
    await Then('le message "The coupon code was applied" est affiché', null, { page }); 
    await And('le montant total du panier après réduction est inférieur au sous-total initial', null, { cartPage, state }); 
  });

  test('Checkout sans accepter les conditions générales', async ({ Given, When, Then, And, cartPage, checkoutPage, page }) => { 
    await Given('j\'ai 1 article dans mon panier', null, { page }); 
    await And('je suis sur la page du panier', null, { cartPage }); 
    await When('je ne coche pas l\'acceptation des conditions', null, { cartPage }); 
    await And('je clique sur "Checkout"', null, { cartPage, checkoutPage, page }); 
    await Then('le message "Please accept the terms of service before the next step." est affiché', null, { page }); 
    await And('je reste sur la page du panier', null, { page }); 
  });

  test.describe('Estimer les frais de livraison', () => {

    test('Exemples: #1', async ({ Given, When, Then, And, cartPage, checkoutPage, page }) => { 
      await Given('j\'ai 1 article dans mon panier', null, { page }); 
      await And('je suis sur la page du panier', null, { cartPage }); 
      await When('je sélectionne le pays \'United States\'', null, { cartPage }); 
      await And('je saisis le code postal \'90210\'', null, { cartPage }); 
      await And('je clique sur "Estimate shipping"', null, { cartPage, checkoutPage, page }); 
      await Then('les options de livraison sont affichées avec leur coût', null, { page }); 
    });

    test('Exemples: #2', async ({ Given, When, Then, And, cartPage, checkoutPage, page }) => { 
      await Given('j\'ai 1 article dans mon panier', null, { page }); 
      await And('je suis sur la page du panier', null, { cartPage }); 
      await When('je sélectionne le pays \'France\'', null, { cartPage }); 
      await And('je saisis le code postal \'75001\'', null, { cartPage }); 
      await And('je clique sur "Estimate shipping"', null, { cartPage, checkoutPage, page }); 
      await Then('les options de livraison sont affichées avec leur coût', null, { page }); 
    });

  });

  test('Continuer ses achats depuis le panier', async ({ Given, When, Then, And, cartPage, checkoutPage, page }) => { 
    await Given('j\'ai 1 article dans mon panier', null, { page }); 
    await And('je suis sur la page du panier', null, { cartPage }); 
    await When('je clique sur "Continue shopping"', null, { cartPage, checkoutPage, page }); 
    await Then('je suis redirigé sur la page d\'accueil', null, { page }); 
  });

  test('Appliquer une carte cadeau invalide', async ({ Given, When, Then, And, cartPage, checkoutPage, page }) => { 
    await Given('j\'ai 1 article dans mon panier', null, { page }); 
    await And('je suis sur la page du panier', null, { cartPage }); 
    await When('je saisis le code de carte cadeau "GIFT-INVALID-123"', null, { cartPage }); 
    await And('je clique sur "Add gift card"', null, { cartPage, checkoutPage, page }); 
    await Then('le message "The coupon code you entered couldn\'t be applied to your order" est affiché', null, { page }); 
  });

  test('Vider entièrement le panier', async ({ Given, When, Then, And, cartPage, page }) => { 
    await Given('j\'ai 3 articles différents dans mon panier', null, { page }); 
    await And('je suis sur la page du panier', null, { cartPage }); 
    await When('je supprime tous les articles du panier', null, { cartPage }); 
    await Then('le panier est vide', null, { cartPage }); 
    await And('le message "Your Shopping Cart is empty!" est affiché', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\webshop\\e2e\\panier.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":16,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 3 articles différents dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"3"},"parameterTypeName":"int"}]},{"pwStepLine":14,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"Quand je supprime l'article 'Blue Jeans'","stepMatchArguments":[{"group":{"start":22,"value":"'Blue Jeans'","children":[{"children":[{}]},{"start":23,"value":"Blue Jeans","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Alors le panier contient 2 articles","stepMatchArguments":[{"group":{"start":19,"value":"2"},"parameterTypeName":"int"}]},{"pwStepLine":17,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Et l'article 'Blue Jeans' n'apparait plus dans le panier","stepMatchArguments":[{"group":{"start":10,"value":"'Blue Jeans'","children":[{"children":[{}]},{"start":11,"value":"Blue Jeans","children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":20,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 3 articles différents dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"3"},"parameterTypeName":"int"}]},{"pwStepLine":22,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"Quand je supprime l'article 'Casual Golf Belt'","stepMatchArguments":[{"group":{"start":22,"value":"'Casual Golf Belt'","children":[{"children":[{}]},{"start":23,"value":"Casual Golf Belt","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Alors le panier contient 2 articles","stepMatchArguments":[{"group":{"start":19,"value":"2"},"parameterTypeName":"int"}]},{"pwStepLine":25,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Et l'article 'Casual Golf Belt' n'apparait plus dans le panier","stepMatchArguments":[{"group":{"start":10,"value":"'Casual Golf Belt'","children":[{"children":[{}]},{"start":11,"value":"Casual Golf Belt","children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":32,"pickleLine":29,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 2 articles différents dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"2"},"parameterTypeName":"int"}]},{"pwStepLine":34,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"Quand je modifie la quantité de l'article 'Blue Jeans' à '5'","stepMatchArguments":[{"group":{"start":36,"value":"'Blue Jeans'","children":[{"children":[{}]},{"start":37,"value":"Blue Jeans","children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":51,"value":"'5'","children":[{"children":[{}]},{"start":52,"value":"5","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"Et je clique sur \"Update cart\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Update cart\"","children":[{"start":15,"value":"Update cart","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":37,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Alors le total de la ligne 'Blue Jeans' correspond au prix unitaire multiplié par '5'","stepMatchArguments":[{"group":{"start":22,"value":"Blue Jeans"}},{"group":{"start":77,"value":"5"},"parameterTypeName":"int"}]},{"pwStepLine":38,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Et le sous-total du panier correspond à la somme des lignes","stepMatchArguments":[]}]},
  {"pwTestLine":41,"pickleLine":30,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 2 articles différents dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"2"},"parameterTypeName":"int"}]},{"pwStepLine":43,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"Quand je modifie la quantité de l'article 'Casual Golf Belt' à '7'","stepMatchArguments":[{"group":{"start":36,"value":"'Casual Golf Belt'","children":[{"children":[{}]},{"start":37,"value":"Casual Golf Belt","children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":57,"value":"'7'","children":[{"children":[{}]},{"start":58,"value":"7","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"Et je clique sur \"Update cart\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Update cart\"","children":[{"start":15,"value":"Update cart","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Alors le total de la ligne 'Casual Golf Belt' correspond au prix unitaire multiplié par '7'","stepMatchArguments":[{"group":{"start":22,"value":"Casual Golf Belt"}},{"group":{"start":83,"value":"7"},"parameterTypeName":"int"}]},{"pwStepLine":47,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Et le sous-total du panier correspond à la somme des lignes","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":32,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 1 article dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"1"},"parameterTypeName":"int"}]},{"pwStepLine":54,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"Quand je saisis le code de réduction \"CODEINVALIDE123\"","stepMatchArguments":[{"group":{"start":31,"value":"\"CODEINVALIDE123\"","children":[{"start":32,"value":"CODEINVALIDE123","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":56,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"Et je clique sur \"Apply coupon\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Apply coupon\"","children":[{"start":15,"value":"Apply coupon","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Alors le message \"The coupon code you entered couldn't be applied to your order\" est affiché","stepMatchArguments":[{"group":{"start":11,"value":"\"The coupon code you entered couldn't be applied to your order\"","children":[{"start":12,"value":"The coupon code you entered couldn't be applied to your order","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":60,"pickleLine":39,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 1 article dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"1"},"parameterTypeName":"int"}]},{"pwStepLine":62,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"Quand je saisis le code de réduction \"PercentageTotal\"","stepMatchArguments":[{"group":{"start":31,"value":"\"PercentageTotal\"","children":[{"start":32,"value":"PercentageTotal","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":64,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"Et je clique sur \"Apply coupon\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Apply coupon\"","children":[{"start":15,"value":"Apply coupon","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Alors le message \"The coupon code was applied\" est affiché","stepMatchArguments":[{"group":{"start":11,"value":"\"The coupon code was applied\"","children":[{"start":12,"value":"The coupon code was applied","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Et le montant total du panier après réduction est inférieur au sous-total initial","stepMatchArguments":[]}]},
  {"pwTestLine":69,"pickleLine":47,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":48,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 1 article dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"1"},"parameterTypeName":"int"}]},{"pwStepLine":71,"gherkinStepLine":49,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"Quand je ne coche pas l'acceptation des conditions","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"Et je clique sur \"Checkout\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Checkout\"","children":[{"start":15,"value":"Checkout","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":74,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"Alors le message \"Please accept the terms of service before the next step.\" est affiché","stepMatchArguments":[{"group":{"start":11,"value":"\"Please accept the terms of service before the next step.\"","children":[{"start":12,"value":"Please accept the terms of service before the next step.","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":75,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Et je reste sur la page du panier","stepMatchArguments":[]}]},
  {"pwTestLine":80,"pickleLine":65,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 1 article dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"1"},"parameterTypeName":"int"}]},{"pwStepLine":82,"gherkinStepLine":57,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"Quand je sélectionne le pays 'United States'","stepMatchArguments":[{"group":{"start":23,"value":"'United States'","children":[{"children":[{}]},{"start":24,"value":"United States","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":84,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"Et je saisis le code postal '90210'","stepMatchArguments":[{"group":{"start":25,"value":"'90210'","children":[{"children":[{}]},{"start":26,"value":"90210","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":85,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"Et je clique sur \"Estimate shipping\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Estimate shipping\"","children":[{"start":15,"value":"Estimate shipping","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":86,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Alors les options de livraison sont affichées avec leur coût","stepMatchArguments":[]}]},
  {"pwTestLine":89,"pickleLine":66,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 1 article dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"1"},"parameterTypeName":"int"}]},{"pwStepLine":91,"gherkinStepLine":57,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"Quand je sélectionne le pays 'France'","stepMatchArguments":[{"group":{"start":23,"value":"'France'","children":[{"children":[{}]},{"start":24,"value":"France","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":93,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"Et je saisis le code postal '75001'","stepMatchArguments":[{"group":{"start":25,"value":"'75001'","children":[{"children":[{}]},{"start":26,"value":"75001","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":94,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"Et je clique sur \"Estimate shipping\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Estimate shipping\"","children":[{"start":15,"value":"Estimate shipping","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":95,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Alors les options de livraison sont affichées avec leur coût","stepMatchArguments":[]}]},
  {"pwTestLine":100,"pickleLine":68,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":69,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 1 article dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"1"},"parameterTypeName":"int"}]},{"pwStepLine":102,"gherkinStepLine":70,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":71,"keywordType":"Action","textWithKeyword":"Quand je clique sur \"Continue shopping\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Continue shopping\"","children":[{"start":15,"value":"Continue shopping","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":104,"gherkinStepLine":72,"keywordType":"Outcome","textWithKeyword":"Alors je suis redirigé sur la page d'accueil","stepMatchArguments":[]}]},
  {"pwTestLine":107,"pickleLine":74,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":75,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 1 article dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"1"},"parameterTypeName":"int"}]},{"pwStepLine":109,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"Quand je saisis le code de carte cadeau \"GIFT-INVALID-123\"","stepMatchArguments":[{"group":{"start":34,"value":"\"GIFT-INVALID-123\"","children":[{"start":35,"value":"GIFT-INVALID-123","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":111,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"Et je clique sur \"Add gift card\"","stepMatchArguments":[{"group":{"start":14,"value":"\"Add gift card\"","children":[{"start":15,"value":"Add gift card","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":112,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Alors le message \"The coupon code you entered couldn't be applied to your order\" est affiché","stepMatchArguments":[{"group":{"start":11,"value":"\"The coupon code you entered couldn't be applied to your order\"","children":[{"start":12,"value":"The coupon code you entered couldn't be applied to your order","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":115,"pickleLine":81,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":82,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai 3 articles différents dans mon panier","stepMatchArguments":[{"group":{"start":5,"value":"3"},"parameterTypeName":"int"}]},{"pwStepLine":117,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"Quand je supprime tous les articles du panier","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"Alors le panier est vide","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Et le message \"Your Shopping Cart is empty!\" est affiché","stepMatchArguments":[{"group":{"start":11,"value":"\"Your Shopping Cart is empty!\"","children":[{"start":12,"value":"Your Shopping Cart is empty!","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end