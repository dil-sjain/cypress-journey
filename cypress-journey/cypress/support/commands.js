import loginPage from "../support/pageObjects/loginPage";

Cypress.Commands.add('loginInToApplication', (username, password) => {
    cy.log('Logging in', Cypress.env('BASE_URL'));
    cy.clearCookies();

    cy.visit(Cypress.env('BASE_URL'), { timeout: 60000 });

    loginPage.clickAccountList();
    cy.log('Clicking on Account List');
    cy.log('Entering mobile number', username);
    loginPage.enterMobile(username);
    cy.log('mobile number', username);
    loginPage.clickContinue();
    loginPage.enterPassword(password);
    loginPage.clickSignIn();
});