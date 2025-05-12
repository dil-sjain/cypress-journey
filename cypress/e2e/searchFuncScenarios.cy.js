///<reference types="cypress" />

import "../support/commands.js";
import loginpage1 from "../support/pageObjects/loginpage1.js";
import homepage from "../support/pageObjects/homepage.js";
import wellcomepage from "../support/pageObjects/wellcomepage.js";
import addToCartPage from "../support/pageObjects/addToCartPage.js";

describe("Search FUnction Scenarios Test Suite", () => {
  beforeEach(() => {
    wellcomepage.searchOnWellcomeScreen();
    cy.intercept("GET", "**/s/ref=nb_sb_noss**").as("searchRequest");
  });

  it("Search Operation without Login and Printing Productname and Prizes", () => {
    var reqProduct = Cypress.env("productName")[0];
    wellcomepage.webLocators
      .getSearchTxbOnWellcome()
      .clear()
      .type(`${reqProduct}{enter}`);

    cy.wait("@searchRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      const containsIphone = JSON.stringify(responseBody)
        .toLowerCase()
        .includes("iphone");
      expect(containsIphone).to.be.true;
    });

    cy.get("h2[aria-label*='iPhone']", { timeout: 10000 }).should("be.visible");
    cy.get('h2[aria-label*="iPhone"]').each(($el) => {
      const Mobilename = $el.text();
      const prize = $el
        .closest("div.a-spacing-top-small")
        .find("span.a-price-whole")
        .text();
      cy.log(Mobilename + "      " + prize);
    });
  });

  it("Search Operation without Login and Selecting the 1st Matching Element", () => {
    var reqProduct = Cypress.env("productName")[0];
    wellcomepage.webLocators
      .getSearchTxbOnWellcome()
      .clear()
      .type(`${reqProduct}`)
      .type("{enter}"); //.type(`${reqProduct}{enter}`);
    cy.get("h2[aria-label*='iPhone']", { timeout: 10000 }).should("be.visible");
    cy.get('h2[aria-label*="iPhone"]').first().click();
  });

  it("Adding the product to the cart and validating", () => {
    wellcomepage.webLocators.getDirectSignInbtn().click();
    loginpage1.enterUsernameandpass(
      Cypress.env("username"),
      Cypress.env("password")
    );
    var reqProduct = Cypress.env("productName")[1];
    homepage.checkHomepage();
    addToCartPage.addToCartUpdated(reqProduct);
  });
});
