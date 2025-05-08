///<reference types="cypress" />

import '../support/commands.js';
import loginpage1 from "../support/pageObjects/loginpage1.js";
import homepage from "../support/pageObjects/homepage.js";
import wellcomepage from "../support/pageObjects/wellcomepage.js";

describe('Sample Test Suite', () => {

    beforeEach(() => {
        cy.searchOnWellcomeScreen()
        
    });


    it('Search Operation without Login and Printing Productname and Prizes', () => {
        var reqProduct=Cypress.env('productName')[0]
        wellcomepage.webLocators.getSearchTxbOnWellcome().clear().type(`${reqProduct}{enter}`)
        cy.wait(2000)
        cy.get('h2[aria-label*="Apple iPhone 15"]').each(($el) => {
                const Mobilename= $el.text()
                const prize=$el.closest('div.a-spacing-top-small').find('span.a-price-whole').text()
                cy.log(Mobilename+"      "+prize) 
        })
    });

    it('Search Operation without Login and Selecting the 1st Matching Element', () => {
        var reqProduct=Cypress.env('productName')[0]
        wellcomepage.webLocators.getSearchTxbOnWellcome().clear().type(`${reqProduct}`).type('{enter}')//.type(`${reqProduct}{enter}`);
        cy.wait(2000)
        cy.get('h2[aria-label*="Apple iPhone 15"]').first().click()
        cy.log('User has been clicked on 1st Matching Element in the list ')

        })

    it('Adding the product to the cart and validating', () => {
        wellcomepage.webLocators.getDirectSignInbtn().click()
        loginpage1.enterUsernameandpass(Cypress.env('username'),Cypress.env('password'))
        var reqProduct=Cypress.env('productName')[1]
        homepage.checkHomepage()
        cy.addToCart()
    
    })


});