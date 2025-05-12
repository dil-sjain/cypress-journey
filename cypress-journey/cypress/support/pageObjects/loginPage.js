class LoginPage {
  webLocators = {
    accountList: () => cy.get("#nav-link-accountList"),
    username: () => cy.get("input[type='email']"),
    password: () => cy.get("#ap_password"),
    proceed: () => cy.get("input[class='a-button-input']"),
    submitBtn: () => cy.get("#signInSubmit"),
  };

  clickAccountList = () => {
    this.webLocators.accountList().click();
  };

  enterUsername = (user_name) => {
    this.webLocators.username().type(user_name);
  };
  clickProceed = () => {
    this.webLocators.proceed().click();
  };
  enterPassword = (password) => {
    this.webLocators.password().type(password);
  };
  clickSubmit = () => {
    this.webLocators.submitBtn().should("be.visible").click();
  };
}
export default LoginPage;
