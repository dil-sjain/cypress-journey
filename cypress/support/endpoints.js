export const endpoints = {
    getSearchRequestendpoint: '**/s/ref=nb_sb_noss**',
    getAddToCartendpoint: '**/cart/add-to-cart**',
  };
  
  export function interceptgetSearchRequest() {
    cy.intercept('GET', endpoints.getSearchRequestendpoint).as('searchRequest');
  }

  export function interceptgetAddToCartendpoint() {
    cy.intercept('GET', endpoints.getAddToCartendpoint).as('addToCart');
  }