class addToCartPage {
    elements = {
        addToCartButton: () => cy.get("#a-autoid-1-announce"),
        addChargerToCart: () => cy.get("#a-autoid-3-announce"),
      };
      addToCart() {
        this.elements.addToCartButton().click();
      }
      addcharger() {
        this.elements.addChargerToCart().click();
      }
    }
    export default addToCartPage;