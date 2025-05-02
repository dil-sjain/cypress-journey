export class SearchPage {
    
        locators = {
            login_name: '#nav-link-accountList-nav-line-1',
            searchBox: 'input#twotabsearchtextbox',
            searchButton: '#nav-search-submit-button',
            suggestion_container:'div.s-suggestion-container',
            suggestion_list:'div.s-suggestion',
            search_result:'span.a-color-state.a-text-bold',
            search_list:'h2.a-size-medium.a-spacing-none.a-color-base.a-text-normal',
            slider_min: 'input[id="p_36/range-slider_slider-item_lower-bound-slider"]',
            slider_max: 'input[id="p_36/range-slider_slider-item_upper-bound-slider"]',
            product_price: 'span.a-price-whole',
            brand_checkbox:'span.a-size-base.a-color-base',
            main_container:'div.s-main-slot',
            product_list:'div[data-cy="title-recipe"] h2 span',
            products:'h2.a-size-medium span',
            product_title:'h1 span#productTitle',
            buy_now_button:'input#buy-now-button',
        }
        

   verifyLoginName(expectedText) {
        cy.get(this.locators.login_name).should('have.text', expectedText);
    }
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

    getSearchPage() {
       return cy.get(this.locators.search_result);
    }
    getSearchList() {
        return cy.get(this.locators.search_list);
    }

    setPriceRange(min, max) {
        cy.get(this.locators.slider_min,{ timeout: 5000 }).invoke('val', min).trigger('change',{force: true});
        cy.get(this.locators.slider_max,{ timeout: 5000 }).invoke('val', max).trigger('change',{force: true});
    }
    getProductPrices() {
        
        return cy.get(this.locators.product_price);
    }

    selectBrand(brand) {
        cy.get(this.locators.brand_checkbox).contains(brand).click();
        cy.get(this.locators.main_container, { timeout: 10000 }).should('be.visible');
    }
    validateProductsContainBrand(brand) {
        
        cy.get(this.locators.product_list).each(($product) => {
            const productText = $product.text().toLowerCase();
            expect(productText).to.include(brand.toLowerCase());
        });
    }
    getProductList() {
        return cy.get(this.locators.products);

    }
    getSpecificProductTitle() {
        return cy.get(this.locators.product_title);
    }
    getSpecificProductPrice() {
        return cy.get(this.locators.product_price);
    }

}