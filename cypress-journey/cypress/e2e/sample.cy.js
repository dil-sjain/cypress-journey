import '../support/commands';

describe('Sample Test Suite', () => {

    before(() => {
        cy.loginInToApplication(
            Cypress.env('username'),
            Cypress.env('password'),
        );
    });

    it('should visit the homepage', () => {
        cy.contains('Welcome'); // Replace with an expected element on your homepage
    });

    it('should perform a sample action', () => {
        cy.get('button#sample-button').click(); // Replace with the actual button selector
        cy.get('div#result').should('contain', 'Action performed'); // Replace with expected outcome
    });
});