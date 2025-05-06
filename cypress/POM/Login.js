
class AmazonPage {
  visit() {
      cy.visit('https://www.amazon.com');
  }

  clickSignIn() {
      cy.get('#nav-link-accountList-nav-line-1').click();
  }

  enterEmail(email) {
      cy.get('#ap_email_login').type(email);
  }

  clickContinue() {
      cy.get('#continue').click();
  }

  enterPassword(password) {
      cy.get('#ap_password').type(password);
  }

  clickSignInSubmit() {
      cy.get('#signInSubmit').click();
  }

  searchItem(item) {
      cy.get('#twotabsearchtextbox').clear().type(item);
      cy.get('#nav-search-submit-button').click();
      cy.get("div[data-cy='title-recipe']").first().click();
  }
}

export default AmazonPage;
