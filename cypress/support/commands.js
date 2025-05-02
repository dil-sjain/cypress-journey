// This file is intentionally left blank.


Cypress.Commands.add('login', (email, password) => {
    cy.visit(Cypress.env('baseUrl'));
    cy.get('#nav-link-accountList-nav-line-1').click({force:true});
    // cy.get('#nav-flyout-ya-signin').should('be.visible');
    // cy.get('#nav-flyout-ya-signin').click({force:true});
    cy.get('input[name="email"]').type(email+'{enter}');
    cy.get('input[name="password"]').type(password,'{log:false}').type('{enter}');
    
})