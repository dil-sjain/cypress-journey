describe('amazon cart shopping',()=>{
    beforeEach(() => {
        cy.visit('https://www.amazon.in');
        cy.visit('https://amazon.in')
        cy.get('#nav-link-accountList-nav-line-1').click();
        cy.wait(2000);
        cy.get('#ap_email_login').type('7310623832');
        cy.get('.a-button-input').click();
        cy.get('#ap_password').type('Change@63999');
        cy.get('#signInSubmit').click();
    });

    it('Login to amazon account',()=>{
        cy.get('#nav-logo-sprites').should('be.visible');//verify logo is visible after successful login
    });
    it('add to cart',()=>{
        cy.get('.nav-search-field').type('ps5')
        cy.get('#nav-search-submit-button').click();
        cy.wait(2000)
        cy.get('h2[aria-label="Sony PlayStation5 Gaming Console (Slim)"]').parents("a").invoke("removeAttr","target").click()
        cy.wait(2000)
        cy.get('#add-to-cart-button').click();
        cy.wait(2000);
    })
});