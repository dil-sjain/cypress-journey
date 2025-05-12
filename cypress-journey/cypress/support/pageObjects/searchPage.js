class SearchPage {
  searchInput = "#twotabsearchtextbox";
  searchButton = "input[id='nav-search-submit-button']";
  addToCartButton = "#a-autoid-1-announce";
  goToCartButton = "a.a-button-text";
  shoppingCartTitle = "h2";
  proceedToPay = "input[name=proceedToRetailCheckout]";
  paymentPage = ".a-box-group";
  continueBtn = '[data-testid="secondary-continue-button"]';
  prodDetails = ".sc-list-item-content";
  Amountvalidation = "#sc-subtotal-amount-activecart";
  saveForLater = 'input[value="Save for later"]';

  searchProduct(productName) {
    cy.get(this.searchInput).clear().type(productName);
    cy.get(this.searchButton).click();
  }
  addToCart() {
    cy.get(this.addToCartButton).contains("Add to cart").click();
  }

  goToCart() {
    cy.get(this.goToCartButton).contains("Go to Cart").click();
  }

  verifyCartTitle(expectedTitle) {
    cy.contains(this.shoppingCartTitle, expectedTitle).should("be.visible");
  }
  verifyProceedToPay() {
    cy.get(this.proceedToPay).should("be.visible").click();
  }
  verifyPaymentPage() {
    cy.get(this.paymentPage, { timeout: 10000 }).should("exist");
  }
  clickContinueBtn() {
    cy.get(this.continueBtn).click();
  }
  validateProdDetails() {
    cy.get(this.prodDetails).should("contain", "iPhone 16");
  }
  validateAmount() {
    cy.get(this.Amountvalidation).should("contain", "₹");
  }
  saveForLaterAction() {
    cy.get(this.saveForLater).first().click();
  }
}
export default new SearchPage();
