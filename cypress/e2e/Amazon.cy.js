describe('Amazon Login Test', () => {
    it('logs in to Amazon', () => {
      cy.visit('www.amazon.com');
      cy.get('#nav-link-accountList-nav-line-1').click();
      cy.get('#ap_email_login').type('akanksha.vishwanath7@gmail.com');
      cy.get('#continue').click();
      cy.get('#ap_password').type('Advaitha@7');
      cy.get('#signInSubmit').click();
      cy.get('#twotabsearchtextbox').type('Bottle');
      cy.get('#nav-search-submit-button').click();
      cy.get('#twotabsearchtextbox').clear();
      cy.get('#twotabsearchtextbox').type('tote bag');
      cy.get('#nav-search-submit-button').click();
      cy.get('#twotabsearchtextbox').clear();
      cy.get('#twotabsearchtextbox').type('shampoo');
      cy.get('#nav-search-submit-button').click();
      cy.get('#twotabsearchtextbox').clear();
    });
    
});
