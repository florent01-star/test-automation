// Generated from: tests\webshop\e2e\register.feature
import { test } from "../../../../tests/webshop/steps/fixtures.ts";

test.describe('Inscription d\'un utilisateur', () => {

  test.beforeEach('Contexte', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('je suis sur la page d\'inscription', null, { page }); 
  });
  
  test.describe('Inscription avec des informations valides', () => {

    test('Exemples: #1', async ({ When, Then, And, page, registerPage, state }) => { 
      await When('je m\'inscris en tant que \'Male\' avec le prénom \'Flo\', le nom \'Novembre\' et le mot de passe \'password\'', null, { registerPage, state }); 
      await Then('le message \'Your registration completed\' est affiché', null, { page }); 
      await And('je suis connecté avec le compte créé', null, { page }); 
    });

    test('Exemples: #2', async ({ When, Then, And, page, registerPage, state }) => { 
      await When('je m\'inscris en tant que \'Female\' avec le prénom \'Elo\', le nom \'Novembre\' et le mot de passe \'password\'', null, { registerPage, state }); 
      await Then('le message \'Your registration completed\' est affiché', null, { page }); 
      await And('je suis connecté avec le compte créé', null, { page }); 
    });

  });

  test('Inscription avec un email déjà utilisé', async ({ Given, When, Then, page, registerPage, topBar }) => { 
    await Given('un compte existe', null, { page }); 
    await When('je m\'inscris avec l\'email de base', null, { registerPage, topBar }); 
    await Then('le message d\'erreur \'The specified email already exists\' est affiché en rouge', null, { page }); 
  });

  test.describe('Inscription avec un champ obligatoire manquant', () => {

    test('Exemples: #1', async ({ When, Then, page, registerPage }) => { 
      await When('je m\'inscris sans renseigner le champ \'Last Name\'', null, { registerPage }); 
      await Then('le message d\'erreur \'Last name is required.\' est affiché en rouge', null, { page }); 
    });

    test('Exemples: #2', async ({ When, Then, page, registerPage }) => { 
      await When('je m\'inscris sans renseigner le champ \'First Name\'', null, { registerPage }); 
      await Then('le message d\'erreur \'First name is required.\' est affiché en rouge', null, { page }); 
    });

    test('Exemples: #3', async ({ When, Then, page, registerPage }) => { 
      await When('je m\'inscris sans renseigner le champ \'Email\'', null, { registerPage }); 
      await Then('le message d\'erreur \'Email is required.\' est affiché en rouge', null, { page }); 
    });

  });

  test('Inscription avec des mots de passe différents', async ({ When, Then, page, registerPage }) => { 
    await When('je m\'inscris avec le mot de passe \'password\' et la confirmation \'password1\'', null, { registerPage }); 
    await Then('le message d\'erreur \'The password and confirmation password do not match.\' est affiché en rouge', null, { page }); 
  });

  test.describe('Inscription avec un mot de passe trop court', () => {

    test('Exemples: #1', async ({ When, Then, page, registerPage }) => { 
      await When('je m\'inscris avec le mot de passe \'pass\'', null, { registerPage }); 
      await Then('le message d\'erreur \'The password should have at least 6 characters.\' est affiché en rouge', null, { page }); 
    });

    test('Exemples: #2', async ({ When, Then, page, registerPage }) => { 
      await When('je m\'inscris avec le mot de passe \'a\'', null, { registerPage }); 
      await Then('le message d\'erreur \'The password should have at least 6 characters.\' est affiché en rouge', null, { page }); 
    });

  });

  test('Inscription avec un email invalide', async ({ When, Then, page, registerPage, topBar }) => { 
    await When('je m\'inscris avec l\'email \'test\'', null, { registerPage, topBar }); 
    await Then('le message d\'erreur \'Wrong email\' est affiché en rouge', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\webshop\\e2e\\register.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'inscription","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"Quand je m'inscris en tant que 'Male' avec le prénom 'Flo', le nom 'Novembre' et le mot de passe 'password'","stepMatchArguments":[{"group":{"start":25,"value":"'Male'","children":[{"children":[{}]},{"start":26,"value":"Male","children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":47,"value":"'Flo'","children":[{"children":[{}]},{"start":48,"value":"Flo","children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":61,"value":"'Novembre'","children":[{"children":[{}]},{"start":62,"value":"Novembre","children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":91,"value":"'password'","children":[{"children":[{}]},{"start":92,"value":"password","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Alors le message 'Your registration completed' est affiché","stepMatchArguments":[{"group":{"start":11,"value":"'Your registration completed'","children":[{"children":[{}]},{"start":12,"value":"Your registration completed","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Et je suis connecté avec le compte créé","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":15,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'inscription","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"Quand je m'inscris en tant que 'Female' avec le prénom 'Elo', le nom 'Novembre' et le mot de passe 'password'","stepMatchArguments":[{"group":{"start":25,"value":"'Female'","children":[{"children":[{}]},{"start":26,"value":"Female","children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":49,"value":"'Elo'","children":[{"children":[{}]},{"start":50,"value":"Elo","children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":63,"value":"'Novembre'","children":[{"children":[{}]},{"start":64,"value":"Novembre","children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":93,"value":"'password'","children":[{"children":[{}]},{"start":94,"value":"password","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Alors le message 'Your registration completed' est affiché","stepMatchArguments":[{"group":{"start":11,"value":"'Your registration completed'","children":[{"children":[{}]},{"start":12,"value":"Your registration completed","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Et je suis connecté avec le compte créé","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'inscription","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Etant donné qu'un compte existe","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"Quand je m'inscris avec l'email de base","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Alors le message d'erreur 'The specified email already exists' est affiché en rouge","stepMatchArguments":[{"group":{"start":21,"value":"The specified email already exists"}}]}]},
  {"pwTestLine":34,"pickleLine":28,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'inscription","isBg":true,"stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"Quand je m'inscris sans renseigner le champ 'Last Name'","stepMatchArguments":[{"group":{"start":38,"value":"'Last Name'","children":[{"children":[{}]},{"start":39,"value":"Last Name","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Alors le message d'erreur 'Last name is required.' est affiché en rouge","stepMatchArguments":[{"group":{"start":21,"value":"Last name is required."}}]}]},
  {"pwTestLine":39,"pickleLine":29,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'inscription","isBg":true,"stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"Quand je m'inscris sans renseigner le champ 'First Name'","stepMatchArguments":[{"group":{"start":38,"value":"'First Name'","children":[{"children":[{}]},{"start":39,"value":"First Name","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":41,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Alors le message d'erreur 'First name is required.' est affiché en rouge","stepMatchArguments":[{"group":{"start":21,"value":"First name is required."}}]}]},
  {"pwTestLine":44,"pickleLine":30,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'inscription","isBg":true,"stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"Quand je m'inscris sans renseigner le champ 'Email'","stepMatchArguments":[{"group":{"start":38,"value":"'Email'","children":[{"children":[{}]},{"start":39,"value":"Email","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Alors le message d'erreur 'Email is required.' est affiché en rouge","stepMatchArguments":[{"group":{"start":21,"value":"Email is required."}}]}]},
  {"pwTestLine":51,"pickleLine":32,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'inscription","isBg":true,"stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"Quand je m'inscris avec le mot de passe 'password' et la confirmation 'password1'","stepMatchArguments":[{"group":{"start":34,"value":"'password'","children":[{"children":[{}]},{"start":35,"value":"password","children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":64,"value":"'password1'","children":[{"children":[{}]},{"start":65,"value":"password1","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Alors le message d'erreur 'The password and confirmation password do not match.' est affiché en rouge","stepMatchArguments":[{"group":{"start":21,"value":"The password and confirmation password do not match."}}]}]},
  {"pwTestLine":58,"pickleLine":42,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'inscription","isBg":true,"stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"Quand je m'inscris avec le mot de passe 'pass'","stepMatchArguments":[{"group":{"start":34,"value":"'pass'","children":[{"children":[{}]},{"start":35,"value":"pass","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":60,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Alors le message d'erreur 'The password should have at least 6 characters.' est affiché en rouge","stepMatchArguments":[{"group":{"start":21,"value":"The password should have at least 6 characters."}}]}]},
  {"pwTestLine":63,"pickleLine":43,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'inscription","isBg":true,"stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"Quand je m'inscris avec le mot de passe 'a'","stepMatchArguments":[{"group":{"start":34,"value":"'a'","children":[{"children":[{}]},{"start":35,"value":"a","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Alors le message d'erreur 'The password should have at least 6 characters.' est affiché en rouge","stepMatchArguments":[{"group":{"start":21,"value":"The password should have at least 6 characters."}}]}]},
  {"pwTestLine":70,"pickleLine":45,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Etant donné que je suis sur la page d'inscription","isBg":true,"stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"Quand je m'inscris avec l'email 'test'","stepMatchArguments":[{"group":{"start":26,"value":"'test'","children":[{"children":[{}]},{"start":27,"value":"test","children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":72,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Alors le message d'erreur 'Wrong email' est affiché en rouge","stepMatchArguments":[{"group":{"start":21,"value":"Wrong email"}}]}]},
]; // bdd-data-end