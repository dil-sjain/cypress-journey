// Description: This file contains the page objects for the login page.
class loginPage {
  webLocators = {
    username: () => cy.get("#ap_email_login"),
    password: () => cy.get("#ap_password"),
    loginButton: () => cy.get("#signInSubmit"),
    continueButton: () => cy.get(".a-button-input"),
    errorMessage: () => cy.get("#auth-error-message-box"),
    askToRegisterMessage: () =>
      cy.get("#intent-confirmation-container").find("h1"),
  };

  // Actions

  enterUsername = (username) => {
    this.webLocators.username().type(username);
  };
  enterPassword = (password) => {
    this.webLocators.password().type(password);
  };
  clickOnLoginButton = () => {
    this.webLocators.loginButton().click();
  };
  clickOnContinueButton = () => {
    this.webLocators.continueButton().click();
  };
  validateErrorMessage(expectedText) {
    this.webLocators.errorMessage().should("contain.text", expectedText);
  }
  validateAskToRegisterMessage(expectedText) {
    this.webLocators
      .askToRegisterMessage()
      .should("contain.text", expectedText);
  }
}
export default new loginPage();
