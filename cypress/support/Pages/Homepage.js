class Homepage {
  elements = {
    accountListLink: () => cy.get("#nav-link-accountList-nav-line-1"),
    emailInput: () => cy.get("#ap_email_login"),
    continueButton: () => cy.get(".a-button-input"),
    passwordInput: () => cy.get("#ap_password"),
    signInButton: () => cy.get("#signInSubmit"),
  };

  Login(username, password) {
    this.elements.accountListLink().click();
    this.elements.emailInput().type(username);
    this.elements.continueButton().click();
    this.elements.passwordInput().type(password);
    this.elements.signInButton().click();
  }

  verifyuser(verifyusername) {
    this.elements.accountListLink().should("contain.text", verifyusername);
  }
}

export default Homepage; 
