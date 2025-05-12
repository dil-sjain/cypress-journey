// import loginPage from "./pageObjects/loginPage";

// Cypress.Commands.add('loginInToApplication', (username, password) => {
//     cy.log('Logging in', Cypress.env('BASE_URL'));
//     cy.clearCookies();

//     cy.visit(Cypress.env('BASE_URL'), { timeout: 60000 });

//     loginPage.enterUsername(username);
//     loginPage.enterPassword(password);
//     loginPage.clickSubmit();
// });
import LoginPage from "./pageObjects/loginPage";
Cypress.Commands.add('loginInToApplication', (user_name, password) => {
    //const loginPage = new LoginPage();
        const loginPage = new LoginPage();


    cy.log('Logging in', Cypress.env('BASE_URL'));
    cy.clearCookies();
 
    cy.visit(Cypress.env('BASE_URL'), { timeout: 60000 });
 
    loginPage.clickAccountList();
   // cy.log('Clicking on Account List');
    //cy.log('Entering mobile number', username);
    loginPage.enterUsername(user_name);
   // cy.log('enterUsername', username);
    loginPage.clickProceed();
    loginPage.enterPassword(password);
    loginPage.clickSubmit();
});