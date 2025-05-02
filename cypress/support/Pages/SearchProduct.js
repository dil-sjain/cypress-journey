import "cypress-xpath";

class SearchProduct {
  elements = {
    searchBox: () => cy.get("#twotabsearchtextbox"),
    suggestion: () => cy.get("#sac-suggestion-row-2-cell-1 > .s-suggestion"),
    productTitle: (productName) => cy.get("h2.a-size-medium").contains(productName),
    productImage: () => cy.get("#landingImage"),
    sizeOption: () => cy.get("span#size_name_1 input[name='1']"),
    styleOption: () => cy.get("#style_name_0 > .a-button-inner > .a-button-input"),
    memorySizeText: () => cy.get("#inline-twister-expanded-dimension-text-size_name"),
   // setupServiceCheckbox: () => cy.get("label[for='ppdb-add-service-checkbox']"),
    addToCartButton: () => cy.get("#add-to-cart-button"),
  };

  findproduct(product) {
    this.elements.searchBox().type(product);
  }

  SelectSuggestedProduct() {
    
    this.elements.suggestion()
      .should("be.visible")
      .click({force:true});
  }

  selectItem(productName) {
    this.elements.productTitle(productName)
      .parents("a")
      .invoke("removeAttr", "target")
      .click();

    this.elements.productImage().should("be.visible");
  }

  selectSpecs() {
    this.elements.sizeOption().should("be.visible").click();
    this.elements.styleOption().should("be.enabled").click();
  }

  verifyMemorySize(memorySize) {
    this.elements.memorySizeText().should("contain.text", memorySize);
  }

  verifypage(productName) {
    this.elements.productTitle(productName)
      .should("have.text", "Samsung Galaxy S25 Ultra 5G AI Smartphone (Titanium Silverblue, 12GB RAM, 512GB Storage), 200MP Camera, S Pen Included, Long Battery Life");
  }

  AddSetUpService() {
    cy.wait(1000)
    this.elements.setupServiceCheckbox().click()
  }

  addToCart() {
    this.elements.addToCartButton()
      .should("have.attr", "title", "Add to Shopping Cart")
      .click({force:true});
  }
}

export default SearchProduct;
