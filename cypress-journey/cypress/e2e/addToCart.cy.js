import LoginPage from "../support/pageObjects/loginPage";
import searchPage from "../support/pageObjects/searchPage";
import "../support/commands";
import addCartPage from "../support/pageObjects/addToCartPage";

describe("Navigate to amazon website and perform some action", () => {
  let testData;
  beforeEach(() => {
    const { user_name, password } = Cypress.env();
    cy.loginInToApplication(user_name, password);
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });
  it("cart item quantity update", () => {
    addCartPage.CartCountnew().then((initialCount) => {
      cy.log("Initial cart count: " + initialCount);
      searchPage.searchProduct(testData.mobile);
      searchPage.addToCart();
      cy.wait(4000);
      cy.wrap(null).then(() => {
        addCartPage.CartCountnew().should((newCount) => {
          expect(newCount).to.equal(initialCount + 1);
        });
      });
    });
    searchPage.searchProduct(testData.headphone);
    searchPage.addToCart();
    searchPage.goToCart();
    searchPage.validateProdDetails();
    searchPage.validateAmount();
    searchPage.saveForLaterAction();
    searchPage.verifyProceedToPay();
    addCartPage.validateAddress();
  });
});
