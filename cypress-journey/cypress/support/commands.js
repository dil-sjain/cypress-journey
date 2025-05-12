Cypress.Commands.add("customWait", (seconds) => {
  const milliseconds = seconds * 1000;
  cy.wait(milliseconds);
});
