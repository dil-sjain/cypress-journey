class wellcomepage {
  webLocators = {
    getSignInbtn: () => cy.contains("span", "Sign in"),
    getAccountListbtn: () => cy.get("span[class='nav-line-2 ']"),
    getDirectSignInbtn: () =>
      cy.get("span[id='nav-link-accountList-nav-line-1']"),
    getSearchTxbOnWellcome: () => cy.get("#twotabsearchtextbox"),
    getSearchbtnWellcome: () => cy.get("#nav-search-submit-button"),
    getSearchedItemLocator: () => cy.get("h2[aria-label*='iPhone']"),
    
  };

  //Actions

  searchOnWellcomeScreen() {
    cy.log("Logging in", Cypress.env("BASE_URL"));
    cy.clearCookies();
    cy.wait(2000);
    cy.visit(Cypress.env("BASE_URL"), { timeout: 10000 });
    cy.wait(10000); //if any capcha is poping up in this 10 sec i am solving that capcha manually
  }
}

export default new wellcomepage();
