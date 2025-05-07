import loginPage from "../support/pageObjects/loginPage";
const loginpage= new loginPage();

Cypress.Commands.add('loginInToApplication', (username, password) => {
    cy.clearCookies();

    cy.log('Logging in', Cypress.env('BASE_URL'));

    cy.visit(Cypress.env('BASE_URL'), { timeout: 10000 });
    loginpage.clickAccountLink();
    loginpage.enterUsername(username);
    loginpage.clickContinueButton();
    loginpage.enterPassword(password);
    loginpage.clickSignInButton();
});