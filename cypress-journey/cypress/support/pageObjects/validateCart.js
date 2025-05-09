
class CartPage {
  elements = {
    cartCount: () => cy.get('#nav-cart-count'),
    noCoverageButton: () => cy.get('input[aria-labelledby="attachSiNoCoverage-announce"]'),
    proceedToCheckoutButton: () => cy.get('input[name="proceedToRetailCheckout"]'),
    deliveryAddressText: () => cy.get('#deliver-to-address-text'),
    totalAmountText: () => cy.get('td.a-color-base.a-size-medium.a-text-right.grand-total-price.aok-nowrap.a-text-bold.a-nowrap'),
    clickOnCart: () => cy.get("#nav-cart-count-container"),
    removeItem: () => cy.get('[aria-label="Delete Sony PlayStation5 Gaming Console (Slim)"] > .a-icon'),
    saveforlater: () => cy.get('[aria-label="Delete Casio Vintage A-158WA-1Q Digital Grey Dial Unisex Watch Silver Metal Strap (D011)"] > .a-icon'),
  };

  getInitialCartCount() {
    return this.elements.cartCount().invoke('text').then((text) => parseInt(text));
  }

  confirmCartCountIncreased(initialCount) {
    cy.wait(2000);

    this.elements.cartCount({ timeout: 10000 })
      .invoke('text')
      .then((updatedText) => {
        const updatedCount = parseInt(updatedText);
        expect(updatedCount).to.be.greaterThan(initialCount);
      });
  }

  confirmNoCoverage() {
    this.elements.noCoverageButton().should('be.visible').click();
  }

  proceedToCheckout() {

    this.elements.proceedToCheckoutButton().click();
  }

  verifyAddress(expectedAddress) {
    this.elements.deliveryAddressText().should('contain.text', expectedAddress);
  }

  verifyTotalAmount(expectedAmount) {
    this.elements.totalAmountText().should('contain.text', expectedAmount);
  }
  removeItemFromCart() {
    this.elements.clickOnCart().click();
    this.elements.removeItem().click();

  }
  
  saveForLater() {
    this.elements.saveforlater().click();
  }
}

export default CartPage;
