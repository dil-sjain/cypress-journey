class LoginPage{
    clickAccountList(){ 
        cy.get('#nav-link-accountList').click();
    }
    enterMobile(mobile){
        cy.get("input[type='email']").type(mobile);
    }
    clickContinue(){
        cy.get('.a-button-input').click();
    }
    enterPassword(password){
        cy.get("input[type='password']").type(password);
    }
    clickSignIn(){
        cy.get('#signInSubmit').should("be.visible").click();
    }

}
export default LoginPage;