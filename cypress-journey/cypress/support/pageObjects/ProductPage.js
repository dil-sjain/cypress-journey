class ProductPage {
  selectProduct(productName){
    cy.visit('/product');
    cy.get('body').should('contain', 'Product Title');
    cy.contains(productName).click()
  }
    // visit() {
    //   cy.visit('/products');
    // }
  
    selectProduct(name) {
      cy.contains('.product-card', name).within(() => {
        cy.get("input[id='add-to-cart-button']").contains('Add to Cart').click();
      });
    }

    verifyCartCount(count) {
      cy.get('[id="nav-cart-count"]').should('contain', count);
    }
  }
 
const productPage = new ProductPage();

export default productPage