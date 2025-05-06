import Homepage from "../../support/Pages/Homepage";
import SearchProduct from "../../support/Pages/SearchProduct";

let data;
const homepage = new Homepage();
const search = new SearchProduct();
before(() => {
  
  cy.fixture("example").then((loadedData) => {
    data = loadedData;
  });
});

beforeEach(() => {
  cy.visit(Cypress.env("amazonUrl"));

  // const url= cypress.env('amazonUrl');
  // cy.visit()
  homepage.Login(data.username, data.password);
});

describe("Open Amazon", () => {
  it("verify the user and title ", () => {
    cy.title().should("include", "Amazon");
    homepage.verifyuser(data.verifyusername);
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

  
  it("should search and select the product ", function () {
    search.findproduct(data.product);
    search.SelectSuggestedProduct();

    search.selectItem(data.product); 
    search.selectSpecs();
    search.verifyMemorySize(data.memorysize);
   search.AddSetUpService();

    search.addToCart();
  });

  // it("should select the delivery day and Memory of the device", function(){

  // })
});
