class HomePage {
  visitHomePage() {
    cy.visit("/");
  }

  get signInButtonOnHome() {
    return cy.get("#nav-link-accountList");
  }

  clickSignIn() {
    this.signInButtonOnHome.click();
  }
}

export default new HomePage();
