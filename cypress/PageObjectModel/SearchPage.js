class SearchPage{
    searchInput =  '#twotabsearchtextbox';
    searchButton = '#nav-search-submit-button';
    addToCartButton = '#a-autoid-1-announce';
    goToCartButton = 'a.a-button-text';
    shoppingCartTitle = 'h2';
    proceedToPay ="input[name=proceedToRetailCheckout]";
    paymentPage='.a-box-group';
    continueBtn = '[data-testid="secondary-continue-button"]';

searchProduct(productName) {
    cy.get(this.searchInput).type(productName);
    cy.get(this.searchButton).click();
  }
  addToCart() {
    cy.get(this.addToCartButton).contains('Add to cart').click();
  }

  goToCart() {
    cy.get(this.goToCartButton).contains('Go to Cart').click();
  }

  verifyCartTitle(expectedTitle) {
    cy.contains(this.shoppingCartTitle, expectedTitle).should('be.visible');
  }
  verifyProceedToPay(){
    cy.get(this.proceedToPay).should('be.visible').click();
  }
  verifyPaymentPage(){
    cy.get(this.paymentPage, { timeout: 10000 }).should('exist');

  }
  clickContinueBtn(){
    cy.get(this.continueBtn).click()
  }
}
export default new SearchPage();