///<reference types="cypress" />

import "../support/commands";
import "../support/commands.js";
import loginpage1 from "../support/pageObjects/loginpage1.js";
import homepage from "../support/pageObjects/homepage.js";
import wellcomepage from "../support/pageObjects/wellcomepage.js";
import addToCartPage from "../support/pageObjects/addToCartPage.js";
import checkOutPage from "../support/pageObjects/checkOutPage.js";
import { endpoints, interceptgetAddToCartendpoint } from '../support/endpoints.js';

describe("Add To Cart All Scenarios Suite", () => {
  beforeEach(() => {
    interceptgetAddToCartendpoint();
  });

  it("Adding the product to the cart and Checkout the Flow of the selected Product", () => {
    var reqProduct = Cypress.env("productName")[2];
    wellcomepage.webLocators.getDirectSignInbtn().should("exist").click();
    loginpage1.enterUsernameandpass(
      Cypress.env("username"),
      Cypress.env("password")
    );
    homepage.checkHomepage();
    addToCartPage.addToCartUpdated(reqProduct);
    cy.wait("@addToCart").then(({ response }) => {
      console.log("Full response:", response.body);
      expect(response.body.successful).to.be.true;
      expect(response.body.count).to.equal(1);
    });

    addToCartPage.verifyProductDetailsMetaData();
    addToCartPage.verifyCheckoutPage();
    checkOutPage.ErrorMessageCheckOnFOrm();
    checkOutPage.fillingTheAddressDetails();
  });
});
