class searchPage {
    webLocators = {
    searchField: () => cy.get(".nav-search-field input", { timeout: 10000 }).should('be.visible'),
    searchButton: () => cy.get("#nav-search-submit-button"),
    productLabel: () => cy.get("h2[aria-label='Sony PlayStation5 Gaming Console (Slim)']"),
    clickonsearch : () => cy.get("#nav-search-submit-button"),
    brand: ()=> cy.get("a[aria-label='Apply the filter MuscleBlaze to narrow results'] span[class='a-size-base a-color-base']"),
    item1: ()=> cy.get("#a-autoid-1-announce"),
    item2: ()=>cy.get("#a-autoid-2-announce"),
    item3: ()=> cy.get("#a-autoid-3-announce"),
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
  selectbrand(){
    this.webLocators.brand().click();
  }

  addmultipleitem(){
    this.webLocators.item1().click();
    this.webLocators.item2().click();
    this.webLocators.item3().click();
  }
  clickonsearch(){
    this.webLocators.clickonsearch().click();
  }
}

export default searchPage;
