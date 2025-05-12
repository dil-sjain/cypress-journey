///<reference types="cypress" />

import wellcomepage from "../support/pageObjects/wellcomepage.js";
import homepage from "../support/pageObjects/homepage.js";
import addToCartpage from "../support/pageObjects/addToCartPage.js";

Cypress.Commands.add("navigatingToLoginpage", () => {
  cy.log("Logging in", Cypress.env("BASE_URL"));
  cy.clearCookies();
  cy.visit(Cypress.env("BASE_URL"), { timeout: 10000 });
  cy.wait(10000); //if any capcha is poping up in this 10 sec i am solving that capcha manually
  wellcomepage.webLocators.getDirectSignInbtn().click();
});

Cypress.Commands.add("getRandomNumber", () => {
  const min = 10;
  const max = 99;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return cy.wrap(random);
});
