import searchPage from "../support/pageObjects/searchPage";
import homePage from "../support/pageObjects/homePage";
import loginPage from "../support/pageObjects/loginPage";
import addToCartPage from "../support/pageObjects/addToCartPage";
import "../support/commands";

describe("Amazon Search Page Tests", () => {
  const itemCountToBeAddedToCart = 2;
  beforeEach(() => {
    homePage.visitHomePage();
  });

  it("Should search for valid products", () => {
    cy.fixture("searchData").then((data) => {
      data.validSearches.forEach((keyword) => {
        searchPage.searchForItem(keyword);
        searchPage.validateFirstResultsContain(keyword);
      });
    });
  });

  it("Should show no results for invalid products", () => {
    cy.fixture("searchData").then((data) => {
      data.invalidSearches.forEach((keyword) => {
        searchPage.searchForItem(keyword);
        searchPage.validateResultsNotContain(keyword);
      });
    });
  });

  it("Should handle empty search gracefully", () => {
    cy.fixture("searchData").then((data) => {
      searchPage.searchForItem(data.emptySearch);
      searchPage.validateSearchBoxIsEmpty();
    });
  });

  it("Search a product , add to cart ,proceed to checkout,login , validate delivery address and validate amount", () => {
    cy.fixture("laptopSearchData").then((data) => {
      data.laptopSearches.forEach((searchItem) => {
        searchPage.searchForItem(searchItem.searchKeyword);
        cy.customWait(5);
        homePage.selectSortBy("Best Sellers");
        cy.customWait(2);
        Object.entries(searchItem.filters).forEach(
          ([filterCategory, filterValue]) => {
            searchPage.selectFilter(filterCategory, filterValue);
          }
        );
        searchPage.validateResultsContain(searchItem.expectedResultContains);
        cy.customWait(2);
        searchPage.fetchAndSaveSearchedItems(); //save the searched
        cy.customWait(2);
        searchPage.addProductsToCart(itemCountToBeAddedToCart);
        cy.customWait(2);
        addToCartPage.openCartPage();
        cy.customWait(5);
        addToCartPage.validateCartItems(itemCountToBeAddedToCart);
        cy.customWait(2);
        addToCartPage.deleteCartItemByIndex(0);
        cy.customWait(2);
        addToCartPage.validateCartItemCount(itemCountToBeAddedToCart - 1);
        cy.customWait(2);
        addToCartPage.getCartTotalPrice();
        cy.customWait(2);
        addToCartPage.proceedToCheckout();
        cy.customWait(2);
        loginPage.enterUsername(Cypress.env("mobileNum"));
        cy.customWait(2);
        loginPage.clickOnContinueButton();
        cy.customWait(2);
        loginPage.enterPassword(Cypress.env("password"));
        cy.customWait(2);
        loginPage.clickOnLoginButton();
        cy.customWait(2);
        addToCartPage.validateDeliveryAddressFields();
        cy.customWait(2);
        addToCartPage.validateTotalAmount(); // Pass cartTotalPrice

        cy.customWait(2);
        addToCartPage.openCartPage();
        cy.customWait(2);
        addToCartPage.deleteCartItemByIndex(0);
        cy.customWait(2);
        addToCartPage.validateCartItemCount(0);
        cy.customWait(2);
        homePage.logoutFromAmazon();
      });
    });
  });
});
