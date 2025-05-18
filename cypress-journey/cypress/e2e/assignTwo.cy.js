import searchPage from "../support/pageObjects/searchPage";
import addToCartPage from "../support/pageObjects/addToCartPage";
import loginPage from "../support/pageObjects/loginPage";
import  assertHelper  from "../support/utils/assertHelper";
import { assignData } from "../fixtures/assignData.json";
import errorHelper from "../support/utils/errorHelper";
import Endpoints from "../support/utils/endpoint";

const performAssert = assertHelper;
const errorHandler = errorHelper;
const { user_email, user_password } = Cypress.env();

describe('Assignment 2 - E-Commerce Cart Functionality', () => {
    let assignData;
    let productData;
    let cartData;
    let couponData;
    let products;

    before(() => {
        cy.fixture('assignData.json').then((data) => {
            assignData = data;
        }) 
        cy.fixture('productData.json').then((data) => {
            productData = data;
        })  
        cy.fixture('cartData.json').then((data) => {
            cartData = data;
        })
        cy.fixture('couponData.json').then((data) => {
            couponData = data;
        })
        cy.fixture('products.json').then((data) => {
            products = data;
        })
    });

    beforeEach(() => {
        cy.loginInToApplication(user_email, user_password);
        cy.apiMockGET(Endpoints.getSearchedProducts(), 'products.json', 'getProducts');
        cy.apiMockGET(Endpoints.getSelectedProduct(), 'productData.json', 'getProductData');
        cy.apiMockPOST(Endpoints.getAddToCart(), 'cartData.json', 'addToCart');
        cy.apiMockGET(Endpoints.getCart(), 'cartData.json', 'getCart');
        
    });
    it('End to End Flow', () => {
        const product_name = assignData.product.product_name;
        const expected_cart_count = assignData.cart.expected_initial_cart_count;
        const expected_cart_section_title = assignData.cart.expected_cart_section_title;
        const expected_checkout_page_title = assignData.checkout.expected_checkout_page_title;
        const expected_checkout_url = assignData.checkout.expected_checkout_url;
        const address = assignData.address;
        const expected_checkout_shipping_address = assignData.checkout.expected_checkout_shipping_address;
        const product_availability = assignData.productAvailability.available.availability;
        expected_product_price=assignData.product.product_price;
        
        addToCartPage.makeCartEmpty();
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        addToCartPage.verifyCartCount(actualCount,expected_cart_count)

        addToCartPage.addProductToCart();
        addToCartPage.verifyCartCount(actualCount, expected_cart_count+1);
        addToCartPage.goToCart();
        addToCartPage.verifyProductTitleFromCart(product_name);

        addToCartPage.goToCheckoutPage();
        addToCartPage.verifyCheckOutPageUrl(expected_checkout_url);
        
        addToCartPage.clickOnChangeAddressButton();        
        addToCartPage.addNewAddress(address.name, address.mobile, address.pincode, address.country, address.address, address.area, address.city, address.landmark, address.state);
        addToCartPage.checkForAddressSuggestionPopUp();
        addToCartPage.verifyCustomeNameOnDeliveryPage(address.address_text+address.name);
        addToCartPage.verifyAddressOnDeliveryPage(expected_checkout_shipping_address);
        addToCartPage.verifyProductPriceOnDeliveryPage(expected_product_price);       
        
    })

    it('Add to Cart and Verify Cart Count', () => {
        const product_name = assignData.product.product_name;
        const expected_cart_count = assignData.cart.expected_initial_cart_count;
        
        addToCartPage.makeCartEmpty();
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        // cy.wait('@getProducts').its('response.statusCode').should('eq', 200);
        addToCartPage.verifyCartCount(actualCount,expected_cart_count);
        
        addToCartPage.addProductToCart();
        addToCartPage.verifyCartCount(actualCount,expected_cart_count+1);
        addToCartPage.removeItemsFromCart();
        addToCartPage.verifyCartCount(actualCount,expected_cart_count);
        
    });

    it('Cart Item Quantity Update', () => {
        const product_name = assignData.product.product_name;
        const expected_cart_count = assignData.cart.expected_initial_cart_count;
        const cart_action_add = assignData.cart.cart_action_add;
        const cart_action_remove = assignData.cart.cart_action_remove;
        
        addToCartPage.makeCartEmpty();
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        // cy.wait('@getProducts').its('response.statusCode').should('eq', 200);
        
        addToCartPage.verifyCartCount(actualCount,expected_cart_count);
        addToCartPage.addProductToCart();
        cy.wait('@addToCart').its('response.statusCode').should('eq', 200);

        addToCartPage.verifyCartCount(actualCount,expected_cart_count+1);
        addToCartPage.updateCart(cart_action_add);
        cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
        addToCartPage.verifyCartCount(actualCount,expected_cart_count+2);
        
        addToCartPage.updateCart(cart_action_remove);
        cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
        addToCartPage.verifyCartCount(actualCount,expected_cart_count+1);
        addToCartPage.removeItemsFromCart();
        addToCartPage.verifyCartCount(actualCount,expected_cart_count);
        
    });

    it('Persist Cart Items Across Sessions', () => {
        const product_name = assignData.product.product_name;
        const expected_cart_count = assignData.cart.expected_initial_cart_count;
        const expectedLoginName = assignData.user.expected_login_name;
        
        addToCartPage.makeCartEmpty();
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        // cy.wait('@getProducts').its('response.statusCode').should('eq', 200);
        
        addToCartPage.addProductToCart();
        
        cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
        addToCartPage.verifyCartCount(actualCount,expected_cart_count+1);
        cy.reload();
        addToCartPage.verifyCartCount(actualCount,expected_cart_count+1);
        cy.go('back');
        addToCartPage.verifyCartCount(actualCount,expected_cart_count+1);
        cy.go('forward');
        addToCartPage.verifyCartCount(actualCount,expected_cart_count+1);
        loginPage.logOut();
        cy.loginInToApplication(user_email, user_password);
        loginPage.verifyLogin(expectedLoginName);
        addToCartPage.verifyCartCount(actualCount,expected_cart_count+1);
        addToCartPage.removeItemsFromCart();
        addToCartPage.verifyCartCount(actualCount,expected_cart_count);
    });

    it('Coupon Code Application', () => {
        const coupon_code = couponData.coupon1.code;
        const expected_discount = couponData.coupon1.discount;
        const expected_discounted_price = couponData.coupon1.discounted_price;
        const expected_coupon_message = couponData.coupon1.message;
        
        addToCartPage.makeCartEmpty();
        addToCartPage.addSelectedProductToCart(assignData.product.product_name);
        addToCartPage.goToCart();
        cy.wait('@getCart').its('response.statusCode').should('eq', 200);
        addToCartPage.goToCheckoutPage();
        addToCartPage.clickOnDeliverToThis();
        
        addToCartPage.applyCouponCode(coupon_code);
        addToCartPage.verifyCouponMessage();
        addToCartPage.removeItemsFromCart();
        
    });

    it('Checkout Multiple Items', () => {
        const product_name = assignData.new_product.product_name;
        const expected_cart_section_title = assignData.cart.expected_cart_section_title;
        const expected_checkout_page_title = assignData.checkout.expected_checkout_page_title;
        const expected_checkout_url = assignData.checkout.expected_checkout_url;
        const address = assignData.address;
        const expected_checkout_shipping_address = assignData.checkout.expected_checkout_shipping_address_multiple;
        const expected_checkout_price_multiple = assignData.checkout.expected_checkout_price_multiple;
        const expected_cart_count_multiple = assignData.cart.expected_cart_count_multiple;

        addToCartPage.makeCartEmpty();
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        addToCartPage.addMultipleProductsToCart();
        addToCartPage.verifyCartCount(actualCount,expected_cart_count);
        
        addToCartPage.goToCart();
        addToCartPage.goToCheckoutPage();
        addToCartPage.verifyCheckOutPageUrl(expected_checkout_url);

        addToCartPage.selectDeliveryAddress(address.name)
        addToCartPage.clickOnDeliverToThis();
        addToCartPage.verifyCustomeNameOnDeliveryPage(address.address_text+address.name)
        addToCartPage.verifyAddressOnDeliveryPage(expected_checkout_shipping_address);
        addToCartPage.verifyProductPriceOnDeliveryPage(expected_checkout_price_multiple);
        addToCartPage.removeItemsFromCart();
        
    });

    it('Save for Later',()=>{
        const product_name = assignData.new_product.product_title;
        const expected_cart_count_multiple = assignData.cart.expected_cart_count_multiple;

        addToCartPage.goToCart();
        
        addToCartPage.clickOnSaveForLater();
        addToCartPage.verifyCartCount(actualCount,expected_cart_count_multiple-1);
        addToCartPage.verifySaveForLater(product_name);
        
        addToCartPage.clickOnMoveToCart();
        addToCartPage.verifyCartCount(actualCount,expected_cart_count_multiple);

        addToCartPage.clickOnSaveForLater();
        addToCartPage.verifyCartCount(actualCount,expected_cart_count_multiple-1);

        addToCartPage.clickOnDeleteFromSaveForLater();
        addToCartPage.verifyRemovedText();

    })
});