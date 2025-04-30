class SearchPage {
    searchInput = '#twotabsearchtextbox';
    searchButton = "input[id='nav-search-submit-button']";
    addToCartButton = '#a-autoid-1-announce';
    goToCartButton = 'a.a-button-text';
    shoppingCartTitle = 'h2';
    searchProduct(productName) {
      cy.get(this.searchInput).type(productName);
      cy.get(this.searchButton).click();
    }
    addToCart() {
      cy.get(this.addToCartButton).contains('Add to cart').click();
    }
  
    goToCart() {
      cy.get(this.goToCartButton).contains('Go to Cart').click();
    }
  
    verifyCartTitle(expectedTitle) {
      cy.contains(this.shoppingCartTitle, expectedTitle).should('be.visible');
    }
  }
  export default new SearchPage();