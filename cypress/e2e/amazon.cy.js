import LoginPage from "../pageObjectModel/loginPage";
import searchPage from "../pageObjectModel/searchPage";
describe("Navigate to amazpn website and perform some action",()=>{
    const loginPage = new LoginPage();

    beforeEach(() => {
        cy.fixture('loginCredentials').then((userData) => {
            const { email, password } = userData;
            cy.visit("https://www.amazon.in/")
            loginPage.clickAccountList();
            loginPage.enterEmail(email);
            loginPage.clickProceed();
            loginPage.enterPassword(password);
            loginPage.clickSubmit();
       });
    })
    it("action performed for iphone 16 in the web page",() => {
    const productName = 'iphone 16';
    const expectedCartTitle = 'Shopping Cart';
    searchPage.searchProduct(productName);
    searchPage.addToCart();
    searchPage.goToCart();
    searchPage.verifyCartTitle(expectedCartTitle);
    })
})
