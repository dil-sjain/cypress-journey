class searchPage {
  webLocators = {
    searchInput: () => cy.get("#twotabsearchtextbox"),
    searchButton: () => cy.get('input.nav-input[type="submit"]'),
    searchResults: () => cy.get("div.s-main-slot.s-result-list"),
    firstProduct: () => cy.get("div.s-main-slot.s-result-list > div").first(),
  };

  validateSearchBoxIsEmpty() {
    this.webLocators
      .searchInput()
      .invoke("attr", "placeholder")
      .should((placeholder) => {
        expect(placeholder.trim()).to.equal("Search Amazon.in");
      });
  }

  searchForItem(itemName) {
    this.webLocators.searchInput().clear().type(itemName);
    this.webLocators.searchButton().click();
  }

  validateResultsContain(text) {
    this.webLocators.searchResults().should("contain.text", text);
  }

  validateResultsNotContain(text) {
    this.webLocators.searchResults().should("not.contain.text", text);
  }

  clickFirstProduct() {
    this.webLocators.firstProduct().find("h2 a").click();
  }
}

export default new searchPage();
