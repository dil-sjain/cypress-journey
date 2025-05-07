import loginPage from "../support/pageObjects/loginPage";
import homePage from "../support/pageObjects/homePage";

// I intentionally add hard waits to mimic human interaction speed.
// This helps avoid triggering Amazon's bot protection (e.g., Captcha challenges).
describe("Amazon Login Tests", () => {
  beforeEach(() => {
    homePage.visitHomePage();
    cy.customWait(2);
  });

  it("Should fail login with invalid credentials", () => {
    homePage.clickSignIn();
    cy.customWait(2);

    loginPage.enterUsername(Cypress.env("email"));
    cy.customWait(2);
    loginPage.clickOnContinueButton();
    cy.customWait(2);
    loginPage.enterPassword(Cypress.env("password"));
    cy.customWait(2);
    loginPage.clickOnLoginButton();
    loginPage.validateErrorMessage("There was a problem");
  });

  it("Should login successfully with valid credentials", () => {
    homePage.clickSignIn();
    cy.customWait(2);
    loginPage.enterUsername(Cypress.env("email"));
    cy.customWait(2);
    loginPage.clickOnContinueButton();
    cy.customWait(2);
    loginPage.enterPassword(Cypress.env("password"));
    cy.customWait(2);
    loginPage.clickOnLoginButton();
    cy.customWait(2);
    // Validate successful login
    homePage.validateSuccessfulLogin();
  });

  it("Should ask to register when user is not registerd", () => {
    homePage.clickSignIn();
    cy.customWait(2);
    loginPage.enterUsername(Cypress.env("unregisteredUser"));
    cy.customWait(2);
    loginPage.clickOnContinueButton();
    cy.customWait(2);
    loginPage.validateAskToRegisterMessage("Looks like you are new to Amazon");
  });
});
