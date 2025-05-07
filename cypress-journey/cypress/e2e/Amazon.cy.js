//reference types="cypress" />
///reference types="cypress-xpath" /> 
import loginPage from '../support/pageObjects/loginPage';
import searchPage from '../support/pageObjects/searchPage';
import '../support/commands';
import productData from '../fixtures/productData.json';

//const { username, password } = Cypress.env();
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
    it("action performed for iphone 16 in the web page",() => {
        // cy.log('username: ' + username)
        // cy.loginInToApplication(username, password);
    
        const productName = productData.productName;
        const expectedCartTitle = productData.expectedCartTitle;
        searchPage.searchProduct(productName);
        searchPage.addToCartButton();
        searchPage.goToCartButton();
        searchPage.shoppingCartTitle().should('be.visible');
        searchPage.shoppingCartTitle().should('have.text', expectedCartTitle);
        searchPage.proceedToPay();
        searchPage.continueBtn();
        // searchPage.paymentPage();
    })
})