
import searchPage from "../support/pageObjects/searchPage";
import { assignData } from "../fixtures/assignData.json";
import loginPage from "../support/pageObjects/loginPage";
import  assertHelper  from "../support/utils/assertHelper";
import errorHelper from "../support/utils/errorHelper";


const performAssert = assertHelper;
const errorHandler = errorHelper;
const { user_email, user_password } = Cypress.env();


describe('Assignment 1', () => {
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
        loginPage.verifyLogin(expectedLoginName);
    })

    it('User should be able to search the product', function() {
        
        const searchText = assignData.search.search_text; 
        const expectedText = `"${assignData.search.search_text}"`;
        
        //Validation of auto-suggestions
        searchPage.enterSearchText(searchText);        
        searchPage.verifySearchText(searchText);
        
        searchPage.clickSearchButton();
        //verify searched product list conatins searched product text
        searchPage.verifyProductList(searchText, expectedText);  
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
        searchPage.verifyProductPrices(expected_min_price, expected_max_price);

        //verify brand filter - checkbox
        searchPage.selectBrand(brand);
        searchPage.verifyProductBrandFilter(brand);
       
    })

    it('User should able to search specific product', function() {
        
        const product_name = assignData.product.product_name;
        const expected_product_price = assignData.product.product_price;
        const expected_product_name = product_name.toLowerCase();
        
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        searchPage.verifyProductName(product_name);
        
        searchPage.getProductListAsJson();
        searchPage.getSpecificProductPage(expected_product_name);
        searchPage.verifySpecificProductName(product_name);
        
        searchPage.getSpecificProductPageDataAsJson();
        searchPage.verifySpecificProductPrice(expected_product_price);
    })
})