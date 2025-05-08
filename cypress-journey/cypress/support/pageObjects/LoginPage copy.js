import { url } from "inspector";

class LoginPage {
    visit() {
        cy.visit('/');
    }

    enterUsername(username) {
        cy.get('.nav-action-inner').click({force:true})
        cy.get('#ap_email_login').type(username);
        cy.get('input[type="submit"]').first()

    }

    enterPassword(password) {
        cy.get('#ap_password').type(password);
    }

    clickLogin() {
        cy.get('#login-button').click();
    }
    loginwithCreds(url,username, password) {
        this.visit(url);
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLogin();
    }
    assertLoginSuccess() {
        cy.url().should('include', '/dashboard');
        cy.contains('Welcome').should('be.visible');
    }
    assertLoginFailure() {
        cy.contains('Invalid credentials').should('be.visible');
    }
    submit(){
        cy.get("#signInSubmit").click()
    }
}

const login = new LoginPage();

export default login
