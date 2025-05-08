import "cypress-xpath";

class searchPage {
  elements = {
    searchBox: () => cy.get("#twotabsearchtextbox"),
    suggestion: () => cy.get("#sac-suggestion-row-2-cell-1 > .s-suggestion"),
   productTitle: (productName) =>
     cy.get("h2.a-size-medium").contains(productName),
    clickonsearch : () => cy.get("#nav-search-submit-button"),
    productImage: () => cy.get("#landingImage"),
    brand: ()=> cy.get("a[aria-label='Apply the filter MuscleBlaze to narrow results'] span[class='a-size-base a-color-base']"),
    item1: ()=> cy.get("#a-autoid-1-announce"),
    item2: ()=>cy.get("#a-autoid-2-announce"),
    item3: ()=> cy.get("#a-autoid-3-announce")



    // sizeOption: () => cy.get("span#size_name_1 input[name='1']"),
    // styleOption: () =>
    //   cy.get("#style_name_0 >.a-button-inner > .a-button-input"),
    // memorySizeText: () =>
    //   cy.get("#inline-twister-expanded-dimension-text-size_name"),
    // setupServiceCheckbox: () =>
    //   cy.get("label[for='ppdb-add-service-checkbox']"),
  };

  findproduct(product) {
    this.elements.searchBox().type(product);
  }

  SelectSuggestedProduct() {
    this.elements.suggestion().should("be.visible").click({ force: true });
  }

  clickonsearch(){
    this.elements.clickonsearch().click();
  }
  selectItem(productName) {
    this.elements
      .productTitle(productName)
      .parents("a")
      .invoke("removeAttr", "target")
      .click();

    this.elements.productImage().should("be.visible");
  }
  

  // selectSpecs() {
  //   this.elements.sizeOption().should("be.visible").click();
  //   this.elements.styleOption().should("be.enabled").click();
  // }

  // verifyMemorySize(memorySize) {
  //   this.elements.memorySizeText().should("contain.text", memorySize);
  // }

  verifypage(productName) {
    this.elements
      .productTitle(productName)
      .should("include.text", "Samsung Galaxy S25 Ultra 5G AI Smartphone");
  }
  selectbrand(){
    this.elements.brand().click();
  }

  addmultipleitem(){
    this.elements.item1().click();
    this.elements.item2().click();
    this.elements.item3().click();
  }
  // AddSetUpService() {

  //   this.elements.setupServiceCheckbox().click({force:true})
  // }
}

export default searchPage;
