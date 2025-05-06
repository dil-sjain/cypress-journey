class CartPage {
  addOfferings() {
    cy.get("#mbb-offeringID-1").click();
  }
  addToCart() {
    cy.get("#add-to-cart-button").click({force: true});
  }
}
export default CartPage;
