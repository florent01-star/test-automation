import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// Génère les specs Playwright à partir des .feature + steps, et renvoie leur dossier
const testDir = defineBddConfig({
  features: 'tests/webshop/e2e/*.feature',
  steps: 'tests/webshop/steps/*.ts',
  language: 'fr',
});

export default defineConfig({
  testDir,                                  // remplace './tests'
  timeout: 120_000,                         // 2 min max par scénario (défaut : 30 s)
  expect: {
    timeout: 10_000,                        // attente max d'un expect (défaut : 5 s)
  },
  fullyParallel: true, 
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    trace: 'on-first-retry',
    actionTimeout: 15_000,                  // click, fill... (évite d'attendre 2 min sur un sélecteur cassé)
    navigationTimeout: 30_000,              // goto / chargement de page
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
 //   { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
 //   { name: 'webkit',  use: { ...devices['Desktop Safari'] } },
  ],
});