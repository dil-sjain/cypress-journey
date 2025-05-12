///<reference types="cypress" />

import "../support/commands";
import "../support/commands.js";
import loginpage1 from "../support/pageObjects/loginpage1.js";
import homepage from "../support/pageObjects/homepage.js";
import wellcomepage from "../support/pageObjects/wellcomepage.js";
import addToCartPage from "../support/pageObjects/addToCartPage.js";
import checkOutPage from "../support/pageObjects/checkOutPage.js";

describe(
  "Samsung S-10 Mobile View Port Scenarios Suite",
  { viewportHeight: 760, viewportWidth: 360 },
  () => {
    beforeEach(() => {
      wellcomepage.searchOnWellcomeScreen();
    });

    it("Add to cart FLow In Samsung s-10 Mobile View", () => {
      var reqProduct = Cypress.env("productName")[2];

      wellcomepage.webLocators.getDirectSignInbtn().click();
      loginpage1.enterUsernameandpass(
        Cypress.env("username"),
        Cypress.env("password")
      );
      homepage.checkHomepage();
      addToCartPage.addToCartUpdated(reqProduct);
      addToCartPage.verifyProductDetailsMetaData();
      addToCartPage.verifyCheckoutPage();
      checkOutPage.ErrorMessageCheckOnFOrm();
      checkOutPage.fillingTheAddressDetails();
    });
  }
);
