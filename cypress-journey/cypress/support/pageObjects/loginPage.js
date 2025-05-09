// Description: This file contains the page objects for the login page.

class LoginPage {
  // Web Locators
  webLocators = {
    accountLink: () => cy.get('#nav-link-accountList-nav-line-1'), 
    username: () => cy.get('#ap_email_login'), 
    continueButton: () => cy.get('#continue'), 
    password: () => cy.get('#ap_password'), 
    signInButton: () => cy.get('#signInSubmit'), 
  };

  // Actions

  // Click on the Account link to navigate to the login page
  clickOnAccountlink() {
    this.webLocators.accountLink().click();
  }

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
    this.webLocators.signInButton().click();
  };
}

export default LoginPage;
