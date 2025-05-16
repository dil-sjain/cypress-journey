class addToCartPage {
    webLocators = {

      addToCartButton: () => cy.get('#a-autoid-1-announce'),
      addToCartButtonOnProductPage: () => cy.get('input[name="submit.add-to-cart"]').eq(1),
      cartCount: () => cy.get('span#nav-cart-count'),
      goToCartButton: () => cy.get('span#nav-cart-count'),
      shoppingCartTitle: () => cy.get('#sc-active-items-header'),
      proceedToPay: () => cy.get('input[name=proceedToRetailCheckout]'),
      paymentPage: () => cy.get('cy.loginInToApplication(username, password);'),
      cartIcon: () => cy.get('a#nav-cart'),
      deleteCartItem: () => cy.get('input[value="Delete"]'),
      quantityButton: () => cy.get('div[name="sc-quantity"]'),
      
     
    };
     addToCartButton() {

         this.webLocators.addToCartButton().click();
        this.webLocators.quantityButton().should('be.visible', {timeout:30000});
    };
    addToCartOnProductPage() {
        this.webLocators.addToCartButtonOnProductPage().click();
    }
    getcartCount() {
        cy.reload();
        return this.webLocators.cartCount({timeout:10000}).invoke('text').then((text) => {
            const count = parseInt(text, 10); // Convert the text to an integer
            return count;
        });
    };
    goToCartButton() {
        this.webLocators.goToCartButton().click();
    };
    shoppingCartTitle() {
        return this.webLocators.shoppingCartTitle();
    };
    proceedToPay() {
        this.webLocators.proceedToPay().click();
    };
    continueBtn() {
        this.webLocators.continueBtn().click();

    };
    removeCartItem() {
        this.webLocators.cartIcon().click({force: true});
        this.webLocators.deleteCartItem().should('be.visible');
        this.webLocators.deleteCartItem().first().click();

    }
    makecartEmpty() {
        this.getcartCount().then(cartCount => {
          if (cartCount>0) {
            cy.log('Cart is not empty. Proceeding to remove items.');
            this.webLocators.cartIcon().click({force: true});
            this.webLocators.deleteCartItem().should('be.visible');
            this.webLocators.deleteCartItem().first().click();
          }
          else {
            cy.log('Cart is already empty.');
          }

        });
    }
    
    paymentPage() {
        this.webLocators.paymentPage().click();
    };
}

export default new addToCartPage();
