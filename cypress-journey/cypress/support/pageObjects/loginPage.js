// Description: This file contains the page objects for the login page.

class loginPage {
  webLocators = {
    signInButton: () => cy.get('#nav-link-accountList-nav-line-1'),
    username: () => cy.get('input[name="email"]'),
    password: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('#signInSubmit'),
    login_name: () => cy.get('#nav-link-accountList-nav-line-1'),
    accountsButton: () => cy.get('button[aria-label="Expand Account and Lists"]'),
    signOutButton:()=> cy.get('#nav-item-signout > span')
  };

  // Actions

  clickOnSignInButton = () => {
    this.webLocators.signInButton().click({ force: true });
  };

  enterUsername = (user_email) => {
    this.webLocators.username().type(user_email).type('{enter}');
  };
  enterPassword = (user_password) => {
    this.webLocators.password().type(user_password);
  };
  clickOnLoginButton = () => {
    this.webLocators.loginButton().click();
  };

  verifyLogin(expectedLoginName){
    
    this.webLocators.login_name().should('be.visible');
    this.webLocators.login_name().should('contain', expectedLoginName); 
  }
  logOut(){
    this.webLocators.accountsButton().click({force:true});
    this.webLocators.signOutButton().click({force:true});
  }
}
export default new loginPage();
