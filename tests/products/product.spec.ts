import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

test.describe('QA Shield - Product Tests', () => {

  test('TC005 - Products page loads successfully', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate();
    await expect(page).toHaveURL(/products/);
    await expect(page).toHaveTitle(/Automation Exercise/);
    console.log('✅ TC005 Passed - Products page loaded');
  });

  test('TC006 - All products are visible', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate();
    const count = await productPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    console.log(`✅ TC006 Passed - ${count} products visible`);
  });

  test('TC007 - Search for a product', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate();
    await productPage.searchProduct('dress');
    await expect(page).toHaveURL(/search/);
    const count = await productPage.getProductCount();
    expect(count).toBeGreaterThan(0);
    console.log('✅ TC007 Passed - Search results found');
  });

  test('TC008 - Search for invalid product shows no results', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.navigate();
    await productPage.searchProduct('xyzabc123notexist');
    const count = await productPage.getProductCount();
    expect(count).toBe(0);
    console.log('✅ TC008 Passed - No results for invalid search');
  });

});