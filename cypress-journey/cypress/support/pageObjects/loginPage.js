import { LoginWebLocators } from "../locators/loginPagelocator";

class LoginPage {
  constructor() {
    this.locators = LoginWebLocators;
  }

  clickAccountList() {
    cy.get(this.locators.accountList).click();
  }

  enterUsername(user_name) {
    cy.get(this.locators.username).type(user_name);
  }

  clickProceed() {
    cy.get(this.locators.proceed).click();
  }

  enterPassword(password) {
    cy.get(this.locators.password).type(password);
  }

  clickSubmit() {
    cy.get(this.locators.submitBtn).should("be.visible").click();
  }
}

export default LoginPage;
