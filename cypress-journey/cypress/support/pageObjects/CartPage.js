import { timeout } from "async";

class CartPage {
  // visit() {
  //   cy.visit('/cart');
  goToCart() {
    cy.get("#add-to-cart-button", { timeout: 10000}).should('be.visible').click()

  }
  // updateQuantity(productName, quantity) {
  //   cy.contains('.cart-item', productName).find('input.quantity').clear() .type(quantity);
  updateQuantity(quantity) {
    cy.get("select.quqntiry").select(quantity.toString());
  }
  

  // removeItem(productName) {
  //   cy.contains('.cart-item', productName)
  //     .find('[class="a-icon a-icon-small-remove"].remove()')
  //     .click();
removeItem() {
  cy.get(".remove-item").click()
}

saveForLater() {
  cy.contains("Save for later").click();
}

  // verifyTotalAmount(expectedAmount) {
  //   cy.get('[class="a-color-base a-size-medium a-text-right grand-total-price aok-nowrap a-text-bold a-nowrap"]').should('contain', expectedAmount);
  // }
}

const cartPage = new CartPage();

export default cartPage