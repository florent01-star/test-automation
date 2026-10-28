import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly genderMale: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;
  readonly genderFemale: Locator;

  constructor(page: Page) {
    this.page = page;
    this.genderMale = page.locator('#gender-male');
    this.genderFemale = page.locator('#gender-female');
    this.firstName = page.locator('#FirstName');
    this.lastName = page.locator('#LastName');
    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.confirmPassword = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.successMessage = page.locator('.result');
  }

  async fillForm(data: {
    gender?: 'Male' | 'Female';
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    if (data.gender === 'Female') await this.genderFemale.check();
    else await this.genderMale.check();
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.password.fill(data.password);
    await this.confirmPassword.fill(data.password);
  }

  async submit() {
    await this.registerButton.click();
  }
}
