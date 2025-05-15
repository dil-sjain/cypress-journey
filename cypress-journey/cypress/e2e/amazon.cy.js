import Login from "../pageObjects/loginPage.js"
import addToCartPage from "../support/pageObjects/addToCartPage.js";
import searchPage from "../support/pageObjects/searchPage.js";
describe('Amazon end to end functionality', () => {
    let userdata;
    before( () => {
        cy.fixture("example").then((data) => {
            userdata = data;
        })
    
    })

    it("LoginFunctionality", () => {
        const ln=new Login();
         cy.visit("https://www.amazon.com")
         ln.clickOnSignInButton(signinButton)
         ln.enterUsername(userdata.username)
         ln.clickOnContinueButton(continueButton)
         ln.enterPassword(userdata.password)
         ln.clickOnLoginButton(loginButton)
        
        
})
    it("SearchFunctionality", () => {
        const search=new searchPage();
        search.clickOnSearchButton(userdata.productName)
        search.clickOnSearchButton(searchButton)
        
        
       })

       it("AddToCartFunctionality", () => {
        const cart=new addToCartPagePage();
        cart.clickOnCartButton(goToCartButton)
        cart.clickOnGoToCartButton(goToCartButton)
        
        
        
       })
    
})