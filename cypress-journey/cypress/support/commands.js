import loginPage from "../support/pageObjects/loginPage";

Cypress.Commands.add("loginInToApplication", (username, password) => {
  cy.log("Logging in", Cypress.env("BASE_URL"));
  cy.clearCookies();

  cy.visit(Cypress.env("BASE_URL"), { timeout: 10000 });

  loginPage.enterUsername(username);
  loginPage.enterPassword(password);
  loginPage.clickOnLoginButton();
});

Cypress.Commands.add("customWait", (seconds) => {
  const milliseconds = seconds * 1000;
  cy.wait(milliseconds);
});
