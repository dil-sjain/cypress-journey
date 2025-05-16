import { time } from "console";

class searchPage {
    webLocators = {
      searchInput: () => cy.get('#twotabsearchtextbox'),
      searchButton: () => cy.get('#nav-search-submit-button'),
      products: () => cy.get('h2.a-size-medium'),
      
    };

    //actions
    searchProduct(productName) {
        this.webLocators.searchInput().type(productName);
        this.webLocators.searchButton().click();
    };
    searchInput() {
        return this.webLocators.searchInput();
    };
    searchButton() {
        return this.webLocators.searchButton();
    };
    getProductList() {
        return this.webLocators.products();
  
      }
  
}
export default new searchPage();
