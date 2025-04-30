class Homepage{
    Login(username,password){
        cy.get("#nav-link-accountList-nav-line-1").click()
        cy.get("#ap_email_login").type(username)
        cy.get(".a-button-input").click()
        cy.get("#ap_password").type(password)
        cy.get("#signInSubmit").click()
    }
     

verifyuser(){
    cy.get("#nav-link-accountList-nav-line-1").should("contain.text", "Hello, Rahul");
}


}
export default Homepage;