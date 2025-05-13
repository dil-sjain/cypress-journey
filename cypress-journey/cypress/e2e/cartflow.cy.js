import addToCartPage from "../support/pageObjects/addToCartPage";
import searchPage from "../support/pageObjects/searchPage";
import loginPage from "../support/pageObjects/loginPage";
import validationPage from "../support/pageObjects/validationPage";
import "../support/commands";
//import validationPage from "../support/pageObjects/validationPage";
let data;
const addToCart = new addToCartPage();
const search = new searchPage();
const login = new loginPage();
const validation = new validationPage();

before(() => {
  cy.fixture("example").then((loadedData) => {
    data = loadedData;
  });
});

// beforeEach(() => {
//   cy.session("userSession", () => {
//     cy.loginInToApplication(Cypress.env("uname"), Cypress.env("password"));
//   });
//   cy.visit(Cypress.env("BASE_URL"));
//   cy.get(".nav-search-field input", { timeout: 10000 }).should("be.visible");
// });

describe("Open Amazon", () => {
  it("verify the user and title ", () => {
    cy.title().should("include", "Amazon");
    login.verifyuser(data.verifyusername);
  });

  it("should show Samsung S25 Ultra as the first product", function () {
    cy.intercept(
      {
        method: "POST",
        url: "**/https://unagi.amazon.in/1/events/com.amazon.csm.csa.prod",
      },
      {
        statusCode: 200,
        body: { productName: data.product },
      }
    ).as("searchAPI");
    cy.wait("@searchAPI").its("response.statusCode").should("eq", 200);
    search.findproduct(data.product);
    search.SelectSuggestedProduct();
    search.verifypage(data.product);
  });

  it("should navigate back to search results after viewing a product", function () {
    search.findproduct(data.product);
    search.SelectSuggestedProduct();
    search.selectItem(data.product);

    cy.go("back");
    search.verifypage(data.product);
  });

  it("should select the product  and add to the cart", function () {
    search.findproduct(data.product);
    search.SelectSuggestedProduct();
    addToCart.addToCart();
  });

  it("should search a charger and add to the cart ", function () {
    validation.getInitialCartCount().then((initialCount) => {
      search.findproduct(data.charger);
      search.SelectSuggestedProduct();

      addToCart.addcharger();

      validation.confirmCartCountIncreased(initialCount);
    });
  });
  it("cart validation", () => {
    validation.gotoCart();

    cy.intercept(
      "POST",
      "**/https://unagi-eu.amazon.com/1/events/com.amazon.csm.nexusclient.prod",
      {
        statusCode: 200,

      }
    ).as("cartAPI");
    cy.wait("@cartAPI").its("response.statusCode").should("eq", 200);

    validation.verifyCartProduct();
    validation.verifyCartProduct2();
    validation.clickonCheckout();
    validation.verifyAddress(data.address);
    validation.removeItemFromCart();
    validation.saveForLater();
  });

  it("multiItems checkout", function () {
    search.findproduct(data.multiItems);
    search.clickonsearch();
    search.selectbrand();
    search.addmultipleitem();
  });
});