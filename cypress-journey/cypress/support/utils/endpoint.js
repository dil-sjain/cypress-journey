
const BASE_URL = Cypress.env('BASE_URL');

export default class Endpoints {
    static getBaseUrl() {
        return BASE_URL;
    }
    static getSearchedProducts() {
        return `${BASE_URL}/products`;
    }   
    static getSelectedProduct() {
        return `${BASE_URL}/product/:productId`;
    }
    static getAddToCart() {
        return `${BASE_URL}/cart/add-to-cart`;
    }
    static getCart() {
        return `${BASE_URL}/gp/cart/`;
    }

    

    // static getProfileDetailSummary() {
    //   return 'cms/thirdparty/profileDetail/summary.sec';
    // }
    
}