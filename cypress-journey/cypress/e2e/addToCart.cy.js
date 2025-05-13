import LoginPage from "../support/pageObjects/loginPage";
import searchPage from "../support/pageObjects/searchPage";
import "../support/commands";
import addCartPage from "../support/pageObjects/addToCartPage";
import testData from '../fixtures/testData.json';
describe("Navigate to amazon website and perform some action", () => {
  beforeEach(() => {
    cy.log(' Logging into Amazon and loading test data'); 
    const { user_name, password } = Cypress.env();
    cy.loginInToApplication(user_name, password);
  });
  it("cart item quantity update", () => {
    cy.intercept(
      'POST','**/com.amazon.csm.csa.prod',{
      statusCode : 200,
    }).as('prod')
    addCartPage.CartCountnew().then((initialCount) => {
      cy.log("Initial cart count: " + initialCount);
      searchPage.searchProduct(testData.headphone);
      cy.wait('@prod').its('response.statusCode').should('eq', 200);
      searchPage.addToCart();
      cy.wait(4000);
      cy.wrap(null).then(() => {
        addCartPage.CartCountnew().should((newCount) => {
          expect(newCount).to.equal(initialCount + 1);
        });
      });
    });
    searchPage.searchProduct(testData.mobile);
    searchPage.addToCart();
    searchPage.goToCart();
    searchPage.validateProdDetails();
    searchPage.assertCartTotalNotZero();
    searchPage.saveForLaterAction();
    searchPage.verifyProceedToPay();
    addCartPage.validateAddress();
  });
});
