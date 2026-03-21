import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productsList: Locator;
  readonly firstProduct: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productsList = page.locator('.productinfo');
    this.firstProduct = page.locator('.productinfo').first();
    this.addToCartButton = page.locator('.add-to-cart').first();
  }

  // async navigate() {
  //   await this.page.goto('https://automationexercise.com/products');
  // }
  async navigate() {
  await this.page.goto('https://automationexercise.com/products', {
    waitUntil: 'domcontentloaded',
    timeout: 70000
  });
}
  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async getProductCount() {
    return this.productsList.count();
  }

  async addFirstProductToCart() {
    await this.firstProduct.hover();
    await this.addToCartButton.click();
  }
}