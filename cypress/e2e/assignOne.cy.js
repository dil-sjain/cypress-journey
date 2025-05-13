
import searchPage from "../support/pageObjects/searchPage";
import { assignData } from "../fixtures/assignData.json";
import loginPage from "../support/pageObjects/loginPage";
import  assertHelper  from "../support/utils/assertHelper";
import errorHelper from "../support/utils/errorHelper";


const performAssert = assertHelper;
const errorHandler = errorHelper;
const { user_email, user_password } = Cypress.env();


describe.skip('Assignment 1', () => {
    let assignData;
    before(() => {
        cy.fixture('assignData.json').then((data) => {
            assignData = data;
        }) 
    });

    beforeEach(()=> {
        cy.loginInToApplication(user_email, user_password);
        
    })

    it('User should be able to login', function() {
        
        const expectedLoginName = assignData.user.expected_login_name;
        cy.log(`Expected login name: ${expectedLoginName}`);
        loginPage.webLocators.login_name().should('be.visible');
        loginPage.webLocators.login_name().should('contain', expectedLoginName); 
            
    })

    it('User should be able to search the product', function() {
        
        const searchText = assignData.search.search_text; 
        const expectedText = `"${assignData.search.search_text}"`;
        
        //Validation of auto-suggestions
        searchPage.enterSearchText(searchText);
        performAssert.elementValue(searchPage.webLocators.searchBox(), searchText);
        performAssert.elementVisibility(searchPage.webLocators.suggestionContainer());
        performAssert.elementContainText(searchPage.webLocators.suggestion_list(), searchText);
        
        searchPage.clickSearchButton();
        performAssert.pageUrlIncludes(searchText);
        //verify searched product list conatins searched product text
        performAssert.elementText(searchPage.getSearchPage(), expectedText);
  
    })

    it('User should be able to filter the products', function() {
    
        const searchText = assignData.search.search_text;
        const expected_min_price =  assignData.search.expected_min_price;
        const expected_max_price =  assignData.search.expected_max_price;
        const brand = assignData.search.filter_brand;

        searchPage.enterSearchText(searchText);
        searchPage.clickSearchButton();

        cy.log(`Expected min price: ${expected_min_price}`);
        cy.log(`Expected max price: ${expected_max_price}`);
        
        //verify slider filter
        searchPage.setPriceRange(assignData.search.min_price_slider, assignData.search.max_price_slider);  
        searchPage.getProductPrices().each(($price) => {
        const price = parseInt($price.text().replace(/,/g, ''), 10);
        errorHandler.errorForNaN(price);
        expect(price).to.be.gte(expected_min_price);
        expect(price).to.be.lte(expected_max_price);
        })

        //verify brand filter - checkbox
        searchPage.selectBrand(brand);
        performAssert.elementVisibility(searchPage.webLocators.main_container());
        searchPage.getEachProductBrandName().each(($product) => {
            const productText = $product.text().toLowerCase();
            expect(productText).to.include(brand.toLowerCase());
        })
    })

    it('User should able to search specific product', function() {
        
        const product_name = assignData.product.product_name;
        const expected_product_price = assignData.product.product_price;
        const expected_product_name = product_name.toLowerCase();
        
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        performAssert.elementContainText(searchPage.getSearchPage(), product_name);
        searchPage.getProductListAsJson();
        searchPage.getProductList().each(($product) => {
            const productText = $product.text().toLowerCase();            
            if (productText.includes(expected_product_name)) {
                cy.wrap($product).parent('a').invoke('removeAttr','target').click({timeout: 5000});
                return false; 
            }
        });
        
        performAssert.elementVisibility(searchPage.getSpecificProductTitle());
        performAssert.elementContainText(searchPage.getSpecificProductTitle(), product_name);
        searchPage.getSpecificProductPageDataAsJson();
        performAssert.elementVisibility(searchPage.getSpecificProductPrice());
        searchPage.getSpecificProductPrice().invoke('text').then(($price) => {
            const price = parseInt($price.replace(/,/g, ''), 10);
            expect(price).to.eq(expected_product_price);
        })
    })
})