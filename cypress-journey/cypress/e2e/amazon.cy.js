import LoginPage from "../support/pageObjects/loginPage";
import searchPage from "../support/pageObjects/searchPage";
import "../support/commands";
import { cartConst } from "../support/const/constants";
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
  it("action performed for iphone 16 in the web page", () => {
    searchPage.searchProduct(testData.headphone);
    searchPage.addToCart();
    searchPage.goToCart();
    searchPage.verifyCartTitle(cartConst.expectedCartTitle);
    searchPage.verifyProceedToPay();
    searchPage.clickContinueBtn();
    searchPage.verifyPaymentPage();
  });
});
