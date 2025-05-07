class homePage {
  webLocators = {
    signInButtonOnHome: () => cy.get("#nav-link-accountList"),
    helloMessage: () => cy.get("#nav-link-accountList-nav-line-1"),
  };

  visitHomePage() {
    cy.visit(Cypress.env("base_url"));
  }

  clickSignIn() {
    this.webLocators.signInButtonOnHome().click();
  }

  validateSuccessfulLogin() {
    this.webLocators.helloMessage().should("contain.text", "Hello");
  }
}
export default new homePage();
