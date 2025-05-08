import AddToCart from "../support/pageObjects/addToCartPage";
import '../support/commands';
import searchPage from "../support/pageObjects/searchPage";
import CartPage from "../support/pageObjects/validateCart";

describe('amazon shopping cart', () => {
    const addtocart = new AddToCart();
    const searchpage = new searchPage();
    const cartpage = new CartPage();

    before(function () {
        cy.fixture('search').then((data) => {
            this.data = data;
        });
    });

    beforeEach(function () {
        cy.clearCookies();
        cy.loginInToApplication(Cypress.env('username'), Cypress.env('password'));
    });


    it('search product and add to cart', function () {
        searchpage.searchProduct(this.data.product1);
        addtocart.openAndAddtoCart();
    });
    it('Search results are same irrespective of case sensitivity', function () {
        searchpage.searchProduct(this.data.product1);
        searchpage.searchCapsOfAndCapsOn();
    });
    it('cart validation - check cart count increases', function () {
        cartpage.getInitialCartCount().then((initialCount) => {
            searchpage.searchProduct(this.data.watch);
            addtocart.openWatchAndAddtoCart();
            cartpage.confirmNoCoverage();
            cartpage.confirmCartCountIncreased(initialCount);
            cartpage.proceedToCheckout();
            cartpage.verifyAddress(this.data.address);
            cartpage.verifyTotalAmount(this.data.totalamount);
            cartpage.removeItemFromCart()
            cartpage.saveForLater()

        });
    });
    it('invalid result search', function () {
        const invalidKeyword = Cypress.env("invalidKeyword");
        searchpage.searchProduct(invalidKeyword);
        addtocart.invalidResultSearch();
    });

});