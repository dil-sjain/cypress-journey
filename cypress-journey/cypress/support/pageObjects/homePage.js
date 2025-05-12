class homePage {
  webLocators = {
    signInButtonOnHome: () => cy.get("#nav-link-accountList"),
    helloMessage: () => cy.get("#nav-link-accountList-nav-line-1"),
    sortByDropdown: () => cy.get("span.a-dropdown-container"),
    sortByOptionsList: () => cy.get("ul.a-nostyle.a-list-link li"),
    signOutButton: () => cy.get("#nav-item-signout"),
    cartCount: () => cy.get("#nav-cart-count"),
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

  selectSortBy(optionText) {
    cy.log(`Selecting sort option: ${optionText}`);

    // Click the dropdown to open options
    this.webLocators.sortByDropdown().should("be.visible").click();

    // Select the option
    this.webLocators
      .sortByOptionsList()
      .contains(optionText)
      .should("be.visible")
      .click();

    cy.log(`Sort option '${optionText}' selected`);
  }

  logoutFromAmazon() {
    cy.log("Logging out from Amazon...");

    // Hover over 'Accounts & Lists' menu
    this.webLocators.signInButtonOnHome().trigger("mouseover");

    // Click 'Sign Out' button from the dropdown
    cy.contains("Sign Out", { matchCase: false })
      .should("be.visible")
      .click({ force: true });

    // Validate logout
    cy.url().should("include", "/ap/signin");
    cy.log("Successfully logged out.");
  }

  saveUserSessionInfo() {
    cy.log("Saving user session info...");
    const userInfo = {};

    this.webLocators
      .helloMessage()
      .invoke("text")
      .then((text) => {
        userInfo.username = text.trim();
      });

    this.webLocators
      .cartCount()
      .invoke("text")
      .then((countText) => {
        userInfo.cartItemCount = parseInt(countText.trim()) || 0;
      });

    cy.then(() => {
      cy.writeFile("cypress/fixtures/userSession.json", userInfo);
      cy.log("User session info saved");
    });
  }

  logoutViaApi() {
    cy.log("Starting logout...");
    cy.intercept("GET", "/gp/flex/sign-out.html*").as("logoutRequest");

    // Hover over 'Accounts & Lists' menu
    this.webLocators.signInButtonOnHome().trigger("mouseover");

    // Click 'Sign Out' button from the dropdown
    cy.contains("Sign Out", { matchCase: false })
      .should("be.visible")
      .click({ force: true });

    cy.wait("@logoutRequest").then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 302]);
    });

    // Validate logout
    cy.url().should("include", "/ap/signin");
    cy.log("Successfully logged out.");
  }
}

export default new homePage();
