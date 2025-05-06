class SearchPage {
  searchProduct(productName) {
    cy.get("#twotabsearchtextbox").type(`${productName}{enter}`);
  }
  assertResultAndTitle(title) {
    cy.get('[data-component-type="s-search-result"]').should(
      "have.length.greaterThan",
      5
    );
    cy.get('div[data-cy="title-recipe"]').should("include.text", title);
  }
  selectProduct() {
    cy.get('[data-component-type="s-search-result"]')
      .first()
      .find("img")
      .parents("a")
      .invoke("removeAttr", "target")
      .click();
  }
}
export default SearchPage;
