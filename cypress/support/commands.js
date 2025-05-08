///<reference types="cypress" />

import wellcomepage from "../support/pageObjects/wellcomepage.js";
import homepage from "../support/pageObjects/homepage.js";


Cypress.Commands.add('navigatingToLoginpage', () => {
    cy.log('Logging in', Cypress.env('BASE_URL'));
    cy.clearCookies();
    //cy.wait(2000)
    cy.visit(Cypress.env('BASE_URL'), { timeout: 10000 });
    cy.wait(10000)//if any capcha is poping up in this 10 sec i am solving that capcha manually

    wellcomepage.webLocators.getDirectSignInbtn().click()
});


Cypress.Commands.add('searchOnWellcomeScreen', () => {
    cy.log('Logging in', Cypress.env('BASE_URL'));
    cy.clearCookies();
    cy.wait(2000)
    cy.visit(Cypress.env('BASE_URL'), { timeout: 10000 });
    cy.wait(10000)//if any capcha is poping up in this 10 sec i am solving that capcha manually

});


Cypress.Commands.add('addToCart', () => {
    //from searching the product
    var requiredProduct=Cypress.env('productName')[1]
    homepage.webLocators.getSearchTxbOnHome().type(`${requiredProduct}{enter}`)
    cy.wait(2000) //this below lines are for add to cart button locator onTop
    cy.get('h2.a-size-mini.s-line-clamp-1 > span').contains('Peter England')
    .parents('div.a-section.a-spacing-base')
    .find('button').contains('Add to cart')
    .click();
    
    cy.wait(4000)//this below lines are for add to cart button locator
    cy.contains('h2[aria-label*="Peter England"]', 'Peter England')
    .parents('div[data-csa-c-content-id="puis-atc-size-variation"]')
    .find('button')
    .contains('Add to cart')
    .click();

    cy.wait(2000)
    homepage.webLocators.getAddToCartLogoBtn().click()
    cy.url().should('include','cart')
    //cy.scrollTo(0,2300)
    cy.log("Required Product Successfully added to Cart :"+ `${requiredProduct}`)

});