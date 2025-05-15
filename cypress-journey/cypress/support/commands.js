import loginPage from "../support/pageObjects/loginPage";

Cypress.Commands.add("loginInToApplication", (username, password) => {
  cy.log("Logging in", Cypress.env("BASE_URL"));
  cy.clearAllCookies();
  cy.clearLocalStorage();
  cy.visit(Cypress.env("BASE_URL"), { timeout: 10000 });
  loginPage.openSignupPage();
  loginPage.enterUsername(username);
  loginPage.clickOnContinueButton();
  loginPage.enterPassword(password);
  loginPage.clickOnLoginButton();
});
