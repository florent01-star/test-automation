import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import 'dotenv/config';

// Génère les specs Playwright à partir des .feature + steps, et renvoie leur dossier
const testDir = defineBddConfig({
  features: 'tests/webshop/e2e/*.feature',
  steps: 'tests/webshop/steps/*.ts',
  language: 'fr',
});

export default defineConfig({
  testDir, // remplace './tests'
  timeout: 120_000, // 2 min max par scénario (défaut : 30 s)
  expect: {
    timeout: 10_000, // attente max d'un expect (défaut : 5 s)
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // échoue en CI si un test.only / @only traîne
  retries: process.env.CI ? 2 : 0, // relance les tests instables en CI
  workers: process.env.CI ? 1 : undefined, // CI : un scénario à la fois → pas de conflit sur la page commune
  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['github']] // CI : rapport HTML + erreurs affichées dans Actions / PR
    : 'html',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry', // trace consultable dans le rapport lors d'une relance
    screenshot: 'only-on-failure', // capture jointe au rapport en cas d'échec
    actionTimeout: 15_000, // click, fill... (évite d'attendre 2 min sur un sélecteur cassé)
    navigationTimeout: 30_000, // goto / chargement de page
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    //   { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    //   { name: 'webkit',  use: { ...devices['Desktop Safari'] } },
  ],
});