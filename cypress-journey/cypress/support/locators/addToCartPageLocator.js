export const addToCartPageLocators = {
  addToCart: () => cy.get("#nav-cart"),
  cartCount: () => cy.get("#nav-cart-count"),
  address: () => cy.get("#checkout-deliveryAddressPanel"),
};