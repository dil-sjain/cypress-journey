class searchPage {
    webLocators = {
    searchField: () => cy.get(".nav-search-field input"),
    searchButton: () => cy.get("#nav-search-submit-button"),
    productLabel: () => cy.get("h2[aria-label='Sony PlayStation5 Gaming Console (Slim)']"),

    };

    searchProduct(product) {
      this.webLocators.searchField().type(product);
      this.webLocators.searchButton().click();
    }
    
  searchCapsOfAndCapsOn() {
    this.webLocators.productLabel()
      .should('have.text', 'Sony PlayStation5 Gaming Console (Slim)');

    this.webLocators.searchField()
      .clear()
      .type('PS5{enter}');

    this.webLocators.productLabel()
      .should('have.text', 'Sony PlayStation5 Gaming Console (Slim)');
  }
}

export default searchPage;
