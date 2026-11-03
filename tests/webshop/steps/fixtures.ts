import { test as base } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { AccueilPage } from '../pom/accueil.page';
import { RegisterPage } from '../pom/register.page';
import { LoginPage } from '../pom/login.page';
import { ComputerPage } from '../pom/computer.page';
import { AddressPage } from '../pom/address.page';
import { DesktopsPage } from '../pom/desktop.page';
import { CartPage } from '../pom/cart.page';
import { TopBar } from '../pom/topbar.page';
import { NavBar } from '../pom/navbar.page';
import { ProductDetailsPage } from '../pom/product-details.page';
import { CheckoutPage } from '../pom/checkout.page';
import { CheckoutCompletedPage } from '../pom/checkout-completed.page';
import { OrdersPage } from '../pom/orders.page';
import { OrderDetailsPage } from '../pom/order-details.page';

// Données partagées entre les steps d'un même scénario
export type ScenarioState = {
  savedSubTotal: string;
  savedCartTotal?: number;
  initialSubTotal?: number;
  orderReference?: string;
  lastUnitPrice?: number;
  basePrice?: number;
  lastEmail?: string;
  chosenOptions: { label: string; supplement: number }[];
  deletedArticle?: string;
  lastQuantity?: number;
  priceBeforeOption?: number;
};

type Fixtures = {
  accueilPage: AccueilPage;
  registerPage: RegisterPage;
  loginPage: LoginPage;
  computerPage: ComputerPage;
  desktopsPage: DesktopsPage;
  cartPage: CartPage;
  addressPage: AddressPage;
  topBar: TopBar;
  navBar: NavBar;
  productPage: ProductDetailsPage;
  checkoutPage: CheckoutPage;
  completedPage: CheckoutCompletedPage;
  ordersPage: OrdersPage;
  orderDetailsPage: OrderDetailsPage;
  state: ScenarioState;
};

export const test = base.extend<Fixtures>({
  accueilPage: async ({ page }, use) => use(new AccueilPage(page)),
  registerPage: async ({ page }, use) => use(new RegisterPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  computerPage: async ({ page }, use) => use(new ComputerPage(page)),
  desktopsPage: async ({ page }, use) => use(new DesktopsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  topBar: async ({ page }, use) => use(new TopBar(page)),
  addressPage: async ({ page }, use) => use(new AddressPage(page)),
  navBar: async ({ page }, use) => use(new NavBar(page)),
  productPage: async ({ page }, use) => use(new ProductDetailsPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  completedPage: async ({ page }, use) => use(new CheckoutCompletedPage(page)),
  ordersPage: async ({ page }, use) => use(new OrdersPage(page)),
  orderDetailsPage: async ({ page }, use) => use(new OrderDetailsPage(page)),
  state: async ({}, use) =>
    use({
      chosenOptions: [],
      savedSubTotal: '',
    }),
});

export const { Given, When, Then } = createBdd(test);
export { expect };
