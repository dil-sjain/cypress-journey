// Description: This file contains the page objects for the login page.

class loginPage {
  webLocators = {
    username: () => cy.get('#ap_email_login'),
    password: () => cy.get('#ap_password'),
    loginButton: () => cy.get('#signInSubmit'),
    continueButton: () => cy.get('#continue'),
    signinButton:()=> cy.get("#nav-link-accountList")
  
    

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
  openSignupPage = () => {
    this.webLocators.signinButton().click();
  };
}
export default new loginPage();
