import searchPage from "../support/pageObjects/searchPage";
import homePage from "../support/pageObjects/homePage";

describe("Amazon Search Page Tests", () => {
  beforeEach(() => {
    homePage.visitHomePage();
  });

  it("Should search for valid products", () => {
    cy.fixture("searchData").then((data) => {
      data.validSearches.forEach((keyword) => {
        searchPage.searchForItem(keyword);
        searchPage.validateResultsContain(keyword);
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
});
