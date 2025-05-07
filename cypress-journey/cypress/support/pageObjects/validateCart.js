
class CartPage {
    elements = {
      cartCount: () => cy.get('#nav-cart-count'),
      noCoverageButton: () => cy.get('input[aria-labelledby="attachSiNoCoverage-announce"]'),
      proceedToCheckoutButton: () => cy.get('input[name="proceedToRetailCheckout"]'),
      deliveryAddressText: () => cy.get('#deliver-to-address-text'),
      totalAmountText: () => cy.get('td.a-color-base.a-size-medium.a-text-right.grand-total-price.aok-nowrap.a-text-bold.a-nowrap'),
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
  }
  
  export default CartPage;
  