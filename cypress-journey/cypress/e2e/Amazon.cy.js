//reference types="cypress" />
///reference types="cypress-xpath" /> 
import loginPage from '../support/pageObjects/loginPage';
import searchPage from '../support/pageObjects/searchPage';
import addToCartPage from '../support/pageObjects/addToCartPage';
import '../support/commands';
import productData from '../fixtures/productData.json';

describe("Amazon Login and Search", () => {
    let productData;

    before(() => {
       cy.fixture('productData').then((data) => {
            productData = data;
            cy.loginInToApplication(
                Cypress.env('username'),
                Cypress.env('password'),
            );

        });
    });
    it("action performed for Apple iPhone 15 (128 GB) - Green",() => {

        const productName = productData.productName;
        const expected_product_name = productName.toLowerCase();
        const expected_initial_count = productData.expected_initial_count;
        const expectedCartTitle = productData.expectedCartTitle;
        addToCartPage.makecartEmpty();
        searchPage.searchProduct(productName);
        addToCartPage.getcartCount().then((initialcount) => {
            cy.log('Initial cart count:', initialcount);
            expect(initialcount).to.equal(expected_initial_count); // Assert that the initial cart count is 0
        })
        searchPage.getProductList().each(($product) => {
            const productText = $product.text().toLowerCase();            
            if (productText.includes(expected_product_name)) {
                cy.wrap($product).parent('a').invoke('removeAttr','target').click({timeout: 5000});
                return false; 
            }
        });
        
        addToCartPage.addToCartOnProductPage();
        addToCartPage.getcartCount().then((Updatedcount) => {
            cy.log('Initial cart count:', Updatedcount);
            expect(Updatedcount).to.equal(expected_initial_count+1); // Assert that the initial cart count is 0
        })

        addToCartPage.goToCartButton();
        addToCartPage.shoppingCartTitle().should('be.visible');
        addToCartPage.shoppingCartTitle().should('have.text', expectedCartTitle);
        addToCartPage.proceedToPay();
    })

})