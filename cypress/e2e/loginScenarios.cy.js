///<reference types="cypress" />

import '../support/commands';
import loginpage1 from "../support/pageObjects/loginpage1.js";
import homepage from "../support/pageObjects/homepage.js";

describe('Login Scenarios Test Suit ', () => {

    beforeEach(() => {
        cy.navigatingToLoginpage()
        
    });

    it('user should login Successfully with valid credentials', () => {
        console.log(loginpage1);
        loginpage1.enterUsernameandpass(Cypress.env('username'),Cypress.env('password'))
        homepage.checkHomepage()
        
    });

    it('Should fail login with invalid credentials', () => {
        loginpage1.enterUsernameandpass(Cypress.env('invalidusername'),Cypress.env('invalidpassword'))
        loginpage1.validateErrormsgforWrongpass(Cypress.env('expectedErrormsg'))
        
    });

    it('Validating Conditions and Privacy links on Login page ', () => {
        loginpage1.validateTermsAndCOnditions()
        
    });

});