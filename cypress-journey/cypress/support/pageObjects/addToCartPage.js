
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
    watchlabel: ()=> cy.get('h2[aria-label="Vintage A-158WA-1Q Digital Grey Dial Unisex Watch Silver Metal Strap (D011)"]'),
    addToCartButton: () => cy.get("#add-to-cart-button"),
    noResultText: () => cy.get(".a-section > .s-no-outline > :nth-child(1)")
  };
  openAndAddtoCart() {
    this.elements.productLabel()
      .parents("a")
      .invoke("removeAttr", "target")
      .click();
    this.elements.addToCartButton().click();
  }
  openWatchAndAddtoCart() {
    this.elements.watchlabel()
      .parents("a")
      .invoke("removeAttr", "target")
      .click();
    this.elements.addToCartButton().click();
  }

  invalidResultSearch() {
    this.elements.noResultText()
      .should('contain.text', 'No results');
  }
}

export default AddToCart;
