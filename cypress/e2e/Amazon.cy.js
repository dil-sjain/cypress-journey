///reference types="cypress" /> 
import LoginPage from '../PageObjectModel/LoginPage';
import searchPage from '../PageObjectModel/SearchPage';


describe("Amazon Login and Search", () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        cy.fixture('loginCredentials').then((userData) => {
            const { mobile, password } = userData;
            cy.visit('https://www.amazon.in');
            loginPage.clickAccountList();
            loginPage.enterMobile(mobile);
            loginPage.clickContinue();
            loginPage.enterPassword(password);
            loginPage.clickSignIn();
       });
    })
    it("action performed for iphone 16 in the web page",() => {
    const productName = 'iphone 16';
    const expectedCartTitle = 'Shopping Cart';
    searchPage.searchProduct(productName);
    searchPage.addToCart();
    searchPage.goToCart();
    searchPage.verifyCartTitle(expectedCartTitle);
    searchPage.verifyProceedToPay();
    searchPage.clickContinueBtn();
    searchPage.verifyPaymentPage();
    })
})
