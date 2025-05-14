export default class Endpoints {
  static interceptSearchAPI() {
    cy.intercept(
      "POST",
      "**/https://unagi.amazon.in/1/events/com.amazon.csm.csa.prod",
      {
        statusCode: 200,
        body: { productName: "Samsung Galaxy S25 Ultra 5G AI Smartphone" },
      }
    ).as("searchAPI");
  }

  static interceptCartAPI() {
    cy.intercept(
      "POST",
      "**/https://unagi-eu.amazon.com/1/events/com.amazon.csm.nexusclient.prod",
      {
        statusCode: 200,
      }
    ).as("cartAPI");
  }
}
 