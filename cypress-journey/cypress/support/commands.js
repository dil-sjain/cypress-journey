import loginPage from "./pageObjects/loginPage";
//const loginPage = new loginPage();
Cypress.Commands.add("loginInToApplication", (username, password) => {
  cy.clearCookies();
  cy.log("Logging in", Cypress.env("BASE_URL"));
  cy.visit(Cypress.env("BASE_URL"), { timeout: 10000 });
  loginPage.clickOnAccountlink;
  loginPage.enterUsername(username);
  loginPage.clickOncontinueButton();
  loginPage.enterPassword(password);
  loginPage.clickOnLoginButton();
});


// import loginPage from "./pageObjects/loginPage1";
// import productPage from "./pageObjects/ProductPage";
// Cypress.Commands.add('LoginintoApplication', (username, password) => {
//   cy.visit('https://www.amazon.in');
//   cy.get('#nav-link-accountList').click();
//   cy.get('input[name="email"]').type(username);
//   cy.get('input#continue').click();
//   cy.get('input[name="password"]').type(password, { log: false });
//   cy.get('input#signInSubmit').click();
// });

// Cypress.Commands.add('loginInToApplication', (username, password) => {
//     cy.loginPage('Logging in', Cypress.env('https://www.amazon.in'));
//     cy.clearCookies();

//     cy.visit(Cypress.env('https://www.amazon.in'), { timeout: 10000 });

//        loginPage.enterUsername(username);
//     loginPage.enterPassword(password);
//     loginPage.clickOnLoginButton();
// });

//   Cypress.Commands.add("addToCart", (productName) => {
//     productPage.selectProduct(productName);
//     productPage.addToCart();
//   });