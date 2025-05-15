export const interceptSearchAPI = () => {
    cy.intercept('POST', '**/com.amazon.csm.csa.prod', {
        statusCode: 200,
        body: {
            results: [
                { name: 'Sony PlayStation5 Gaming Console (Slim)', price: '₹49,990' },
                { name: 'Xbox Series X', price: '₹52,990' },
            ],
        },
    }).as('searchAPI');
};

export const interceptCartAPI = () => {
    cy.intercept('POST', '**/https://unagi-eu.amazon.com/1/events/com.amazon.csm.nexusclient.prod', {
        statusCode: 200,
        body: { cartCount: 2 },
    }).as('cartAPI');
};

export const interceptInvalidSearchAPI = () => {
    cy.intercept('POST', '**/com.amazon.csm.csa.prod', {
        statusCode: 200,
        body: { results: [] }, 
    }).as('invalidSearchAPI');
};

