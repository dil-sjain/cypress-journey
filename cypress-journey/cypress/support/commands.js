import loginPage from "./pageObjects/LoginPage";

Cypress.Commands.add('loginInToApplication', (username, password) => {
    cy.log('Logging in', Cypress.env('BASE_URL'));
    cy.clearCookies();

    cy.visit(Cypress.env('BASE_URL'), { timeout: 10000 });

    loginPage.enterUsername(username);
    loginPage.enterPassword(password);
    loginPage.clickOnLoginButton();
});

// Cypress.Commands.add("login", () => {
//     //cy.visit("/login");
//     cy.get("#email").type("testuser@example.com");
//     cy.get("#continue").click();
//     cy.get("#password").type("Test@123");
//     cy.get("#signInSubmit").click();
//   });
  
//   Cypress.Commands.add("addToCart", (productName) => {
//     cy.contains(productName).click();
//     cy.get("#add-to-cart-button").click();
//     cy.get("#cart-count").should("exist");
//   });