// Description: This file contains the page objects for the login page.

class loginPage {
  webLocators = {
    clickAccountList: () => cy.get('#nav-link-accountList'),
    enterMobile: () => cy.get("input[type='email']"),
    clickContinue: () => cy.get('.a-button-input'),
    enterPassword: () => cy.get("input[type='password']"),
    clickSignIn: () => cy.get('#signInSubmit'),
  };

  // Actions
  clickAccountList = () => {
    this.webLocators.clickAccountList().click();
  };
  enterMobile = (username) => {
    this.webLocators.enterMobile().type(username);
  };
  clickContinue = () => {
    this.webLocators.clickContinue().click();
  };
  enterPassword = (password) => {
    this.webLocators.enterPassword().type(password);
  };  
  clickSignIn = () => { 

    this.webLocators.clickSignIn().click();
  };
}
export default new loginPage();
