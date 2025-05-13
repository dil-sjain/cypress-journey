import LoginPage from "../support/pageObjects/loginPage";
import searchPage from "../support/pageObjects/searchPage";
import '../support/commands';
import { cartConst } from "../support/const/constants";
import testData from '../fixtures/testData.json';
describe("Navigate to amazpn website and perform some action",()=>{
    before(() => {
        cy.log(' Logging into Amazon and loading test data'); 
        const { user_name, password } = Cypress.env();
        cy.loginInToApplication(user_name, password);  
    })
    it("action performed for iphone 16 in the web page",() => {
    searchPage.searchProduct(testData.headphone);
    searchPage.addToCart();
    searchPage.goToCart();
    searchPage.verifyCartTitle(cartConst.expectedCartTitle);
    searchPage.verifyProceedToPay();
    searchPage.clickContinueBtn();
    searchPage.verifyPaymentPage();
    })
})
