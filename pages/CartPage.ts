import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartProductNames: Locator;
  readonly removeButton: Locator;
  readonly proceedToCheckout: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_info tbody tr');
    this.cartProductNames = page.locator('.cart_description h4');
    this.removeButton = page.locator('.cart_quantity_delete').first();
    this.proceedToCheckout = page.locator('.btn.btn-default.check_out');
    this.emptyCartMessage = page.locator('#empty_cart');
  }

  // async navigate() {
  //   await this.page.goto('https://automationexercise.com/view_cart');
  // }
  async navigate() {
  await this.page.goto('https://automationexercise.com/view_cart', {
    waitUntil: 'domcontentloaded',
    timeout: 70000
  });
}
  async getCartItemCount() {
    return this.cartItems.count();
  }

  async removeFirstItem() {
    await this.removeButton.click();
  }

  async proceedToCheckoutPage() {
    await this.proceedToCheckout.click();
  }

  async isCartEmpty() {
    return this.emptyCartMessage.isVisible();
  }
}