
import { SearchPage } from "../support/SearchPage";

const searchPage = new SearchPage();
const { email, password } = Cypress.env();

describe('Assignment 1', () => {
    before(() => {
        cy.clearAllCookies();
        cy.clearAllLocalStorage(); 
    })

    beforeEach(function () {
        cy.fixture('assignData.json').then((data) => {
            this.assignData = data;
        })
        
    })

    it.skip('Login to Amazon', function() {
        
        const expectedLoginName = this.assignData.user.expected_login_name; 
        cy.login(email, password);
        cy.get('#nav-link-accountList-nav-line-1').should('contain', expectedLoginName);    
    })

    it('Search for a product', function() {
        cy.login(email, password);
        const searchText = this.assignData.search.search_text; 
        const expectedText = `"${this.assignData.search.search_text}"`;
        searchPage.enterSearchText(searchText);
        searchPage.getSuggestionContainer().should('be.visible');
        searchPage.getSuggestionContainer().find(searchPage.locators.suggestion_list).should('contain', searchText);
        searchPage.clickSearchButton();
        searchPage.verifySearchPage(expectedText);
        searchPage.verifySearchListLength();

    })
    

})