import loginPage from "../support/pageObjects/LoginPage";
import productPage from "../support/pageObjects/ProductPage";
import cartPage from "../support/pageObjects/CartPage";
import checkoutPage from "../support/pageObjects/CheckoutPage";

describe("E-Commerce Cart & Checkout Flow", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/products", { fixture: "products.json" }).as("getProducts");
    cy.visit("/");
    //cy.login();
  });
  it("verify the login page", () => {
    cy.get()
  })

  it("Add to cart and validate checkout", () => {
    cy.fixture("products").then((products) => {
      products.forEach((product, index) => {
        productPage.selectProduct(product.name);
        productPage.addToCart();
        productPage.verifyCartCount(index + 1);
        cy.visit("/products");
      });
    });

    cartPage.goToCart();
    cartPage.updateQuantity(2);
    cartPage.saveForLater();
    cartPage.removeItem();

    checkoutPage.proceedToCheckout();
    checkoutPage.verifyProductDetails();
    checkoutPage.fillAddress();
    checkoutPage.applyCoupon("SAVE10");
    checkoutPage.validateForm();
  });

  it("Handles out-of-stock scenario", () => {
    cy.intercept("POST", "/api/cart", {
      statusCode: 400,
      body: { error: "Out of Stock" }
    }).as("addCart");

    productPage.selectProduct("Out of Stock Product");
    productPage.addToCart();
    cy.wait("@addCart");
    cy.contains("Out of Stock").should("exist");
  });

  it("Persists cart across sessions", () => {
    cy.addToCart("Laptop");
    cy.reload();
    cartPage.goToCart();
    cy.get(".cart-item").should("exist");
  });

  it("Mobile view responsive test", () => {
    cy.viewport("iphone-6");
    cy.visit("/");
    cy.get("#nav-menu").should("be.visible");
  });
});