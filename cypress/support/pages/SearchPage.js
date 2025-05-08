class SearchPage {
    searchMobile(mobileName) {
        cy.get('#search-input').should('be.visible').clear().type(mobileName);
        cy.get('#search-button').click();
    }

    verifyTitleContains(expectedTitlePart) {
        if (expectedTitlePart) {
            cy.title().should('include', expectedTitlePart);
    }else {
        cy.title().should('not.include', 'iPhone').and('not.include', 'Samsung').and('not.include', 'OnePlus');
    } 
    }
   verifySearchResultsExist() {
        cy.get('.search-result').should('have.length.greaterThan', 0);
    }
    verifyNoResultsMessage() {
        cy.contains('No results found').should('be.visible');
    }
    addFirstResultToCart() {
        cy.get('.search-result').first().within(() => {
            cy.contains('Add to Cart').click();
        });
    }

    verifyCartSuccessMessage() {
        cy.contains('Added to cart').should('be.visible');
    }

    openCart() {
        cy.get('#cart-icon').click();
    }

    verifyItemInCart(expectedName) {
        cy.get('.cart-item').should('contain.text', expectedName);
    }
}

const search = new SearchPage();

export default search


