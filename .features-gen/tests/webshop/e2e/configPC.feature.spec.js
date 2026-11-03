// Generated from: tests\webshop\e2e\configPC.feature
import { test } from "../../../../tests/webshop/steps/fixtures.ts";

test.describe('Configuration d\'un ordinateur classique', () => {

  test.beforeEach('Contexte', async ({ Given, computerPage }, testInfo) => { if (testInfo.error) return;
    await Given('je suis sur la page computer', null, { computerPage }); 
  });
  
  test.describe('Le PC configuré est correct dans le panier', () => {

    test('Exemples: #1', async ({ When, Then, And, cartPage, computerPage, topBar }) => { 
      await When('je configure l\'ordinateur avec:', {"dataTable":{"rows":[{"cells":[{"value":"Processor"},{"value":"2.2 GHz Intel Pentium Dual-Core E2200"}]},{"cells":[{"value":"RAM"},{"value":"2 GB"}]},{"cells":[{"value":"HDD"},{"value":"320 GB"}]},{"cells":[{"value":"OS"},{"value":"Windows 10 [+60.00]"}]},{"cells":[{"value":"Software"},{"value":"Aucun"}]}]}}, { computerPage }); 
      await And('j\'ajoute l\'ordinateur au panier', null, { computerPage }); 
      await And('je consulte le panier', null, { topBar }); 
      await Then('je retrouve les options choisies', {"dataTable":{"rows":[{"cells":[{"value":"Processor"},{"value":"2.2 GHz Intel Pentium Dual-Core E2200"}]},{"cells":[{"value":"RAM"},{"value":"2 GB"}]},{"cells":[{"value":"HDD"},{"value":"320 GB"}]},{"cells":[{"value":"OS"},{"value":"Windows 10 [+60.00]"}]},{"cells":[{"value":"Software"},{"value":"Aucun"}]}]}}, { cartPage }); 
      await And('le panier contient 1 article', null, { topBar }); 
    });

    test('Exemples: #2', async ({ When, Then, And, cartPage, computerPage, topBar }) => { 
      await When('je configure l\'ordinateur avec:', {"dataTable":{"rows":[{"cells":[{"value":"Processor"},{"value":"2.5 GHz Intel Pentium Dual-Core E2200 [+15.00]"}]},{"cells":[{"value":"RAM"},{"value":"8GB [+60.00]"}]},{"cells":[{"value":"HDD"},{"value":"320 GB"}]},{"cells":[{"value":"OS"},{"value":"Ubuntu"}]},{"cells":[{"value":"Software"},{"value":"Acrobat Reader [+10.00]"}]}]}}, { computerPage }); 
      await And('j\'ajoute l\'ordinateur au panier', null, { computerPage }); 
      await And('je consulte le panier', null, { topBar }); 
      await Then('je retrouve les options choisies', {"dataTable":{"rows":[{"cells":[{"value":"Processor"},{"value":"2.5 GHz Intel Pentium Dual-Core E2200 [+15.00]"}]},{"cells":[{"value":"RAM"},{"value":"8GB [+60.00]"}]},{"cells":[{"value":"HDD"},{"value":"320 GB"}]},{"cells":[{"value":"OS"},{"value":"Ubuntu"}]},{"cells":[{"value":"Software"},{"value":"Acrobat Reader [+10.00]"}]}]}}, { cartPage }); 
      await And('le panier contient 1 article', null, { topBar }); 
    });

  });

  test.describe('Les suppléments des options de ram sont corrects dans le panier', () => {

    test('Exemples: #1', async ({ When, Then, And, cartPage, computerPage, topBar }) => { 
      await When('je configure l\'ordinateur avec:', {"dataTable":{"rows":[{"cells":[{"value":"Processor"},{"value":"2.5 GHz Intel Pentium Dual-Core E2200 [+15.00]"}]},{"cells":[{"value":"RAM"},{"value":"2 GB"}]},{"cells":[{"value":"HDD"},{"value":"320 GB"}]},{"cells":[{"value":"OS"},{"value":"Windows 10 [+60.00]"}]},{"cells":[{"value":"Software"},{"value":"Aucun"}]}]}}, { computerPage }); 
      await And('j\'ajoute l\'ordinateur au panier', null, { computerPage }); 
      await And('je consulte le panier', null, { topBar }); 
      await Then('le sous-total du panier est \'1275.00\'', null, { cartPage }); 
    });

    test('Exemples: #2', async ({ When, Then, And, cartPage, computerPage, topBar }) => { 
      await When('je configure l\'ordinateur avec:', {"dataTable":{"rows":[{"cells":[{"value":"Processor"},{"value":"2.5 GHz Intel Pentium Dual-Core E2200 [+15.00]"}]},{"cells":[{"value":"RAM"},{"value":"4GB [+20.00]"}]},{"cells":[{"value":"HDD"},{"value":"320 GB"}]},{"cells":[{"value":"OS"},{"value":"Windows 10 [+60.00]"}]},{"cells":[{"value":"Software"},{"value":"Aucun"}]}]}}, { computerPage }); 
      await And('j\'ajoute l\'ordinateur au panier', null, { computerPage }); 
      await And('je consulte le panier', null, { topBar }); 
      await Then('le sous-total du panier est \'1295.00\'', null, { cartPage }); 
    });

    test('Exemples: #3', async ({ When, Then, And, cartPage, computerPage, topBar }) => { 
      await When('je configure l\'ordinateur avec:', {"dataTable":{"rows":[{"cells":[{"value":"Processor"},{"value":"2.5 GHz Intel Pentium Dual-Core E2200 [+15.00]"}]},{"cells":[{"value":"RAM"},{"value":"8GB [+60.00]"}]},{"cells":[{"value":"HDD"},{"value":"320 GB"}]},{"cells":[{"value":"OS"},{"value":"Windows 10 [+60.00]"}]},{"cells":[{"value":"Software"},{"value":"Aucun"}]}]}}, { computerPage }); 
      await And('j\'ajoute l\'ordinateur au panier', null, { computerPage }); 
      await And('je consulte le panier', null, { topBar }); 
      await Then('le sous-total du panier est \'1335.00\'', null, { cartPage }); 
    });

  });

  test.describe('Une option payante software est reflétée dans le panier', () => {

    test('Exemples: #1', async ({ When, Then, And, cartPage, computerPage, topBar }) => { 
      await When('je configure l\'ordinateur avec:', {"dataTable":{"rows":[{"cells":[{"value":"Processor"},{"value":"2.2 GHz Intel Pentium Dual-Core E2200"}]},{"cells":[{"value":"RAM"},{"value":"4GB [+20.00]"}]},{"cells":[{"value":"HDD"},{"value":"320 GB"}]},{"cells":[{"value":"OS"},{"value":"Windows 10 [+60.00]"}]},{"cells":[{"value":"Software"},{"value":"Aucun"}]}]}}, { computerPage }); 
      await And('j\'ajoute l\'ordinateur au panier', null, { computerPage }); 
      await And('je consulte le panier', null, { topBar }); 
      await Then('le sous-total du panier est \'1280.00\'', null, { cartPage }); 
    });

    test('Exemples: #2', async ({ When, Then, And, cartPage, computerPage, topBar }) => { 
      await When('je configure l\'ordinateur avec:', {"dataTable":{"rows":[{"cells":[{"value":"Processor"},{"value":"2.2 GHz Intel Pentium Dual-Core E2200"}]},{"cells":[{"value":"RAM"},{"value":"4GB [+20.00]"}]},{"cells":[{"value":"HDD"},{"value":"320 GB"}]},{"cells":[{"value":"OS"},{"value":"Windows 10 [+60.00]"}]},{"cells":[{"value":"Software"},{"value":"Acrobat Reader [+10.00]"}]}]}}, { computerPage }); 
      await And('j\'ajoute l\'ordinateur au panier', null, { computerPage }); 
      await And('je consulte le panier', null, { topBar }); 
      await Then('le sous-total du panier est \'1290.00\'', null, { cartPage }); 
    });

    test('Exemples: #3', async ({ When, Then, And, cartPage, computerPage, topBar }) => { 
      await When('je configure l\'ordinateur avec:', {"dataTable":{"rows":[{"cells":[{"value":"Processor"},{"value":"2.2 GHz Intel Pentium Dual-Core E2200"}]},{"cells":[{"value":"RAM"},{"value":"4GB [+20.00]"}]},{"cells":[{"value":"HDD"},{"value":"320 GB"}]},{"cells":[{"value":"OS"},{"value":"Windows 10 [+60.00]"}]},{"cells":[{"value":"Software"},{"value":"Microsoft Office [+50.00]"}]}]}}, { computerPage }); 
      await And('j\'ajoute l\'ordinateur au panier', null, { computerPage }); 
      await And('je consulte le panier', null, { topBar }); 
      await Then('le sous-total du panier est \'1330.00\'', null, { cartPage }); 
    });

    test('Exemples: #4', async ({ When, Then, And, cartPage, computerPage, topBar }) => { 
      await When('je configure l\'ordinateur avec:', {"dataTable":{"rows":[{"cells":[{"value":"Processor"},{"value":"2.2 GHz Intel Pentium Dual-Core E2200"}]},{"cells":[{"value":"RAM"},{"value":"4GB [+20.00]"}]},{"cells":[{"value":"HDD"},{"value":"320 GB"}]},{"cells":[{"value":"OS"},{"value":"Windows 10 [+60.00]"}]},{"cells":[{"value":"Software"},{"value":"Total Commander [+5.00]"}]}]}}, { computerPage }); 
      await And('j\'ajoute l\'ordinateur au panier', null, { computerPage }); 
      await And('je consulte le panier', null, { topBar }); 
      await Then('le sous-total du panier est \'1285.00\'', null, { cartPage }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\webshop\\e2e\\configPC.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":25,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page computer","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"Quand je configure l'ordinateur avec:","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"Et j'ajoute l'ordinateur au panier","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"Et je consulte le panier","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Alors je retrouve les options choisies","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Et le panier contient 1 article","stepMatchArguments":[{"group":{"start":19,"value":"1"},"parameterTypeName":"int"}]}]},
  {"pwTestLine":20,"pickleLine":26,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page computer","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"Quand je configure l'ordinateur avec:","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"Et j'ajoute l'ordinateur au panier","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"Et je consulte le panier","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Alors je retrouve les options choisies","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Et le panier contient 1 article","stepMatchArguments":[{"group":{"start":19,"value":"1"},"parameterTypeName":"int"}]}]},
  {"pwTestLine":32,"pickleLine":41,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page computer","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"Quand je configure l'ordinateur avec:","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"Et j'ajoute l'ordinateur au panier","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"Et je consulte le panier","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Alors le sous-total du panier est '1275.00'","stepMatchArguments":[{"group":{"start":28,"value":"'1275.00'","children":[{"children":[{}]},{"start":29,"value":"1275.00","children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":39,"pickleLine":42,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page computer","isBg":true,"stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"Quand je configure l'ordinateur avec:","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"Et j'ajoute l'ordinateur au panier","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"Et je consulte le panier","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Alors le sous-total du panier est '1295.00'","stepMatchArguments":[{"group":{"start":28,"value":"'1295.00'","children":[{"children":[{}]},{"start":29,"value":"1295.00","children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":46,"pickleLine":43,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page computer","isBg":true,"stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"Quand je configure l'ordinateur avec:","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"Et j'ajoute l'ordinateur au panier","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"Et je consulte le panier","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Alors le sous-total du panier est '1335.00'","stepMatchArguments":[{"group":{"start":28,"value":"'1335.00'","children":[{"children":[{}]},{"start":29,"value":"1335.00","children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":57,"pickleLine":58,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page computer","isBg":true,"stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"Quand je configure l'ordinateur avec:","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"Et j'ajoute l'ordinateur au panier","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"Et je consulte le panier","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Alors le sous-total du panier est '1280.00'","stepMatchArguments":[{"group":{"start":28,"value":"'1280.00'","children":[{"children":[{}]},{"start":29,"value":"1280.00","children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":64,"pickleLine":59,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page computer","isBg":true,"stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"Quand je configure l'ordinateur avec:","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"Et j'ajoute l'ordinateur au panier","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"Et je consulte le panier","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Alors le sous-total du panier est '1290.00'","stepMatchArguments":[{"group":{"start":28,"value":"'1290.00'","children":[{"children":[{}]},{"start":29,"value":"1290.00","children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":71,"pickleLine":60,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page computer","isBg":true,"stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"Quand je configure l'ordinateur avec:","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"Et j'ajoute l'ordinateur au panier","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"Et je consulte le panier","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Alors le sous-total du panier est '1330.00'","stepMatchArguments":[{"group":{"start":28,"value":"'1330.00'","children":[{"children":[{}]},{"start":29,"value":"1330.00","children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":78,"pickleLine":61,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page computer","isBg":true,"stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"Quand je configure l'ordinateur avec:","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"Et j'ajoute l'ordinateur au panier","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"Et je consulte le panier","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Alors le sous-total du panier est '1285.00'","stepMatchArguments":[{"group":{"start":28,"value":"'1285.00'","children":[{"children":[{}]},{"start":29,"value":"1285.00","children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end