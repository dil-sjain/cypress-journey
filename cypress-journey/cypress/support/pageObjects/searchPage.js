import actionHelper from "../utils/actionHelper";
import  assertHelper  from "../support/utils/assertHelper";

const performAction = actionHelper;
const performAssert = assertHelper;

const products = [];
const productData = [];
const cartData = [];

class searchPage {
    webLocators = {
      searchBox: () => cy.get('input#twotabsearchtextbox'),
      searchButton: () => cy.get('#nav-search-submit-button'),
      suggestionContainer: () => cy.get('div.s-suggestion-container'),
      suggestion_list: () => cy.get('div.s-suggestion'),
      search_result: () => cy.get('span.a-color-state.a-text-bold'),
      search_list: () => cy.get('h2.a-size-medium.a-spacing-none.a-color-base.a-text-normal'),
      slider_min: () => cy.get('input[id="p_36/range-slider_slider-item_lower-bound-slider"]'),
      slider_max: () => cy.get('input[id="p_36/range-slider_slider-item_upper-bound-slider"]'),
      product_price: () => cy.get('span.a-price-whole'),
      brand_checkbox: () => cy.get('span.a-size-base.a-color-base'),
      main_container: () => cy.get('div.s-main-slot'),
      product_list: () => cy.get('div[data-cy="title-recipe"] h2 span'),
      products: () => cy.get('h2.a-size-medium'),
      product_title: () => cy.get('h1 span#productTitle'),
      buy_now_button: () => cy.get('input#buy-now-button'),
    };

    // Actions
    enterSearchText(text) {
        performAction.enterText(this.webLocators.searchBox(), text);
    }
    clickSearchButton() {
      performAction.clickOnButton(this.webLocators.searchButton());
    }
    getSearchPage() {
      return this.webLocators.search_result();
    }
    getSearchList() {
     return this.webLocators.search_list();
    }
    verifySearchText(searchText){
      performAssert.elementValue(this.webLocators.searchBox(), searchText);
      performAssert.elementVisibility(this.webLocators.suggestionContainer());
      performAssert.elementContainText(this.webLocators.suggestion_list(), searchText);
    }
    verifyProductList(searchText, expectedText){
      performAssert.pageUrlIncludes(searchText);
      performAssert.elementText(this.getSearchPage(), expectedText);
    }
    setPriceRange(min, max) {
      this.webLocators.slider_min({ timeout: 5000 }).invoke('val', min).trigger('change',{force: true});
      this.webLocators.slider_max({ timeout: 5000 }).invoke('val', max).trigger('change',{force: true});
    }
    getProductPrices() {
        
      return this.webLocators.product_price(); 
    }
    verifyProductPrices(expected_min_price, expected_max_price){
      this.getProductPrices().each(($price) => {
              const price = parseInt($price.text().replace(/,/g, ''), 10);
              errorHandler.errorForNaN(price);
              expect(price).to.be.gte(expected_min_price);
              expect(price).to.be.lte(expected_max_price);
              })
      
    }

    selectBrand(brand) {
      this.webLocators.brand_checkbox().contains(brand).click();
      performAssert.elementVisibility(this.webLocators.main_container());
    }

    getEachProductBrandName() {
      return this.webLocators.product_list();
    } 

    verifyProductBrandFilter(brand){
       this.getEachProductBrandName().each(($product) => {
            const productText = $product.text().toLowerCase();
            expect(productText).to.include(brand.toLowerCase());
        });
    }
    getProductList() {
      return this.webLocators.products();

    }
    verifyProductName(product_name){
      performAssert.elementContainText(searchPage.getSearchPage(), product_name);
    }
    getSpecificProductPage(expected_product_name) {
      this.getProductList().each(($product) => {
                  const productText = $product.text().toLowerCase();            
                  if (productText.includes(expected_product_name)) {
                      cy.wrap($product).parent('a').invoke('removeAttr','target').click({timeout: 5000});
                      return false; 
                  }
              });
    }
    verifySpecificProductName(product_name){
      performAssert.elementVisibility(this.getSpecificProductTitle());
      performAssert.elementContainText(this.getSpecificProductTitle(), product_name);
    }

    getSpecificProductTitle() {
      return this.webLocators.product_title();
    }
    getSpecificProductPrice() {
      return this.webLocators.product_price();
    }
    verifySpecificProductPrice(expected_product_price){
      performAssert.elementVisibility(this.getSpecificProductPrice());
        this.getSpecificProductPrice().invoke('text').then(($price) => {
            const price = parseInt($price.replace(/,/g, ''), 10);
            expect(price).to.eq(expected_product_price);
        });
    }
    getProductListAsJson() {
      
      this.webLocators.products().each(($product, index) => {
        const productText = $product.text().trim();
        const productPrice = $product
            .siblings('span.a-price-whole') 
            .text()
            .replace(/,/g, '')
            .trim();
        
      // Add product data to the array
        products.push({
            id: index + 1, 
            name: productText,
            price: parseFloat(productPrice),
            currency: 'INR', 
            description: `Description for ${productText}`, 
        });
      }).then(() => {
        cy.writeFile('cypress/fixtures/products.json', products); // Write the array to a JSON file 
        cy.log('Product data written to products.json:', products); // Log the product data
        });
    }

    getSpecificProductPageDataAsJson() {
      const productText=this.webLocators.product_title()
            .text()
            .trim();
      const productPrice = this.webLocators.product_price() 
            .text()
            .replace(/,/g, '')
            .trim();
        
      // Add product data to the array
          productData.push({
            id: index + 1, 
            name: productText,
            price: parseFloat(productPrice),
            currency: 'INR', 
            description: `Description for ${productText}`, 
          })
          .then(() => {
        cy.writeFile('cypress/fixtures/productData.json', productData);  
        cy.log('Product data written to productData.json:', productData); // Log the product data
        });
    }
    getCartDataAsJson() {
      this.webLocators.product_title().invoke('text').then((productTitle) => {
        const productText = productTitle.trim();
        const productPrice = this.webLocators.product_price()
            .text()
            .replace(/,/g, '')
            .trim();
  
        cartData.push({
            id: index + 1, 
            name: productText,
            price: parseFloat(productPrice),
            currency: 'INR', 
            description: `Description for ${productText}`, 
        });
      }).then(() => {
        cy.writeFile('cypress/fixtures/cartData.json', cartData); 
        cy.log('Product data written to cartData.json:', cartData); // Log the product data
        });
    }
}

export default new searchPage();
