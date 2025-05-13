import actionHelper from "../utils/actionHelper";
const performAction = actionHelper;
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
    setPriceRange(min, max) {
      this.webLocators.slider_min({ timeout: 5000 }).invoke('val', min).trigger('change',{force: true});
      this.webLocators.slider_max({ timeout: 5000 }).invoke('val', max).trigger('change',{force: true});
    }
    getProductPrices() {
        
      return this.webLocators.product_price(); 
    }

    selectBrand(brand) {
      this.webLocators.brand_checkbox().contains(brand).click();
    }

    getEachProductBrandName() {
      return this.webLocators.product_list();
    } 
    getProductList() {
      return this.webLocators.products();

    }
    getSpecificProductPage(product_name) {
      this.webLocators.products().each(($product) => {
        const productText = $product.text().trim();
        if (productText.includes(product_name)) {
            cy.wrap($product).parent('a').invoke('removeAttr','target').click({timeout: 5000});
            return false;
        }
      });
    }

    getSpecificProductTitle() {
      return this.webLocators.product_title();
    }
    getSpecificProductPrice() {
      return this.webLocators.product_price();
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
