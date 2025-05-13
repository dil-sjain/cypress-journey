import { addCartPageLocators } from "../locators/addToCartPageLocator";

class addCartPage {
  constructor() {
    this.webLocators = addCartPageLocators;
  }
  AddToCart() {
    return this.webLocators.addToCart();
  }
  CartCount() {
    return this.webLocators.cartCount();
  }
  CartCountnew() {
    return this.webLocators
      .cartCount()
      .invoke("text")
      .then((text) => parseInt(text));
  }
  validateAddress() {
    return this.webLocators.address().should("be.visible", { timeout: 10000 });
  }
}

export default new addCartPage();
