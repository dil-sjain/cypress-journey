class LoginPage {

    clickAccountList(){
        cy.get('#nav-link-accountList').click();
    }

    enterEmail(email) {
      cy.get("input[type='email']").type(email);
    }
    clickProceed(){
        cy.get("input[class='a-button-input']").click()

    }
    enterPassword(password) {
        cy.get('#ap_password').type(password);
    }
    clickSubmit(){
        cy.get('#signInSubmit').should("be.visible").click();
    }
    
  }
  export default LoginPage;