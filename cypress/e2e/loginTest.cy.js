import loginPage from "../pages/LoginPage";
import homePage from "../pages/HomePage";

describe("Amazon Login Tests - Data Driven", () => {
  beforeEach(() => {
    homePage.visitHomePage();
  });

  it("Should fail login with invalid credentials", () => {
    cy.fixture("loginData").then((data) => {
      loginPage.login(data.invalidCred.email, data.invalidCred.password);
      loginPage.validateErrorMessage("There was a problem");
    });
  });

  it("Should login successfully with valid credentials", () => {
    cy.fixture("loginData").then((data) => {
      homePage.clickSignIn();
      loginPage.enterEmail(data.validCred.email);
      loginPage.enterPassword(data.validCred.password);

      // Validate successful login
      cy.get("#nav-link-accountList-nav-line-1").should(
        "contain.text",
        "Hello"
      );
    });
  });

  it("Should ask to register when user is not registerd", () => {
    cy.fixture("loginData").then((data) => {
      homePage.clickSignIn();
      loginPage.enterEmail(data.unregisterdUser.email);
      loginPage.validateAskToRegisterMessage(
        "Looks like you are new to Amazon"
      );
    });
  });
});
