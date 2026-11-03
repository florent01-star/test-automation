import { USER } from './helpers/env';
import { expect, Given, When, Then } from './fixtures';

const uniqueEmail = (prefix = 'florent.test') =>
  `${prefix}+${Date.now()}${Math.floor(Math.random() * 1000)}@example.com`;

// Données valides par défaut ; chaque step surcharge uniquement ce qui l'intéresse
const base = { firstName: 'Flo', lastName: 'Test', password: 'passpass' };

Given("que je suis sur la page d'inscription", async ({ accueilPage, registerPage, topBar }) => {
  await accueilPage.goto();
  await topBar.goToRegister();
  await expect(registerPage.registerButton).toBeVisible();
});

When(
  "je m'inscris en tant que {string} avec le prénom {string}, le nom {string} et le mot de passe {string}",
  async ({ registerPage, state }, genre: string, prenom: string, nom: string, mdp: string) => {
    const email = uniqueEmail();
    state.lastEmail = email;
    if (genre === 'Female') await registerPage.genderFemale.check();
    else await registerPage.genderMale.check();
    await registerPage.firstName.fill(prenom);
    await registerPage.lastName.fill(nom);
    await registerPage.email.fill(email);
    await registerPage.password.fill(mdp);
    await registerPage.confirmPassword.fill(mdp);
    await registerPage.submit();
  },
);

// ---------- Register ----------
Then('je suis connecté avec le compte créé', async ({ page }) => {
  await expect(page.locator('.header-links .ico-logout')).toBeVisible();
});

When("je m'inscris avec l'email {string}", async ({ topBar, registerPage }, email: string) => {
  await topBar.goToRegister();
  await registerPage.fillForm({ ...base, email });
  await registerPage.submit();
});

When("je m'inscris avec l'email de base", async ({ topBar, registerPage }) => {
  await topBar.goToRegister();
  await registerPage.fillForm({ ...base, email : USER.email });
  await registerPage.submit();
});

When("je m'inscris sans renseigner le champ {string}", async ({ registerPage }, champ: string) => {
  await registerPage.fillForm({ ...base, email: uniqueEmail() });
  const field = {
    'Last Name': registerPage.lastName,
    'First Name': registerPage.firstName,
    Email: registerPage.email,
  }[champ];
  if (!field) throw new Error(`Champ inconnu : ${champ}`);
  await field.fill('');
  await registerPage.submit();
});

When(
  "je m'inscris avec le mot de passe {string} et la confirmation {string}",
  async ({ registerPage }, mdp: string, confirmation: string) => {
    await registerPage.fillForm({ ...base, email: uniqueEmail(), password: mdp });
    await registerPage.confirmPassword.fill(confirmation);
    await registerPage.submit();
  },
);

When("je m'inscris avec le mot de passe {string}", async ({ registerPage }, mdp: string) => {
  await registerPage.fillForm({ ...base, email: uniqueEmail(), password: mdp });
  await registerPage.submit();
});

Then('je suis connecté en tant que {string}', async ({ topBar, state }) => {
  // Après inscription, le header affiche l'email du compte créé
  await expect(topBar.logoutLink).toBeVisible();
  await expect(topBar.accountLink).toHaveText(state.lastEmail ?? /./);
});

Given("un compte existe", async ({ page }) => {
  // Si besoin de le créer pour un autre email :
  await page.goto('/register');
  await page.locator('#gender-male').check();
  await page.locator('#FirstName').fill('Flo');
  await page.locator('#LastName').fill('Novembre');
  await page.locator('#Email').fill(USER.email);
  await page.locator('#Password').fill(USER.password);
  await page.locator('#ConfirmPassword').fill(USER.password);
  await page.locator('#register-button').click();
  // Si l'email existe déjà, le site affiche une erreur : c'est le résultat attendu
  await page.goto('/logout').catch(() => {});
});
