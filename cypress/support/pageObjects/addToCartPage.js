import homepage from "../pageObjects/homepage.js";
import wellcomepage from "../pageObjects/wellcomepage.js";

class addToCartPage {
  webLocators = {
    getAddToCartBtn: () => cy.get('button[aria-label="Add to cart"]'),
    getAddToCartConfirmationbtn: () =>
      cy
        .get("h2.a-size-base.a-spacing-none.a-color-base.a-text-normal")
        .closest("div.a-section.puis-atc-size-variation")
        .find("button.a-button-text")
        .first(),
    getPlusIconBtnAdd: () => cy.get("span.a-icon.a-icon-small-add"),
    getDeleteIconBtndelete: () => cy.get("span.a-icon.a-icon-small-trash"),
    getCountOfAddToCart: () => cy.get("#nav-cart-count"), //you have to get the text of the ele.
    getMinesIconbtn: () => cy.get("span.a-icon.a-icon-small-remove"),
    getAmountOfProductOriginalPrize: () =>
      cy.get(
        "ul.a-vertical.a-spacing-base.sc-item-content-list span.a-price-whole"
      ),
    getTotalAmountOfCart: () =>
      cy
        .get("span.a-size-medium.a-color-base.sc-price.sc-white-space-nowrap")
        .first(),
    getProductTitleNamesList: () => cy.get(".a-truncate-cut"), //if one or more are there we can access all
    getProductColourOrStyleDetails: () =>
      cy
        .get("span.a-truncate-cut")
        .closest("div.sc-item-content-group")
        .find("span.a-size-small.a-text-bold")
        .next(),
    getProceedToBuyBtn: () => cy.get("input[name='proceedToRetailCheckout']"),
    getSaveForLaterBtn: () => cy.get("input[value='Save for later']"),
    getDeleteItemBtn: () => cy.get("input[value='Delete']"),
    getMoveBackToCartfromSave: () => cy.get('input[value="Move to cart"]'),
  };

  //Actions
  printTheSearchItemsList(requiredProduct) {
    wellcomepage.webLocators
      .getSearchTxbOnWellcome()
      .type(`${requiredProduct}{enter}`);
    homepage.webLocators.getSearchedListItems().each(($el) => {
      cy.log($el.text());
    });
  }

  addToCartUpdated(requiredProduct) {
    homepage.webLocators
      .getSearchTxbOnHome()
      .should("be.visible")
      .type(`${requiredProduct}{enter}`);
    this.webLocators.getAddToCartBtn().should("be.visible");
    this.webLocators.getAddToCartBtn().first().click();
    homepage.webLocators.getAddToCartLogoBtn().should("be.visible");
    homepage.webLocators.getAddToCartLogoBtn().click();
    cy.url().should("include", "cart");
    cy.log(
      "Required Product Successfully added to Cart :" + `${requiredProduct}`
    );
  }
  verifySaveForLaterOption() {
    this.webLocators.getSaveForLaterBtn().should("exist").first().click();
    cy.get("div.sc-list-item-removed-msg")
      .contains("been moved to Saved for Later")
      .should("be.visible");
    this.webLocators.getMoveBackToCartfromSave().should("exist");
    this.webLocators.getMoveBackToCartfromSave().first().click();
    cy.log("Product Added to save for later and Removed :");
  }

  verifyCartCountUpdate() {
    let OriginalCount = 0;
    this.webLocators.getCountOfAddToCart().then(($el) => {
      const updatedCount = parseInt($el.text().trim(), 10);
      this.webLocators.getPlusIconBtnAdd().should("be.visible").first().click();
      this.webLocators.getMinesIconbtn().should("exist");
      expect(updatedCount).to.be.greaterThan(OriginalCount);
    });
  }

  verifyProductDetailsMetaData() {
    this.webLocators.getProductTitleNamesList().then(($el) => {
      const text = $el.text();
      expect(text).to.contain("SAMSUNG");
      cy.log("Title :" + text);
    });
    this.webLocators
      .getProductColourOrStyleDetails()
      .first()
      .then(($el) => {
        cy.log("Colour :" + $el.text());
      });
    this.webLocators
      .getAmountOfProductOriginalPrize()
      .first()
      .then(($el) => {
        cy.log("Prize : " + $el.text());
      });
    cy.log("Successfully printed the Product Details : ");
  }
  verifyCheckoutPage() {
    this.webLocators.getProceedToBuyBtn().should("exist").click();
    cy.url().should("include", "checkout");
    cy.log("Successfully navigated to Product CheckOutPage :");
  }
}

export default new addToCartPage();
