import { SearchPageLocators } from "../locators/searchPageLocators";

class SearchPage {
  constructor() {
    this.webLocators = SearchPageLocators;
  }

  getCartTotalValue() {
    return cy
      .get(this.webLocators.cartPrice)
      .invoke("text")
      .then((text) => {
        const cleaned = text.replace(/[^\d]/g, "");
        return Number(cleaned);
      });
  }

  assertCartTotalNotZero() {
    return this.getCartTotalValue().then((total) => {
      expect(total, "Cart total should not be zero").to.not.equal(0);
    });
  }

  searchProduct(productName) {
    cy.get(this.webLocators.searchInput).clear().type(productName);
    cy.get(this.webLocators.searchButton).click();
  }

  addToCart() {
    cy.get(this.webLocators.addToCartButton).contains("Add to cart").click();
  }

  goToCart() {
    cy.get(this.webLocators.goToCartButton).contains("Go to Cart").click();
  }

  verifyCartTitle(expectedTitle) {
    cy.contains(this.webLocators.shoppingCartTitle, expectedTitle).should(
      "be.visible"
    );
  }

  verifyProceedToPay() {
    cy.get(this.webLocators.proceedToPay).should("be.visible").click();
  }

  verifyPaymentPage() {
    cy.get(this.webLocators.paymentPage, { timeout: 10000 }).should("exist");
  }

  clickContinueBtn() {
    cy.get(this.webLocators.continueBtn).click();
  }

  validateProdDetails() {
    cy.get(this.webLocators.prodDetails).should("contain", "iPhone 16");
  }

  saveForLaterAction() {
    cy.get(this.webLocators.saveForLater).first().click();
  }
}

export default new SearchPage();
