import "../support/commands";
import searchPage from "../support/pageObjects/searchPage";
import addToCartPage from "../support/pageObjects/addToCartPage";

describe("Amazon Test Suite", () => {
  let data;
  beforeEach(() => {
    cy.fixture("config").then(function (fixtureData) {
      data = fixtureData;
    });
    cy.loginInToApplication(Cypress.env("username"), Cypress.env("password"));
  });

  it("should visit the homepage", () => {
    cy.contains(data.pageTitle).should("be.visible");
  });

  it("search for product", () => {
    searchPage.searchProduct(data.productName1);
    searchPage.assertResultAndTitle(data.searchTitle);
    searchPage.selectProduct();
  });

  it("should add products to cart", () => {
    searchPage.searchProduct(data.invalidProduct);
    searchPage.invalidResultSearch();
    searchPage.clearSearchBox();
    searchPage.searchProduct(data.productName);
    addToCartPage.openAndAddtoCart();
  });

  it("should add products to cart perform cart count validation", () => {
    addToCartPage.getInitialCartCount().then((initialCount) => {
      // cart persisted acreoss session
      addToCartPage.cartPersistAcrossSession(initialCount);
      searchPage.searchProduct(data.productName2);
      addToCartPage.openAndAddtoCart();
      // cart count increased
      addToCartPage.confirmCartCountIncreased(initialCount);
      // checkout
      addToCartPage.proceedToCheckout();
      // verify total dynamically
      addToCartPage.getTotalFromCartItem().then((totalamount) => {
        addToCartPage.verifyTotalAmount(totalamount);
      });
      addToCartPage.clickProceedToBuy();
      //address verify
      addToCartPage.verifyAddress(data.address);
      // remove item from cart
      addToCartPage.removeItemFromCart();
      // save for later
      addToCartPage.saveForLater();
    });
  });
});
