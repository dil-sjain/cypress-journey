class searchPage {
  webLocators = {
    searchInput: () => cy.get("#twotabsearchtextbox"),
    searchResult: () => cy.get('[data-component-type="s-search-result"]'),
    resultTitle: () => cy.get('div[data-cy="title-recipe"]'),
    filterResult: () => cy.get('li[id="p_123/230542"] input[type="checkbox"]'),
    noResultText: () => cy.get(".a-section > .s-no-outline > :nth-child(1)"),
  };

  searchProduct(productName) {
    this.webLocators.searchInput().type(`${productName}{enter}`);
  }

  assertResultAndTitle(title) {
    this.webLocators.searchResult().should("have.length.greaterThan", 5);
    this.webLocators.resultTitle().should("include.text", title);
  }

  filterSearchResult(title2) {
    this.webLocators.filterResult().check({ force: true });
    this.webLocators.resultTitle().should("include.text", title2);
  }

  clearSearchBox() {
    this.webLocators.searchInput().clear();
  }

  selectProduct() {
    this.webLocators
      .searchResult()
      .first()
      .find("img")
      .parents("a")
      .invoke("removeAttr", "target")
      .click();
  }

  invalidResultSearch() {
    this.webLocators.noResultText().should("contain.text", "No results");
  }
}

export default new searchPage();
