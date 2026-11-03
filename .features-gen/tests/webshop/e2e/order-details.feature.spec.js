// Generated from: tests\webshop\e2e\order-details.feature
import { test } from "../../../../tests/webshop/steps/fixtures.ts";

test.describe('Détail d\'une commande', () => {
  test.describe.configure({"mode":"serial"});

  test.beforeEach('Contexte', async ({ Given, And, accueilPage, cartPage, loginPage, state, topBar }, testInfo) => { if (testInfo.error) return;
    await Given('je suis sur la page d\'accueil', null, { accueilPage }); 
    await And('je suis connecté avec mail et mot de passe', null, { loginPage, state, topBar }); 
    await And('je suis sur la page du panier', null, { cartPage }); 
    await And('je supprime tous les articles du panier', null, { cartPage }); 
  });
  
  test('Consulter le détail de la dernière commande', { tag: ['@mode:serial'] }, async ({ Given, When, Then, And, cartPage, checkoutPage, completedPage, loginPage, orderDetailsPage, page, productPage, state, topBar }) => { 
    await Given('j\'ai passé une commande avec un article "Blue Jeans"', null, { cartPage, checkoutPage, completedPage, loginPage, productPage, state, topBar }); 
    await And('je sauvegarde la référence de cette commande', null, { state }); 
    await And('je navigue vers l\'historique de mes commandes', null, { page }); 
    await When('j\'ouvre le détail de la commande sauvegardée', null, { page, state }); 
    await Then('la page de détail affiche la référence de la commande', null, { orderDetailsPage, state }); 
    await And('la page de détail affiche le statut "Pending"', null, { orderDetailsPage }); 
    await And('la page de détail contient l\'article "Blue Jeans"', null, { orderDetailsPage }); 
    await And('la page de détail affiche le montant total de la commande', null, { orderDetailsPage }); 
  });

  test('Vérifier le moyen de paiement dans le détail', { tag: ['@mode:serial'] }, async ({ Given, When, Then, And, cartPage, checkoutPage, completedPage, loginPage, orderDetailsPage, page, productPage, state, topBar }) => { 
    await Given('j\'ai passé une commande avec un article "Blue Jeans"', null, { cartPage, checkoutPage, completedPage, loginPage, productPage, state, topBar }); 
    await And('je sauvegarde la référence de cette commande', null, { state }); 
    await And('je navigue vers l\'historique de mes commandes', null, { page }); 
    await When('j\'ouvre le détail de la commande sauvegardée', null, { page, state }); 
    await Then('la page de détail mentionne le moyen de paiement utilisé', null, { orderDetailsPage }); 
    await And('la page de détail mentionne la méthode de livraison "Ground"', null, { orderDetailsPage }); 
  });

  test('Vérifier qu\'une réduction est appliquée', { tag: ['@mode:serial'] }, async ({ Given, When, Then, And, cartPage, checkoutPage, completedPage, loginPage, orderDetailsPage, page, productPage, state, topBar }) => { 
    await Given('j\'ai passé une commande avec le code de réduction "PercentageTotal"', null, { cartPage, checkoutPage, completedPage, loginPage, productPage, state, topBar }); 
    await And('je sauvegarde la référence de cette commande', null, { state }); 
    await And('je navigue vers l\'historique de mes commandes', null, { page }); 
    await When('j\'ouvre le détail de la commande sauvegardée', null, { page, state }); 
    await Then('la page de détail mentionne la réduction appliquée', null, { orderDetailsPage }); 
    await And('le montant total de la commande est inférieur au sous-total des articles', null, { orderDetailsPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\webshop\\e2e\\order-details.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":14,"pickleLine":11,"tags":["@mode:serial"],"steps":[{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'accueil","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Et que je suis connecté avec mail et mot de passe","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Et que je supprime tous les articles du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai passé une commande avec un article \"Blue Jeans\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Blue Jeans\"","children":[{"start":41,"value":"Blue Jeans","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Et que je sauvegarde la référence de cette commande","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Et que je navigue vers l'historique de mes commandes","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"Quand j'ouvre le détail de la commande sauvegardée","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Alors la page de détail affiche la référence de la commande","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Et la page de détail affiche le statut \"Pending\"","stepMatchArguments":[{"group":{"start":36,"value":"\"Pending\"","children":[{"start":37,"value":"Pending","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Et la page de détail contient l'article \"Blue Jeans\"","stepMatchArguments":[{"group":{"start":37,"value":"\"Blue Jeans\"","children":[{"start":38,"value":"Blue Jeans","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Et la page de détail affiche le montant total de la commande","stepMatchArguments":[]}]},
  {"pwTestLine":25,"pickleLine":21,"tags":["@mode:serial"],"steps":[{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'accueil","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Et que je suis connecté avec mail et mot de passe","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Et que je supprime tous les articles du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai passé une commande avec un article \"Blue Jeans\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Blue Jeans\"","children":[{"start":41,"value":"Blue Jeans","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Et que je sauvegarde la référence de cette commande","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"Et que je navigue vers l'historique de mes commandes","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"Quand j'ouvre le détail de la commande sauvegardée","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Alors la page de détail mentionne le moyen de paiement utilisé","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Et la page de détail mentionne la méthode de livraison \"Ground\"","stepMatchArguments":[{"group":{"start":52,"value":"\"Ground\"","children":[{"start":53,"value":"Ground","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":34,"pickleLine":29,"tags":["@mode:serial"],"steps":[{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'accueil","isBg":true,"stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Et que je suis connecté avec mail et mot de passe","isBg":true,"stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Et que je suis sur la page du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Et que je supprime tous les articles du panier","isBg":true,"stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Etant donné que j'ai passé une commande avec le code de réduction \"PercentageTotal\"","stepMatchArguments":[{"group":{"start":50,"value":"\"PercentageTotal\"","children":[{"start":51,"value":"PercentageTotal","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Et que je sauvegarde la référence de cette commande","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"Et que je navigue vers l'historique de mes commandes","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"Quand j'ouvre le détail de la commande sauvegardée","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Alors la page de détail mentionne la réduction appliquée","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Et le montant total de la commande est inférieur au sous-total des articles","stepMatchArguments":[]}]},
]; // bdd-data-end