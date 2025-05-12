class checkOutPage {
  webLocators = {
    getAddNewAddressBtn: () =>
      cy.get("#add-new-address-non-mobile-tango-sasp-zero-address"),
    getAddNewAddressBtn1: () =>
      cy.get("#add-new-address-desktop-sasp-tango-link"),
    getDeliverToThisAddressBtn: () => cy.get(".a-button-input"),
    getFullNameTxb: () => cy.get("#address-ui-widgets-enterAddressFullName"),
    getMobileNumberTxb: () =>
      cy.get("#address-ui-widgets-enterAddressPhoneNumber"),
    getPincodeTxb: () => cy.get("#address-ui-widgets-enterAddressPostalCode"),
    getHouseNameTxb: () => cy.get("#address-ui-widgets-enterAddressLine1"),
    getAreaNameTxb: () =>
      cy.get("input[name='address-ui-widgets-enterAddressLine2']"),
    getLandMarkNameTxb: () =>
      cy.get("input[name='address-ui-widgets-landmark']"),
    getTownNameTxb: () => cy.get("#address-ui-widgets-enterAddressCity"),
    getStateNameTxb: () =>
      cy.get("#address-ui-widgets-enterAddressStateOrRegion"),
    getStateDropDownSelectbtn: () =>
      cy.get("#address-ui-widgets-enterAddressStateOrRegion-dropdown-nativeId"),
    getUseThisAddressbtn: () => cy.contains("span", "Use this address"),
    getDeliverToThisAddressbtn: () =>
      cy.contains("span", "Deliver to this address"),
    getAddressChangeBtn: () => cy.contains("a", "Change"),
    getAddNewAddressBtn: () => cy.contains("a", "Add a new deliver"),
    getCountryDropDownSelectbtn: () =>
      cy.get("#address-ui-widgets-countryCode-dropdown-nativeId"),
    getErrorMessage: () => cy.contains("div", "Please enter"),
    getEnterCodeTbx: () => cy.get('input[placeholder="Enter Code"]'),
    getApplyBtn: () => cy.get('input[name="ppw-claimCodeApplyPressed"]'),
    getSkipForNowRadioBtn: () => cy.get("#kyc-xborder-radio-skip"),
    getContinueBtn: () =>
      cy.get('input[aria-labelledby="kyc-xborder-continue-button-announce"]'),
  };

  couponCodeVallidation(couponCode) {
    this.webLocators.getSkipForNowRadioBtn().should("exist");
    this.webLocators.getSkipForNowRadioBtn().check({ force: true });
    this.webLocators.getContinueBtn().should("be.visible");
    cy.scrollTo(0, 1000);
    this.webLocators.getContinueBtn().click({ force: true });
    this.webLocators.getEnterCodeTbx().should("be.visible");
    this.webLocators.getEnterCodeTbx().should("be.visible").type(couponCode);
    this.webLocators.getApplyBtn().should("be.visible").click();
    cy.contains("The promotional code you entered is not valid").should(
      "exist"
    );
  }

  fillingTheAddressDetails() {
    cy.wait(3000);
    this.webLocators
      .getPincodeTxb()
      .should("exist")
      .type(Cypress.env("pincode"));
    this.webLocators.getHouseNameTxb().type(Cypress.env("houseName"));
    this.webLocators
      .getAreaNameTxb()
      .should("exist")
      .type(Cypress.env("areaName"));
    this.webLocators.getTownNameTxb().type(Cypress.env("townName"));
    this.webLocators
      .getStateNameTxb()
      .should("exist")
      .type(Cypress.env("stateName"));
    this.webLocators
      .getUseThisAddressbtn()
      .should("exist")
      .click({ force: true });
    this.webLocators.getContinueBtn().should("be.disabled");
  }

  ErrorMessageCheckOnFOrm() {
    this.webLocators.getAddressChangeBtn().should("exist").click();
    this.webLocators.getAddNewAddressBtn().should("be.visible").click();
    this.webLocators
      .getCountryDropDownSelectbtn()
      .should("exist")
      .select("IN", { force: true })
      .should("have.value", "IN");
    cy.wait(2000);
    cy.getRandomNumber().then((random) => {
      this.webLocators.getFullNameTxb().type(Cypress.env("fullname") + random);
      this.webLocators.getMobileNumberTxb().type(Cypress.env("phone") + random);
    });
    this.webLocators
      .getUseThisAddressbtn()
      .should("exist")
      .click({ force: true });
    this.webLocators.getErrorMessage().should("exist");
  }
}

export default new checkOutPage();
