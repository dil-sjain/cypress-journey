///<reference types="cypress" />

import "../support/commands.js";
import loginpage1 from "../support/pageObjects/loginpage1.js";
import homepage from "../support/pageObjects/homepage.js";
import wellcomepage from "../support/pageObjects/wellcomepage.js";
import addToCartPage from "../support/pageObjects/addToCartPage.js";
import { endpoints, interceptgetSearchRequest } from '../support/endpoints.js';

describe("Search FUnction Scenarios Test Suite", () => {
  beforeEach(() => {
    interceptgetSearchRequest();
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

    cy.get(wellcomepage.webLocators.getSearchedItemLocator(), { timeout: 10000 }).should('be.visible');
    cy.get(wellcomepage.webLocators.getSearchedItemLocator()).each(($el) => {
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
    cy.get(wellcomepage.webLocators.getSearchedItemLocator(), { timeout: 10000 }).should('be.visible');
    cy.get(wellcomepage.webLocators.getSearchedItemLocator()).first().click();
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
