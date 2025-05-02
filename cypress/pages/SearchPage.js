class SearchPage {
  // Locators
  get searchInput() {
    return cy.get("#twotabsearchtextbox");
  }

  get searchButton() {
    return cy.get('input.nav-input[type="submit"]');
  }

  get searchResults() {
    return cy.get("div.s-main-slot.s-result-list");
  }

  get firstProduct() {
    return cy.get("div.s-main-slot.s-result-list > div").first();
  }

  get allProducts() {
    return cy.get("div.s-main-slot.s-result-list > div");
  }

  get cartButton() {
    return cy.get("#nav-cart");
  }

  //Actions

  validateSearchBoxIsEmpty() {
    this.searchInput.invoke("attr", "placeholder").should((placeholder) => {
      expect(placeholder.trim()).to.equal("Search Amazon.in");
    });
  }

  searchForItem(itemName) {
    this.searchInput.clear().type(itemName);
    this.searchButton.click();
  }

  validateResultsContain(text) {
    this.searchResults.should("contain.text", text);
  }

  validateResultsNotContain(text) {
    this.searchResults.should("not.contain.text", text);
  }

  clickFirstProduct() {
    this.firstProduct.find("h2 a").click();
  }

  addFirstProductToCart() {
    this.clickFirstProduct();
    cy.get("#add-to-cart-button").click();
  }

  goToCart() {
    this.cartButton.click();
  }
}

export default new SearchPage();
