import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const users = {
  validUser: {
    email: 'qashield@test.com',
    password: 'Test@1234'
  },
  invalidUser: {
    email: 'wrong@wrong.com',
    password: 'wrongpass'
  },
  emptyUser: {
    email: '',
    password: ''
  }
};

test.describe('QA Shield - Authentication Tests', () => {

  test('TC001 - Login page loads successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(page).toHaveURL(/login/);
    await expect(page).toHaveTitle(/Automation Exercise/);
    console.log('✅ TC001 Passed');
  });

  test('TC002 - Login with invalid credentials shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.invalidUser.email, users.invalidUser.password);
    const isError = await loginPage.isErrorVisible();
    expect(isError).toBeTruthy();
    console.log('✅ TC002 Passed');
  });

  // test('TC003 - Login with empty credentials shows error', async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   await loginPage.navigate();
  //   await loginPage.login(users.emptyUser.email, users.emptyUser.password);
  //   const isError = await loginPage.isErrorVisible();
  //   expect(isError).toBeTruthy();
  //   console.log('✅ TC003 Passed');
  // });
  test('TC003 - Login with empty credentials shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  
  // Check browser validation on empty email field
  await loginPage.loginButton.click();
  
  const isEmailRequired = await loginPage.emailInput.evaluate(
    (el: HTMLInputElement) => !el.validity.valid
  );
  expect(isEmailRequired).toBeTruthy();
  console.log('✅ TC003 Passed - Empty credentials validation works');
});

  test('TC004 - Password field is masked', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    console.log('✅ TC004 Passed');
  });

});