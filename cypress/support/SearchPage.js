export class SearchPage {
    
        locators = {
            searchBox: 'input#twotabsearchtextbox',
            searchButton: '#nav-search-submit-button',
            suggestion_container:'div.s-suggestion-container',
            suggestion_list:'div.s-suggestion',
            search_result:'span.a-color-state.a-text-bold',
            search_list:'h2.a-size-medium.a-spacing-none.a-color-base.a-text-normal',

        };
        

   
    // Action Methods
    enterSearchText(text) {
        cy.get(this.locators.searchBox).type(text);
    }
    getSuggestionContainer() {
        return cy.get(this.locators.suggestion_container);
    }

    clickSearchButton() {
        cy.get(this.locators.searchButton).click();
    }

    verifySearchPage(expectedText) {
       cy.get(this.locators.search_result).should('have.text', expectedText);
    }
    verifySearchListLength() {
        cy.get(this.locators.search_list).should('have.length.gte', 15);
    }
}