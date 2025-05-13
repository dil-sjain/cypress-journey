import loginPage from "./pageObjects/loginPage";


Cypress.Commands.add('loginInToApplication', (user_email, user_password) => {
    cy.log('Logging in', Cypress.env('BASE_URL'));
    cy.clearCookies();
    cy.clea

    cy.visit(Cypress.env('BASE_URL'));

    loginPage.clickOnSignInButton();
    loginPage.enterUsername(user_email);
    loginPage.enterPassword(user_password);
    loginPage.clickOnLoginButton();
});

Cypress.Commands.add('apiMockGET', (endpoint, fixtureFile, aliasUsed) => {
  cy.fixture(fixtureFile).then((data) => {
    cy.intercept({
        method: 'GET',
        url: endpoint,
    },{
        statusCode: 200,
        body: data,
    }).as(aliasUsed);
  });
});

Cypress.Commands.add('apiMockPOST', (endpoint, fixtureFile, aliasUsed) => {
  cy.fixture(fixtureFile).then((data) => {
    cy.intercept({
        method: 'POST',
        url: endpoint,
    },{
        statusCode: 200,
        body: data,
    }).as(aliasUsed);
  });
});
