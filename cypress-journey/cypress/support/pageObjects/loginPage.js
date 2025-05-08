// Description: This file contains the page objects for the login page.

class loginPage {
  webLocators = {
    accountListLink: () => cy.get("#nav-link-accountList-nav-line-1"),
    username: () => cy.get("#ap_email_login"),
    continueButton: () => cy.get(".a-button-input"),
    password: () => cy.get("#ap_password"),
    loginButton: () => cy.get("#signInSubmit"),
  };

  clickOnAccountlink = (accountListLink) => {
    this.webLocators.accountListLink().click();
  };

  enterUsername = (username) => {
    this.webLocators.username().type(username);
  };
  clickOncontinueButton = (continueButton) => {
    this.webLocators.continueButton().click();
  };
  enterPassword = (password) => {
    this.webLocators.password().type(password);
  };
  clickOnLoginButton = () => {
    this.webLocators.loginButton().click();
  };

  verifyuser(verifyusername) {
    this.webLocators.accountListLink().should("contain.text", verifyusername);
  }
}
export default loginPage;
