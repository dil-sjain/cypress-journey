import AddToCart from "../pageobject/shop";

describe('amazon shopping cart', () => {
    const addtocart = new AddToCart();

    beforeEach(function () {
        cy.fixture('example').then((data) => {
            this.data = data;
        });

        cy.visit(Cypress.env("url"));
        const username = Cypress.env("username");
        const password = Cypress.env("password");
        addtocart.login(username, password);
    });

    it('Login to amazon account', () => {
        cy.get('#nav-logo-sprites').should('be.visible');
    });
    it('add to cart', function () {
        addtocart.searchProduct(this.data.product);
        addtocart.openAndAddtoCart();
    });

    it('Search results are same irrespective of case sensitivity', function () {
        addtocart.searchProduct(this.data.product1);
        addtocart.searchCapsOfAndCapsOn();
    });
    it('invalid result search', function () {
        const invalidKeyword = Cypress.env("invalidKeyword");
        addtocart.searchProduct(invalidKeyword);
        addtocart.invalidResultSearch();
    });
});