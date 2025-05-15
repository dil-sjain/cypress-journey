import AddToCart from "../support/pageObjects/addToCartPage";
import '../support/commands';
import searchPage from "../support/pageObjects/searchPage";
import CartPage from "../support/pageObjects/validateCart";
import { interceptSearchAPI, interceptCartAPI, interceptInvalidSearchAPI } from "../support/endpoint";
import { waitForAPI } from "../support/utils";

describe('amazon shopping cart', () => {
    const addtocart = new AddToCart();
    const searchpage = new searchPage();
    const cartpage = new CartPage();

    beforeEach(function () {
        cy.fixture('search').then((data) => {
            this.data = data;
        });
        cy.clearAllCookies();
        cy.clearLocalStorage();
        cy.session('userSession', () => {
            cy.loginInToApplication(Cypress.env('uname'), Cypress.env('password'));
        });
        cy.visit('https://www.amazon.in');
        cy.get('.nav-search-field input', { timeout: 10000 }).should('be.visible');
    });

    it('search product and add to cart with intercept', function () {
        interceptSearchAPI();
        searchpage.searchProduct(this.data.product);
        waitForAPI('@searchAPI');
        addtocart.openAndAddtoCart();
    });

    it('Search results are same irrespective of case sensitivity', function () {
        interceptSearchAPI();
        searchpage.searchProduct(this.data.product);
        cy.wait('@searchAPI').its('response.statusCode').should('eq', 200);
        searchpage.searchCapsOfAndCapsOn();
    });

    it('cart validation - check cart count increases', function () {
        interceptCartAPI();
        cartpage.getInitialCartCount().then((initialCount) => {
            searchpage.searchProduct(this.data.watch);
            waitForAPI('@cartAPI');
            addtocart.openWatchAndAddtoCart();
            cartpage.confirmNoCoverage();
            cartpage.confirmCartCountIncreased(initialCount);
            cartpage.proceedToCheckout();
            cartpage.verifyAddress(this.data.address);
            cartpage.verifyTotalAmount(this.data.totalamount);
            cartpage.removeItemFromCart();
            cartpage.saveForLater();
        });
    });

    it('invalid result search', function () {
        interceptInvalidSearchAPI();
        searchpage.searchProduct(this.data.invalidkeyword);
        waitForAPI('@invalidSearchAPI');
        addtocart.invalidResultSearch();
    });

    it("multiItems checkout", function () {
        searchpage.searchProduct(this.data.multiItems);
        searchpage.clickonsearch();
        searchpage.selectbrand();
        searchpage.addmultipleitem();
    });
});