import LoginPage from "../support/pageObjects/loginPage";
import searchPage from "../support/pageObjects/searchPage";
import '../support/commands';

describe("Navigate to amazpn website and perform some action",()=>{
   let testData;
    before(() => {
        const { user_name, password } = Cypress.env();
        cy.loginInToApplication(user_name, password);
        cy.fixture('testData').then((data) => {
            testData = data;
          });
    })
    it("action performed for iphone 16 in the web page",() => {
    const expectedCartTitle = 'Shopping Cart';
    searchPage.searchProduct(testData.mobile);
    searchPage.addToCart();
    searchPage.goToCart();
    searchPage.verifyCartTitle(expectedCartTitle);
    searchPage.verifyProceedToPay();
    searchPage.clickContinueBtn();
    searchPage.verifyPaymentPage();
    })
})
