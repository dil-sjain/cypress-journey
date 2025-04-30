describe('Amazon Test Suite', () => {
    beforeEach(() => {
        // Disable CAPTCHA for the duration of the test
        cy.intercept('POST', '/your/captcha/endpoint', (req) => {
          req.reply({ captchaPassed: true });
        });
        cy.clearCookies();
        cy.visit('https://www.amazon.in/');
        cy.get('#nav-link-accountList').click();
        cy.get('#ap_email_login').type('7503489179');
        cy.get('#continue').click();
        cy.get('#ap_password').type('1234kanha');
        cy.get('#signInSubmit').click(); 
      });
    it('Login Page', () => {
        Cypress.config('defaultCommandTimeout', 60000);
     
        cy.contains('Hello, Simran').should('be.visible');
    });

    it('search for product', () => {
        cy.get('#twotabsearchtextbox').type('s25{enter}');
        cy.get('[data-component-type="s-search-result"]').should('have.length.greaterThan', 5);
        cy.get('div[data-cy="title-recipe"]').should('include.text','Samsung');
        cy.get('[data-component-type="s-search-result"]').first().find('img').click();
     });
});
