
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

    it('Login to Amazon', function() {
        
        const expectedLoginName = this.assignData.user.expected_login_name; 
        cy.login(email, password);
        cy.get(searchPage.locators.login_name).should('contain', expectedLoginName);    
    })

    it('Search for a product', function() {
        cy.login(email, password);
        const searchText = this.assignData.search.search_text; 
        const expectedText = `"${this.assignData.search.search_text}"`;
        searchPage.enterSearchText(searchText);

        //verify auto-suggestions
        searchPage.getSuggestionContainer().should('be.visible');
        searchPage.getSuggestionContainer().find(searchPage.locators.suggestion_list).should('contain', searchText);
        searchPage.clickSearchButton();

        //verify searched text and product list
        searchPage.getSearchPage().should('have.text', expectedText);;
        searchPage.getSearchList().should('have.length.gte', 15);

        //verify slider filter 
        const expected_min_price =  this.assignData.search.expected_min_price;
        const expected_max_price =  this.assignData.search.expected_max_price;
        cy.log(`Expected min price: ${expected_min_price}`);
        cy.log(`Expected max price: ${expected_max_price}`);
        searchPage.setPriceRange(this.assignData.search.min_price_slider, this.assignData.search.max_price_slider);  
        cy.screenshot('price-range-slider');
        searchPage.getProductPrices().each(($price) => {
        const price = parseInt($price.text().replace(/,/g, ''), 10);
        expect(price).to.be.gte(expected_min_price);
        expect(price).to.be.lte(expected_max_price);
        })
        const brand = this.assignData.search.filter_brand;

        //verify brand filter - checkbox
        searchPage.selectBrand(brand);
        searchPage.validateProductsContainBrand(brand);

    })
    it('Verify specific product search', function() {
        cy.login(email, password);
        const product_name = this.assignData.product.product_name;
        const expected_product_price = this.assignData.product.product_price;
        
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        searchPage.getSearchPage().should('contain', product_name);
        searchPage.getProductList().each(($product) => {
            const productText = $product.text().toLowerCase();
            cy.log(`searching for ${productText}`);
            const expected_product_name = product_name.toLowerCase();
            
            if (productText.includes(expected_product_name)) {
                cy.wrap($product).parent('a').invoke('removeAttr','target').click({timeout: 5000});
                return false; 
            }
        });
        // searchPage.getProductList().contains(product_name).parent('a').invoke('removeAttr','target').click({force:true});
        
        searchPage.getSpecificProductTitle().should('contain', product_name);
        searchPage.getSpecificProductPrice().should('be.visible');
        searchPage.getSpecificProductPrice().invoke('text').then(($price) => {
            const price = parseInt($price.replace(/,/g, ''), 10);
            expect(price).to.eq(expected_product_price);
        })
    })
    

})