import homePage from "../pages/HomePage";
class LoginPage {
  // Locators

  get emailInput() {
    return cy.get("#ap_email_login");
  }

  get continueButton() {
    return cy.get(".a-button-input");
  }

  get passwordInput() {
    return cy.get("#ap_password");
  }

  get signInSubmitButton() {
    return cy.get("#signInSubmit");
  }

  get errorMessage() {
    return cy.get("#auth-error-message-box");
  }

  get askToRegisterMessage() {
    return cy.get("#intent-confirmation-container").find("h1");
  }

  // Actions

  enterEmail(email) {
    this.emailInput.clear().type(email);
    this.continueButton.click();
  }

  enterPassword(password) {
    this.passwordInput.clear().type(password);
    this.signInSubmitButton.click();
  }

  // This login() method is designed for testing invalid credentials only.
  // I intentionally add hard waits to mimic human interaction speed.
  // This helps avoid triggering Amazon's bot protection (e.g., Captcha challenges).

  login(email, password) {
    homePage.clickSignIn();
    cy.wait(2000);

    this.emailInput.clear().type(email);
    cy.wait(2000);

    this.continueButton.click();
    cy.wait(2000);

    this.passwordInput.clear().type(password);
    cy.wait(2000);

    this.signInSubmitButton.click();
    cy.wait(2000);
  }

  validateErrorMessage(expectedText) {
    this.errorMessage.should("contain.text", expectedText);
  }

  validateAskToRegisterMessage(expectedText) {
    this.askToRegisterMessage.should("contain.text", expectedText);
  }
}

export default new LoginPage();
