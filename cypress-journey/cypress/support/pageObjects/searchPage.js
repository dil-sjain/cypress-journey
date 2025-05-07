class searchPage {
    webLocators = {
      searchInput: () => cy.get('#twotabsearchtextbox'),
      searchButton: () => cy.get('#nav-search-submit-button'),
      addToCartButton: () => cy.get('#a-autoid-1-announce'),
      goToCartButton: () => cy.get('span#nav-cart-count'),
      shoppingCartTitle: () => cy.get('#sc-active-items-header'),
      proceedToPay: () => cy.get('input[name=proceedToRetailCheckout]'),
      paymentPage: () => cy.get('cy.loginInToApplication(username, password);'),
      continueBtn: () => cy.get('[data-testid="secondary-continue-button"]'),
      //formControl: () => cy.get('.form-control'),
    };

    //actions
    searchProduct(productName) {
        this.webLocators.searchInput().type(productName);
        this.webLocators.searchButton().click();
    };
    searchInput() {
        return this.webLocators.searchInput();
    };
    searchButton() {
        return this.webLocators.searchButton();
    };
    addToCartButton() {
         this.webLocators.addToCartButton().click();
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
    paymentPage() {
        return this.webLocators.paymentPage();
    };
    
}

export default new searchPage();
