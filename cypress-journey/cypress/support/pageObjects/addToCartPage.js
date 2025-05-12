class addCartPage {
  webLocators = {
    //formControl: () => cy.get('.form-control'),
    addToCart: () => cy.get("#nav-cart"),
    cartCount: () => cy.get("#nav-cart-count"),
    address: () => cy.get("#checkout-deliveryAddressPanel"),
  };

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
    return this.webLocators.address().should("be.visible");
  }
}

export default new addCartPage();
