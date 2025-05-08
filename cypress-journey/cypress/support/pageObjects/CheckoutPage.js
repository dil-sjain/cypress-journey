import { verify } from "tweetnacl";

class CheckoutPage {
  // visit() {
  //   cy.visit('/checkout');
  proceedToCheckout() {
    cy.contains("Proceed to Checkout").click();
  }
    verifyProductDetails() {
      cy.get(".checkout-summary").should("contan","Product");
      cy.get(".total").should("exist");
    }
  
  fillAddress({ name,phoneNumber, zip,flat,street,Landmark, }) {
    cy.get('[id="address-ui-widgets-enterAddressFullName"]').type(name);
    cy.get('[id="address-ui-widgets-enterAddressPhoneNumber"]').type(phoneNumber);
    cy.get('[id="address-ui-widgets-enterAddressPostalCode"]').type(zip);
    cy.get('[id="address-ui-widgets-enterAddressLine1"]').type(flat)
    cy.get('[id="address-ui-widgets-enterAddressLine2"]').type(street)
    cy.get('[id="address-ui-widgets-landmark"]').type(Landmark)
    cy.get([id="checkout-primary-continue-button-id"]).click()
  }

  applyCoupon(code) {
    cy.get('[id="checkout-paymentOptionPanel"]').click()
    cy.get('[id="pp-6uuW1N-98"]').type(code)
    cy.get('[name="ppw-claimCodeApplyPressed"]').click();
  }

  validateFormErrors() {
    cy.get("#place-order").click();
    cy.get('.error').should('exist');
  }
}


const checkoutPage = new CheckoutPage();

export default checkoutPage