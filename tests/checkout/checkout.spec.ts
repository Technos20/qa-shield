// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../../pages/LoginPage';
// import { ProductPage } from '../../pages/ProductPage';
// import { CartPage } from '../../pages/CartPage';

// test.describe('QA Shield - Checkout Tests', () => {

//   test('TC013 - Checkout requires login', async ({ page }) => {
//     const productPage = new ProductPage(page);
//     await productPage.navigate();
//     await productPage.addFirstProductToCart();
//     await page.locator('.modal-footer .btn').click();
//     await page.goto('https://automationexercise.com/view_cart');
//     const cartPage = new CartPage(page);
//     await cartPage.proceedToCheckoutPage();
//     await expect(page).toHaveURL(/login/);
//     console.log('✅ TC013 Passed - Checkout redirects to login');
//   });

//   test('TC014 - Logged in user can proceed to checkout', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.navigate();
//     await loginPage.login('qashield@test.com', 'Test@1234');
//     const productPage = new ProductPage(page);
//     await productPage.navigate();
//     await productPage.addFirstProductToCart();
//     await page.locator('.modal-footer .btn').click();
//     await page.goto('https://automationexercise.com/view_cart');
//     const cartPage = new CartPage(page);
//     await cartPage.proceedToCheckoutPage();
//     await expect(page).toHaveURL(/checkout/);
//     console.log('✅ TC014 Passed - Checkout page loaded');
//   });

//   test('TC015 - Checkout page shows order summary', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.navigate();
//     await loginPage.login('qashield@test.com', 'Test@1234');
//     const productPage = new ProductPage(page);
//     await productPage.navigate();
//     await productPage.addFirstProductToCart();
//     await page.locator('.modal-footer .btn').click();
//     await page.goto('https://automationexercise.com/view_cart');
//     const cartPage = new CartPage(page);
//     await cartPage.proceedToCheckoutPage();
//     await expect(page.locator('#cart_items')).toBeVisible();
//     console.log('✅ TC015 Passed - Order summary visible');
//   });

//   test('TC016 - Place order successfully', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.navigate();
//     await loginPage.login('qashield@test.com', 'Test@1234');
//     const productPage = new ProductPage(page);
//     await productPage.navigate();
//     await productPage.addFirstProductToCart();
//     await page.locator('.modal-footer .btn').click();
//     await page.goto('https://automationexercise.com/view_cart');
//     const cartPage = new CartPage(page);
//     await cartPage.proceedToCheckoutPage();
//     await page.locator('#place-order').click();
//     await page.locator('input[name="name-on-card"]').fill('QA Shield');
//     await page.locator('input[name="card-number"]').fill('4111111111111111');
//     await page.locator('input[name="cvc"]').fill('123');
//     await page.locator('input[name="expiry-month"]').fill('12');
//     await page.locator('input[name="expiry-year"]').fill('2027');
//     await page.locator('#submit').click();
//     await expect(page.locator('.title')).toContainText('Congratulations');
//     console.log('✅ TC016 Passed - Order placed successfully');
//   });

// });
import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com/api';

test.describe('QA Shield - API & Checkout Tests', () => {

  test('TC013 - API: Get all products list', async () => {
    const context = await request.newContext();
    const response = await context.get(`${BASE_URL}/productsList`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
    console.log(`✅ TC013 Passed - ${body.products.length} products returned`);
  });

  test('TC014 - API: Get all brands list', async () => {
    const context = await request.newContext();
    const response = await context.get(`${BASE_URL}/brandsList`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);
    console.log(`✅ TC014 Passed - ${body.brands.length} brands returned`);
  });

  test('TC015 - API: Verify login with valid credentials', async () => {
    const context = await request.newContext();
    const response = await context.post(`${BASE_URL}/verifyLogin`, {
      form: {
        email: 'qashield@test.com',
        password: 'Test@1234'
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    console.log('✅ TC015 Passed - Valid login verified via API');
  });

  test('TC016 - API: Verify login with invalid credentials', async () => {
    const context = await request.newContext();
    const response = await context.post(`${BASE_URL}/verifyLogin`, {
      form: {
        email: 'wrong@wrong.com',
        password: 'wrongpass'
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.responseCode).toBe(404);
    console.log('✅ TC016 Passed - Invalid login rejected via API');
  });

});