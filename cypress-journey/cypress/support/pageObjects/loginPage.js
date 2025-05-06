// Description: This file contains the page objects for the login page.

class loginPage {
  webLocators = {
    username: () => cy.get('#loginID'),
    password: () => cy.get('#pw'),
    loginButton: () => cy.get('#btnSubmit'),
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
}
export default new loginPage();
