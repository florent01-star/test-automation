# 🖥️ Tests E2E — Webshop (Playwright + BDD)

Tests end-to-end du webshop avec [Playwright](https://playwright.dev/) et
[playwright-bdd](https://vitalets.github.io/playwright-bdd/), écrits en Gherkin (français).

## 📁 Structure

```
tests/
└── webshop/
    ├── e2e/           # Scénarios Gherkin (.feature)
    ├── steps/         # Définition des steps (TypeScript)
    ├── pom/           # Page Object Models
    └── …              # playwright.config.ts
```

- **`.feature`** — scénarios Gherkin en français (`Fonctionnalité`, `Plan du scénario`, `Exemples`…)
- **`steps/`** — implémentation des steps via `createBdd` de playwright-bdd
- **`pom/`** — un Page Object par page (accueil, login, panier, configuration PC…)
- **`.features-gen/`** — specs générées automatiquement par playwright-bdd (⚠️ ne pas éditer ni committer)

## 🚀 Installation

```bash
npm install
npx playwright install
```

## 💻 Lancer les tests (Windows / PowerShell)

Ma façon de lancer les tests pour le debugging :

```powershell
# Autoriser l'exécution de scripts pour la session en cours
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Générer les specs à partir des .feature (avec détails)
npx bddgen --verbose

# Lancer les tests en mode UI (navigateur intégré, debug visuel)
npx playwright test tests/webshop/e2e --ui
```

> 💡 `--ui` ouvre l'[UI Mode de Playwright](https://playwright.dev/docs/test-ui-mode) :
> on y voit chaque step, les screenshots, la timeline, et on peut relancer
> les tests individuellement — idéal pour le développement.
>
> ℹ️ La génération se fait aussi automatiquement au lancement de Playwright.
> `npx bddgen --verbose` sert à la lancer manuellement / vérifier ce qui est généré.
>
> ℹ️ `Set-ExecutionPolicy` n'est nécessaire qu'une fois par session, si PowerShell
> bloque les scripts npm.

## ▶️ Autres façons de lancer

```bash
# Tous les tests (headless)
npx playwright test

# Avec le navigateur visible
npx playwright test --headed

# Un seul fichier .feature
npx playwright test tests/webshop/e2e/computer.feature

# Avec le rapport HTML
npx playwright test && npx playwright show-report
```

> ⚠️ Les specs du dossier `.features-gen/` sont générées à partir des `.feature` —
> on cible donc toujours les `.feature` (ou tout lancer), jamais le contenu généré.

## 🧪 Scénarios couverts

- **Configuration d'un ordinateur** (data-driven via `Plan du scénario` / `Exemples`) :
  - Prix correct du PC configuré dans le panier (profils _cheap_ / _normal_)
  - Suppléments RAM répercutés dans le sous-total
  - Options software payantes répercutées dans le sous-total
- Authentification (inscription / connexion)
- Gestion du panier (quantités, contenu)

## 🛠️ Stack

| Outil          | Rôle                                           |
| -------------- | ---------------------------------------------- |
| Playwright     | Framework de test E2E                          |
| playwright-bdd | Gherkin (.feature) → specs Playwright          |
| TypeScript     | Typage des steps et POM                        |
| POM            | Abstraction des pages (sélecteurs centralisés) |

## 📌 Conventions

- Scénarios et steps **en français** (`language: 'fr'`)
- Tableaux de données Gherkin : `| Processor | 2.5 GHz ... [+15.00] |`
  - les suppléments `[+X.XX]` sont ignorés dans les vérifications panier
  - `Aucun` pour le software = aucune option cochée
