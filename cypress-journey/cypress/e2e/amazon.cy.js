import AddToCart from "../support/pageObjects/addToCartPage";
import '../support/commands';
import searchPage from "../support/pageObjects/searchPage";
import CartPage from "../support/pageObjects/validateCart";

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
        cy.intercept('POST', '**/com.amazon.csm.csa.prod', {
            statusCode: 200,
            body: {
                results: [
                    { name: 'Sony PlayStation5 Gaming Console (Slim)', price: '₹49,990' }
                ],
            },
        }).as('searchAPI');
        searchpage.searchProduct(this.data.product);
        cy.wait('@searchAPI').its('response.statusCode').should('eq', 200);
        addtocart.openAndAddtoCart();
    });

    it('Search results are same irrespective of case sensitivity', function () {
        cy.intercept('POST', '**/com.amazon.csm.csa.prod', {
            statusCode: 200,
            body: {
                results: [
                    { name: 'Sony PlayStation5 Gaming Console (Slim)', price: '₹49,990' },
                ],
            },
        }).as('searchAPI');

        searchpage.searchProduct(this.data.product);

        cy.wait('@searchAPI').its('response.statusCode').should('eq', 200);

        searchpage.searchCapsOfAndCapsOn();
    });

    it('cart validation - check cart count increases', function () {
        cy.intercept('POST', '**/https://unagi-eu.amazon.com/1/events/com.amazon.csm.nexusclient.prod', {
            statusCode: 200,
            body: { cartCount: 2 },
        }).as('cartAPI');

        cartpage.getInitialCartCount().then((initialCount) => {
            searchpage.searchProduct(this.data.watch);
            cy.wait('@cartAPI').its('response.statusCode').should('eq', 200);
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
        searchpage.searchProduct(this.data.invalidkeyword);
        addtocart.invalidResultSearch();
    });

    it("multiItems checkout", function () {
        searchpage.searchProduct(this.data.multiItems);
        searchpage.clickonsearch();
        searchpage.selectbrand();
        searchpage.addmultipleitem();
    });
});