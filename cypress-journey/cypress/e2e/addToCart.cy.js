import searchPage from "../support/pageObjects/searchPage";
import "../support/commands";
import addCartPage from "../support/pageObjects/addToCartPage";
describe("Navigate to amazon website and perform some action", () => {
  let testData;
  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  beforeEach("logging into amazon", () => {
    const { userName, password } = Cypress.env();
    cy.loginInToApplication(userName, password);
  });
  it("cart item quantity update", () => {
    cy.intercept("POST", "**/com.amazon.csm.csa.prod", {
      statusCode: 200,
    }).as("prod");
    addCartPage.CartCountnew().then((initialCount) => {
      cy.log("Initial cart count: " + initialCount);
      searchPage.searchProduct(testData.headphone);
      cy.wait("@prod").its("response.statusCode").should("eq", 200);
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
