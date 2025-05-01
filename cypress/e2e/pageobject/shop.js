
class AddToCart {
    elements = {
      accountLink: () => cy.get("#nav-link-accountList-nav-line-1"),
      emailField: () => cy.get("#ap_email_login"),
      continueButton: () => cy.get(".a-button-input"),
      passwordField: () => cy.get("#ap_password"),
      signInButton: () => cy.get("#signInSubmit"),
      searchField: () => cy.get(".nav-search-field input"),
      searchButton: () => cy.get("#nav-search-submit-button"),
      productLabel: () => cy.get("h2[aria-label='Sony PlayStation5 Gaming Console (Slim)']"),
      addToCartButton: () => cy.get("#add-to-cart-button"),
      noResultText: () => cy.get(".a-section > .s-no-outline > :nth-child(1)")
    };
  
    login(username, password) {
      this.elements.accountLink().click();
      this.elements.emailField().type(username);
      this.elements.continueButton().click();
      this.elements.passwordField().type(password);
      this.elements.signInButton().click();
    }
  
    searchProduct(product) {
      this.elements.searchField().type(product);
      this.elements.searchButton().click();
    }
  
    openAndAddtoCart() {
      this.elements.productLabel()
        .parents("a")
        .invoke("removeAttr", "target")
        .click();
      this.elements.addToCartButton().click();
    }
  
    searchCapsOfAndCapsOn() {
      this.elements.productLabel()
        .should('have.text', 'Sony PlayStation5 Gaming Console (Slim)');
  
      this.elements.searchField()
        .clear()
        .type('PS5{enter}');
  
      this.elements.productLabel()
        .should('have.text', 'Sony PlayStation5 Gaming Console (Slim)');
    }
  
    invalidResultSearch() {
      this.elements.noResultText()
        .should('contain.text', 'No results');
    }
  }
  
  export default AddToCart;
  