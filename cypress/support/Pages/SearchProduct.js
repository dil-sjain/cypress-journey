import 'cypress-xpath';
class SearchProduct{

    findproduct(product){
       cy.get("#twotabsearchtextbox").type(product);

       cy.get("#nav-search-submit-button").click()

    }
    selectItem(){
        cy.get("h2.a-size-medium").contains("Samsung Galaxy S25 Ultra").parents("a").invoke('removeAttr','target').click();

        cy.get("#landingImage").should('be.visible')
    }

    selectSpecs(){
        cy.get("span#size_name_1 input[name='1']").click()
        cy.wait(7000)
        cy.get('#style_name_0 > .a-button-inner > .a-button-input').click()
       
    }
    addToCart(){
        cy.wait(4000)
        cy.xpath("//div[@id='buybackAddToCart']//input[@id='add-to-cart-button']").click({force:true})
        cy.xpath("//div[@id='buybackAddToCart']//input[@id='add-to-cart-button']").click({force:true})
        
    }
     
    
}
export default SearchProduct;