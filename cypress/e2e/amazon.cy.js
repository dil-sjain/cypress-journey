import LoginPage from "../support/Pages/LoginPage";
import SearchPage from "../support/Pages/SearchPage";

let data, loginPage, searchPage;
describe("Amazon Test Suite", () => {
  before(() => {
    cy.fixture("config").then(function (fixtureData) {
      data = fixtureData;
      loginPage = new LoginPage();
      searchPage = new SearchPage();
    });
  });
  beforeEach(() => {
    cy.intercept("POST", "/your/captcha/endpoint", (req) => {
      req.reply({ captchaPassed: true });
    });
    cy.clearCookies();
    loginPage.goTo(data.url);
    loginPage.login(data.username, data.password);
  });
  it("Login Page", () => {
    cy.contains("Hello, Simran").should("be.visible");
  });

  it.only("search for product", () => {
    searchPage.searchProduct(data.productName);
    searchPage.assertResultAndTitle(data.searchTitle);
    searchPage.selectProduct();
  });
});
