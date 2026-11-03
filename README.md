# Tests E2E — Webshop (Playwright + BDD)

Suite de tests end-to-end d’un webshop, écrite en TypeScript avec Playwright et `playwright-bdd`. Les scénarios sont décrits en français avec Gherkin, puis transformés en tests Playwright.

**Site testé :** [Tricentis Demo Web Shop](https://demowebshop.tricentis.com/)

## Ce que montre ce projet

- La rédaction de scénarios BDD en français et leur exécution avec Playwright.
- L’organisation du code en fichiers `.feature`, steps TypeScript et Page Object Models (POM).
- Des tests data-driven avec `Plan du scénario` et `Exemples`, notamment pour la configuration d’un ordinateur et le panier.
- La couverture de parcours de boutique : inscription, panier, commande, paiement et consultation des détails d’une commande.
- Des contrôles de qualité TypeScript et ESLint, ainsi qu’une exécution automatisée dans GitHub Actions.

## Stack

| Outil | Rôle |
| --- | --- |
| Playwright | Framework de tests E2E et exécution des scénarios dans le navigateur |
| `playwright-bdd` | Conversion des fichiers Gherkin en tests Playwright et liaison aux steps |
| TypeScript | Typage des steps, fixtures, helpers et POM |
| ESLint | Analyse statique du code |
| Prettier | Mise en forme du code |
| GitHub Actions | Intégration continue sur les push et pull requests ciblant `main` ou `master` |

## Structure du projet

```text
.
├── .features-gen/
│   └── tests/webshop/e2e/       # Tests générés par playwright-bdd ; non versionnés
├── .github/
│   └── workflows/
│       └── playwright.yml       # Workflow CI
├── tests/
│   └── webshop/
│       ├── e2e/                 # Scénarios Gherkin (.feature)
│       ├── steps/               # Steps, fixtures et helpers TypeScript
│       │   └── helpers/
│       └── pom/                 # Page Object Models
├── playwright-report/           # Rapport Playwright (généré)
├── test-results/                # Résultats et éventuelles traces (générés)
├── .env                         # Configuration locale, non versionnée
├── .env.example                 # Modèle de configuration (valeurs factices)
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── playwright.config.ts
├── settings.json
└── tsconfig.json
```

Les fichiers `.feature` sont les sources des scénarios : le contenu de `.features-gen/` est produit par `playwright-bdd` et ne doit être ni édité ni commité. La suite comporte actuellement les features `configPC`, `order-details`, `order`, `panier`, `payment-method` et `register`. Plusieurs parcours de commande et de paiement sont marqués `@mode:serial`.

## Exemple de scénario

Extrait représentatif de `tests/webshop/e2e/order.feature` :

```gherkin
# language: fr
@mode:serial
Fonctionnalité: Commande
  Scénario: Commander en mode invité
    Etant donné que j'ai 10 article "Blue Jeans" dans mon panier
    Et que je suis sur la page du panier
    Et que je sauvegarde le montant total du panier
    Quand je coche l'acceptation des conditions générales
    Et je clique sur "Checkout"
    Et je choisis de commander en tant qu'invité
    Et je renseigne l'adresse de facturation pour un invité
    Et je choisis la méthode de livraison "Ground"
    Et je choisis le moyen de paiement "Check / Money Order"
    Et je clique sur "Continue"
    Et je clique sur "Confirm"
    Alors le message "Your order has been successfully processed!" est affiché
    Et une référence de commande m'est fournie
    Et le statut de la commande est "Pending"
```

## Prérequis : comptes de test

Les tests s’exécutent sur le [Tricentis Demo Web Shop](https://demowebshop.tricentis.com/), un site de démonstration public. Aucun compte n’est fourni avec le projet : **vous devez créer vos propres comptes de test** avant de lancer la suite.

1. Cliquez sur **Register** et créez **deux comptes** distincts (adresses e-mail fictives, mots de passe de votre choix).
2. **Compte n°1** : connectez-vous, puis allez dans **My account → Addresses** et enregistrez **au moins une adresse**. Les scénarios de commande s’appuient sur cette adresse.
3. **Compte n°2** : aucune adresse n’est requise. S’il en possède déjà une, les tests la suppriment automatiquement.

> Ces comptes ne servent qu’aux tests. N’utilisez ni vraie adresse e-mail, ni mot de passe réel, ni données personnelles : le site est public et partagé.

## Installation

Prérequis : Node.js et npm.

```bash
git clone https://github.com/florent01-star/test-automation.git
cd test-automation
npm ci
npx playwright install --with-deps chromium
```

`npm ci` installe les dépendances verrouillées dans `package-lock.json`.

## Configuration de l’environnement

Deux options, selon que vous lancez les tests en local ou via GitHub Actions.

### Option 1 : en local (fichier `.env`)

Copiez `.env.example` en `.env` à la racine, puis renseignez les identifiants des deux comptes créés plus haut.

| Variable | Utilisation |
| --- | --- |
| `BASE_URL` | URL de base du webshop testé : `https://demowebshop.tricentis.com/` |
| `USER_EMAIL` | Adresse du compte n°1 (avec adresse enregistrée) |
| `USER_PASSWORD` | Mot de passe du compte n°1 |
| `USER2_EMAIL` | Adresse du compte n°2 |
| `USER2_PASSWORD` | Mot de passe du compte n°2 |

Le fichier `.env` n’est pas versionné : il reste sur votre machine.

### Option 2 : sur GitHub Actions (secrets)

Le workflow est déjà inclus. Il suffit de créer les secrets sur votre copie du dépôt (voir la section [Intégration continue](#intégration-continue-github-actions)).

## Exécution des tests

Les commandes se lancent depuis la racine du projet. Pour générer les tests BDD puis exécuter la suite :

```bash
npx bddgen
npx playwright test
```

Le script npm correspondant est `npm test`. `playwright-bdd` génère également les tests au lancement de Playwright ; appeler `bddgen` séparément rend simplement l’étape visible.

```bash
# Exécution headless de toute la suite
npm test

# Générer les tests avec les détails de génération
npx bddgen --verbose

# Interface visuelle Playwright
npm run test:ui

# Exécution avec navigateur visible
npm run test:headed

# Lancer une feature précise
npx bddgen && npx playwright test tests/webshop/e2e/panier.feature

# Afficher le rapport HTML après une exécution
npm run report
```

Les specs générées ne sont pas des cibles à modifier : ciblez les fichiers `.feature` d’origine ou lancez toute la suite. Sous Windows/PowerShell, si la politique d’exécution bloque les scripts npm, utilisez `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` pour la session en cours.

### Scripts npm disponibles

| Script | Commande / effet |
| --- | --- |
| `test` | `bddgen && playwright test` |
| `test:ui` | `bddgen && playwright test --ui` |
| `test:headed` | `bddgen && playwright test --headed` |
| `report` | `playwright show-report` |
| `lint` | `eslint .` |
| `lint:fix` | `eslint . --fix` |
| `typecheck` | `tsc --noEmit` |
| `format` | `prettier --write .` (formate les fichiers) |

## Qualité

```bash
npm run lint
npm run typecheck
```

Pour appliquer le formatage Prettier :

```bash
npm run format
```

`format` écrit les changements dans les fichiers. Pour vérifier le format sans les modifier, lancez `npx prettier --check .` (il n’existe pas de script npm `format:check`).

## Intégration continue (GitHub Actions)

Le workflow `.github/workflows/playwright.yml` s’exécute sur un `push` ou une pull request ciblant `main` ou `master`, ainsi que sur déclenchement manuel via `workflow_dispatch`.

| Paramètre | Configuration |
| --- | --- |
| Runner | `ubuntu-latest` |
| Limite de durée | 60 minutes |
| Variable d’environnement | `CI=true` |
| Secrets requis | `BASE_URL`, `USER_EMAIL`, `USER_PASSWORD`, `USER2_EMAIL`, `USER2_PASSWORD` |

Étapes du workflow :

| Ordre | Étape |
| --- | --- |
| 1 | Récupération du dépôt avec `actions/checkout@v4` |
| 2 | Configuration de Node.js via `actions/setup-node@v4`, `lts/*` et cache npm |
| 3 | Installation reproductible des dépendances avec `npm ci` |
| 4 | Installation de Chromium et de ses dépendances système avec `npx playwright install --with-deps chromium` |
| 5 | Contrôles de qualité : `npm run lint` puis `npm run typecheck` |
| 6 | Génération BDD et exécution : `npx bddgen && npx playwright test` |
| 7 | Publication du rapport Playwright en artefact (conservé 30 jours), y compris en cas d’échec des tests |

### Exécuter la CI sur votre propre copie

Le fichier `playwright.yml` est déjà inclus : il suffit de **renseigner les secrets**. Ils ne sont pas copiés avec le code, vous devez les créer vous-même :

1. Créez vos deux comptes de test (voir *Prérequis : comptes de test*).
2. Dans votre dépôt (fork ou clone poussé sur votre compte), ouvrez **Settings → Secrets and variables → Actions → New repository secret**.
3. Créez les 5 secrets : `BASE_URL`, `USER_EMAIL`, `USER_PASSWORD`, `USER2_EMAIL`, `USER2_PASSWORD`, avec les valeurs de **vos** comptes.
4. Lancez le workflow depuis l’onglet **Actions** (**Run workflow**), ou faites un `push` sur `main`.

> Si vous préférez ne pas utiliser GitHub Actions, le fichier `.env` suffit pour lancer les tests en local.

### Rapport et tests instables

À la fin de chaque exécution, le rapport HTML est téléversé en artefact `playwright-report` : ouvrez l’exécution dans l’onglet **Actions**, puis téléchargez-le depuis la section **Artifacts**. Décompressez-le et ouvrez `index.html`, ou lancez `npx playwright show-report <dossier>`.

Certains tests peuvent être instables (« flaky ») sur les runners GitHub, car ils dépendent d’un site public partagé et de la performance de la machine. En cas d’échec intermittent, consultez le rapport et relancez le workflow.
