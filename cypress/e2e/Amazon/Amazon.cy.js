import Homepage from "../../support/Pages/Homepage";
import SearchProduct from "../../support/Pages/SearchProduct";
let data; 
const homepage = new Homepage();
before ( ()=>{
  cy.fixture('example').then((loadedData) => {
    data = loadedData;
  });
})

beforeEach(() => {

  cy.visit("https://www.amazon.in")

  homepage.Login(data.username,data.password)
});



describe('Open Amazon', () => {

    it('verify the user and title ', () => {
     
    
      cy.title().should('include', 'Amazon')
      homepage.verifyuser();

    })

    it('should search and select the product ',function(){
      const search = new SearchProduct();
      search.findproduct(data.product)
      search.selectItem();
      search.selectSpecs();
      search.addToCart();

    })
  })
  