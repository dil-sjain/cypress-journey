import addToCartPage from "../support/pageObjects/addToCartPage";
import searchPage from "../support/pageObjects/searchPage";
import loginPage from "../support/pageObjects/loginPage";
import cartValidation from "../support/pageObjects/cartvalidations";
import "../support/commands";
let data;
const addToCart = new addToCartPage();
const search = new searchPage();
const loginpage = new loginPage();
const cartvalidation = new cartValidation();

before(() => {
  cy.fixture("example").then((loadedData) => {
    data = loadedData;
  });
  
});

beforeEach(() => {
  

  cy.loginInToApplication(data.username, Cypress.env("password"));
});

describe("Open Amazon", () => {
  it("verify the user and title ", () => {
    cy.title().should("include", "Amazon");
    //cartvalidation.getInitialCartCount();
    loginpage.verifyuser(data.verifyusername);
  });

  it("should show Samsung S25 Ultra as the first product", function () {
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
    cartvalidation.getInitialCartCount().then((initialCount) => {
      search.findproduct(data.charger);
      search.SelectSuggestedProduct();

      addToCart.addcharger();

      cartvalidation.confirmCartCountIncreased(initialCount);

     
   });
  });
  it("cart validation", () => {
     cartvalidation.gotoCart();
     cartvalidation.verifyCartProduct();
     cartvalidation.verifyCartProduct2();
     cartvalidation.clickonCheckout();
     cartvalidation.verifyAddress(data.address);
     cartvalidation.removeItemFromCart();
     cartvalidation.saveForLater();
  });

  it("multiItems checkout", function(){
     
    search.findproduct(data.multiItems);
    search.clickonsearch();
    search.selectbrand();
    search.addmultipleitem();
  })
});
