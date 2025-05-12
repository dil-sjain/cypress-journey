import addToCartPage from "../pageObjects/addToCartPage.js";

class homepage {
  webLocators = {
    getSearchbtnHome: () => cy.get("#nav-search-submit-button"),
    getSearchTxbOnHome: () => cy.get("#twotabsearchtextbox"),
    getAddToCartLogoBtn: () => cy.get("#nav-cart-count"),
    getSearchedListItems: () =>
      cy.get(
        'div[class*="spacing-top-small"][class*="s-title-instructions-style"] h2[class*="a-size-base-plus"][class*="a-spacing-none"][class*="a-color-base"][class*="a-text-normal"]'
      ),
  };

  //Actions
  checkHomepage() {
    cy.url().should("include", "?ref_=nav_ya_signin");
    cy.log("Homepage is Displayed :");
  }
}

export default new homepage();
