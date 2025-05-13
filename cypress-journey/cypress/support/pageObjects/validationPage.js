class validationPage {
    elements = {
      clickOnCart: () => cy.get("#nav-cart-count-container"),
      cartCount: () => cy.get("#nav-cart-count"),
      validatecartproduct1: () => cy.get("span[class='a-truncate-cut']"),
      validatecartproduct2: () =>
        cy.get(
          ".sc-product-image[src='https://m.media-amazon.com/images/I/71P85R392uL._AC_AA180_.jpg']"
        ),
      checkout: () => cy.get("input[value='Proceed to checkout']"),
      deliveryAddressText: () => cy.get("#deliver-to-address-text"),
      totalAmount: () =>
        cy.get(
          "td.a-color-base.a-size-medium.a-text-right.grand-total-price.aok-nowrap.a-text-bold.a-nowrap"
        ),
      removeItem: () =>
        cy.get(
          "button[aria-label='Delete Samsung Original 45W Type-C Travel Adaptor with Cable, Black'] span[class='a-icon a-icon-small-trash']"
        ),
      verifytotalItem: () => cy.get("#sc-subtotal-label-activecart"),
      clickOnSaveforlater: () =>
        cy
          .get(
            "div[class='a-row sc-action-links'] span[class='a-size-small sc-action-save-for-later'] span[class='a-declarative']"
          )
          .contains("Save for later"),
    };
  
    gotoCart() {
      this.elements.clickOnCart().click();
    }
  
    getInitialCartCount() {
      return this.elements
        .cartCount()
        .invoke("text")
        .then((text) => parseInt(text));
    }
  
    confirmCartCountIncreased(initialCount) {
      cy.wait(2000);
  
      this.elements
        .cartCount({ timeout: 10000 })
        .invoke("text")
        .then((updatedText) => {
          const updatedCount = parseInt(updatedText);
          expect(updatedCount).to.be.greaterThan(initialCount);
        });
    }
  
    verifyCartProduct() {
      this.elements
        .validatecartproduct1()
        .should("include.text", "Samsung Original 45W Type-C Travel");
    }
    verifyCartProduct2() {
      this.elements.validatecartproduct2().should("be.visible");
    }
    clickonCheckout() {
      this.elements.checkout().click();
    }
  
    verifyAddress(expectedAddress) {
      this.elements.deliveryAddressText().should("contain.text", expectedAddress);
    }
  
    removeItemFromCart() {
      this.elements.clickOnCart().click();
      this.elements.removeItem().click();
    }
  
    saveForLater() {
      this.elements.clickOnSaveforlater().click();
    }
  }
  export default validationPage;