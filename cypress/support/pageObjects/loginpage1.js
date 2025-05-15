import { get } from "http";

class loginpage1 {
  webLocators = {
    getContinuebtn: () => cy.get("input[class='a-button-input']"),
    getEmailtextbx: () => cy.get("input[id='ap_email_login']"),
    getPasswordtextbx: () => cy.get("input[id='ap_password']"),
    getSignInBtn: () => cy.get("input[id='signInSubmit']"),
    getErrorMessage: () => cy.contains("h4", "There was a problem"),
    getpasswordIncorrectErrorMsg: () =>
      cy.contains("div", "password is incorrect"),
    getConditionslink: () => cy.contains("a", "Conditions of Use"),
    getPrivacyandtermslink: () => cy.contains("a", "Privacy Notice"),
    getCaptchaHeadingTxt: () => cy.get("#aacb-captcha-header"),
  };

  //Actions

  enterUsernameandpass(username, password) {
    this.webLocators.getEmailtextbx().should("be.visible").type(username);
    this.webLocators.getContinuebtn().should("be.visible").click();
    this.webLocators.getPasswordtextbx().should("be.visible").type(password);
    this.webLocators.getSignInBtn().should("be.visible").click();
  }

  validateErrormsgforWrongpass(expectedErrormsg) {
    this.webLocators.getErrorMessage().should("contain", expectedErrormsg);
    cy.log("Unable to Login");
  }

  validateTermsAndCOnditions() {
    this.webLocators.getConditionslink().click();
    cy.url().should("include", "condition_of_use");
    cy.log("Conditions Of Use page is Displayed :");
    cy.go("back");
    this.webLocators.getPrivacyandtermslink().click();
    cy.url().should("include", "privacy_notice");
    cy.go("back");
  }
}

export default new loginpage1();
