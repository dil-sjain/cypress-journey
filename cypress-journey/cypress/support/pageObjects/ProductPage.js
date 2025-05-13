class ProductPage {
    selectFirstProduct() {
      cy.get('.s-main-slot .s-result-item').first().click();
    }
  }
  
  export default ProductPage;