class addToCartPage {
  webLocators = {
    addToCartButton: () => cy.get("#a-autoid-1-announce"),
    cartCount: () => cy.get("#nav-cart-count"),
    proceedToCheckoutButton: () =>
      cy.get(
        "#ewc-compact-actions-container > div > div.a-row.a-spacing-base.a-spacing-top-small.ewc-go-to-cart.celwidget > span > span > a"
      ),
    proceedToBuy: () => cy.get("#sc-buy-box-ptc-button > span > input"),
    cartItems: () => cy.get(".a-row.sc-list-item.sc-java-remote-feature"),
    deliveryAddressText: () => cy.get("#deliver-to-address-text"),
    totalAmountText: () => cy.get("#sc-subtotal-amount-buybox > span"),
    clickOnCart: () => cy.get("#nav-cart-count-container"),
    saveForLaterButton: () => "span.a-size-small.sc-action-save-for-later > span > input",
    removeFromCartButton: () => "span.a-size-small.sc-action-delete > span > input"
  };

  openAndAddtoCart() {
    this.webLocators.addToCartButton().eq(0).click({ force: true });
  }

  cartPersistAcrossSession(initialCartCount) {
    expect(initialCartCount).to.be.greaterThan(0);
  }

  getInitialCartCount() {
    return this.webLocators
      .cartCount()
      .invoke("text")
      .then((text) => parseInt(text));
  }

  getTotalFromCartItem() {
    let totalCartValue = 0;
    return this.webLocators
      .cartItems()
      .each((item) => {
        cy.wrap(item)
          .invoke("attr", "data-subtotal")
          .then((subtotal) => {
            totalCartValue += JSON.parse(subtotal).subtotal.amount;
          });
      })
      .then(() => Promise.resolve(totalCartValue));
  }

  confirmCartCountIncreased(initialCount) {
    cy.wait(2000);
    this.webLocators
      .cartCount({ timeout: 10000 })
      .invoke("text")
      .then((newCount) => {
        const updatedCount = parseInt(newCount);
        expect(updatedCount).to.be.greaterThan(initialCount);
      });
  }

  clickProceedToBuy() {
    this.webLocators.proceedToBuy().click();
  }

  proceedToCheckout() {
    this.webLocators.proceedToCheckoutButton().click();
  }

  verifyAddress(expectedAddress) {
    this.webLocators
      .deliveryAddressText()
      .should("contain.text", expectedAddress);
  }

  verifyTotalAmount(expectedAmount) {
    this.webLocators
      .totalAmountText()
      .invoke("text")
      .then((totalAmount) => {
        const parsedAmount = parseInt(
          totalAmount.substring(1).replace(/,/g, "")
        );
        expect(parsedAmount).to.equal(expectedAmount);
      });
  }

  removeItemFromCart() {
    this.webLocators.clickOnCart().click();
    this.webLocators
      .cartItems()
      .eq(0)
      .find(this.webLocators.removeFromCartButton())
      .click();
  }

  saveForLater() {
    this.webLocators.clickOnCart().click();
    this.webLocators
      .cartItems()
      .eq(0)
      .find(this.webLocators.saveForLaterButton())
      .eq(0)
      .click();
  }
}
export default new addToCartPage();
