class LoginPage {
  goTo(url) {
    cy.visit(url);
  }
  login(phoneNumber, password) {
    cy.get("#nav-link-accountList").click();
    cy.get("#ap_email_login").type(phoneNumber);
    cy.get("#continue").click();
    cy.get("#ap_password").type(password);
    cy.get("#signInSubmit").click();
  }
}
export default LoginPage;
