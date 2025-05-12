import loginPage from "../support/pageObjects/loginPage";
import homePage from "../support/pageObjects/homePage";
import "../support/commands";

// I intentionally add hard waits to mimic human interaction speed.
// This helps avoid triggering Amazon's bot protection (e.g., Captcha challenges).
describe("Amazon Login Tests", () => {
  beforeEach(() => {
    homePage.visitHomePage();
    cy.customWait(2);
  });

  it("Should fail login with invalid credentials", () => {
    cy.fixture("validationText").then((data) => {
      homePage.clickSignIn();
      cy.customWait(2);
      loginPage.enterUsername(Cypress.env("mobileNum"));
      cy.customWait(2);
      loginPage.clickOnContinueButton();
      cy.customWait(2);
      loginPage.enterPassword(Cypress.env("invalidPassword"));
      cy.customWait(2);
      loginPage.clickOnLoginButton();
      cy.customWait(2);
      loginPage.validateErrorMessage(data.InValidCredentialMessage);
    });
  });

  it("Should login successfully with valid credentials", () => {
    homePage.clickSignIn();
    cy.customWait(2);
    loginPage.enterUsername(Cypress.env("mobileNum"));
    cy.customWait(2);
    loginPage.clickOnContinueButton();
    cy.customWait(2);
    loginPage.enterPassword(Cypress.env("password"));
    cy.customWait(2);
    loginPage.clickOnLoginButton();
    cy.customWait(2);
    // Validate successful login
    homePage.validateSuccessfulLogin();
    cy.customWait(2);
    homePage.logoutFromAmazon();
  });

  it("Should ask to register when user is not registered", () => {
    cy.fixture("validationText").then((data) => {
      homePage.clickSignIn();
      cy.customWait(2);
      loginPage.enterUsername(Cypress.env("unregisteredUser"));
      cy.customWait(2);
      loginPage.clickOnContinueButton();
      cy.customWait(2);
      loginPage.validateAskToRegisterMessage(data.UnregisteredUserMessage);
    });
  });

  it("Save session info and logout", () => {
    homePage.visitHomePage();
    homePage.clickSignIn();
    cy.customWait(2);
    loginPage.enterUsername(Cypress.env("mobileNum"));
    cy.customWait(2);
    loginPage.clickOnContinueButton();
    cy.customWait(2);
    loginPage.enterPassword(Cypress.env("password"));
    cy.customWait(2);
    loginPage.clickOnLoginButton();
    cy.customWait(2);
    // Validate successful login
    homePage.validateSuccessfulLogin();
    homePage.saveUserSessionInfo();
    homePage.logoutViaApi();
  });
});
