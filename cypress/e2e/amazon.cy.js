import LoginPage from "../support/Pages/LoginPage";
import SearchPage from "../support/Pages/SearchPage";
import CartPage from "../support/Pages/CartPage";

let data, loginPage, searchPage, cartPage;
describe("Amazon Test Suite", () => {
  before(() => {
    cy.fixture("config").then(function (fixtureData) {
      data = fixtureData;
      loginPage = new LoginPage();
      searchPage = new SearchPage();
      cartPage = new CartPage();
    });
  });
  beforeEach(() => {
    cy.intercept("POST", "/your/captcha/endpoint", (req) => {
      req.reply({ captchaPassed: true });
    });
    cy.clearCookies();
    loginPage.goTo(data.url);
    loginPage.login(Cypress.env("username"), Cypress.env("password"));
  });
  it("Login Page", () => {
    cy.contains("Hello, Simran").should("be.visible");
  });

  it.only("search for product", () => {
    searchPage.searchProduct(data.productName);
    searchPage.assertResultAndTitle(data.searchTitle);
    searchPage.selectProduct();
    cartPage.addOfferings();
    cartPage.addToCart();

  });
});
