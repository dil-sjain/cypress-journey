import searchPage from "../support/pageObjects/searchPage";
import addToCartPage from "../support/pageObjects/addToCartPage";
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
        
        addToCartPage.makeCartEmpty();
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        

        addToCartPage.addProductToCart();
        addToCartPage.getCartCount().then((initialCount) => {
            performAssert.expectedValue(initialCount, expected_cart_count+1);
            
        });
        addToCartPage.goToCart();
            
        performAssert.elementVisibility(addToCartPage.webLocators.cartSectionTitle());
        performAssert.elementContainText(addToCartPage.webLocators.productTitle(), product_name);

        addToCartPage.goToCheckoutPage();
        performAssert.pageUrlIncludes(expected_checkout_url);
        performAssert.elementVisibility(addToCartPage.webLocators.checkoutPageTitle());
        
        addToCartPage.clickOnChangeAddressButton();        
        addToCartPage.addNewAddress(address.name, address.mobile, address.pincode, address.country, address.address, address.area, address.city, address.landmark, address.state);
        addToCartPage.checkForAddressSuggestionPopUp();
        performAssert.elementTextWithTrim(addToCartPage.getDeliveringCustomerName(), address.address_text+address.name);
        performAssert.elementTextWithTrim(addToCartPage.getDeliveryAddress(), expected_checkout_shipping_address);
        addToCartPage.webLocators.orderPrice().invoke('text').then((text) => {
            const price = parseFloat(text.replace(/[^0-9.]/g, ''));
            performAssert.expectedValue(price, assignData.product.product_price);
        });
        
    })

    it('Add to Cart and Verify Cart Count', () => {
        const product_name = assignData.product.product_name;
        const expected_cart_count = assignData.cart.expected_initial_cart_count;
        
        addToCartPage.makeCartEmpty();
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        cy.wait('@getProducts').its('response.statusCode').should('eq', 200);
         
        addToCartPage.getCartCount().then((initialCount) => {
            performAssert.expectedValue(initialCount, expected_cart_count);
            
            addToCartPage.addProductToCart();

            addToCartPage.getCartCount().then((updatedCount) => {
                performAssert.expectedValue(updatedCount, initialCount+1);
                });
        });
        addToCartPage.removeItemsFromCart();
        
    });

    it('Cart Item Quantity Update', () => {
        const product_name = assignData.product.product_name;
        const expected_cart_count = assignData.cart.expected_initial_cart_count;
        const cart_action_add = assignData.cart.cart_action_add;
        const cart_action_remove = assignData.cart.cart_action_remove;
        
        addToCartPage.makeCartEmpty();
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        cy.wait('@getProducts').its('response.statusCode').should('eq', 200);
         
        addToCartPage.getCartCount().then((initialCount) => {
            performAssert.expectedValue(initialCount, expected_cart_count);
            
            addToCartPage.addProductToCart();
            cy.wait('@addToCart').its('response.statusCode').should('eq', 200);

            addToCartPage.getCartCount().then((updatedCount) => {
                performAssert.expectedValue(updatedCount, initialCount + 1);
                });

                addToCartPage.updateCart(cart_action_add);
                addToCartPage.getCartCount().then((updatedCount) => {
                    performAssert.expectedValue(updatedCount, initialCount + 2);
                });

                    addToCartPage.updateCart(cart_action_remove);
                    addToCartPage.getCartCount().then((finalCount) => {
                        performAssert.expectedValue(finalCount, initialCount + 1);
                });
        });
        addToCartPage.removeItemsFromCart();
        
    });

    it('Persist Cart Items Across Sessions', () => {
        const product_name = assignData.product.product_name;
        const expected_cart_count = assignData.cart.expected_initial_cart_count;
        
        addToCartPage.makeCartEmpty();
        searchPage.enterSearchText(product_name);
        searchPage.clickSearchButton();
        cy.wait('@getProducts').its('response.statusCode').should('eq', 200);
        
        addToCartPage.addProductToCart();
        
        cy.wait('@addToCart').its('response.statusCode').should('eq', 200);
        addToCartPage.getCartCount().then((initialCount) => {
            performAssert.expectedValue(initialCount, expected_cart_count+1);
            cy.reload();
            addToCartPage.getCartCount().then((updatedCount) => {
                performAssert.expectedValue(updatedCount, initialCount);
            });
        });
        addToCartPage.removeItemsFromCart();
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
        performAssert.elementVisibility(addToCartPage.webLocators.couponMessage());
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
        addToCartPage.getCartCount().then((initialCount) => {
            performAssert.expectedValue(initialCount, expected_cart_count_multiple);
        });
        
        addToCartPage.goToCart();
        performAssert.elementVisibility(addToCartPage.webLocators.cartSectionTitle());
        
        addToCartPage.goToCheckoutPage();
        performAssert.elementVisibility(addToCartPage.webLocators.checkoutPageTitle());
        performAssert.elementTextWithTrim(addToCartPage.getCheckoutPageTitle(), expected_checkout_page_title);
        performAssert.pageUrlIncludes(expected_checkout_url);

        addToCartPage.selectDeliveryAddress(address.name)
        addToCartPage.clickOnDeliverToThis();
        performAssert.elementTextWithTrim(addToCartPage.getDeliveringCustomerName(), address.address_text+address.name);
        performAssert.elementTextWithTrim(addToCartPage.getDeliveryAddress(), expected_checkout_shipping_address);
        addToCartPage.webLocators.orderPrice().invoke('text').then((text) => {
        const price = parseFloat(text.replace(/[^0-9.]/g, ''));
        performAssert.expectedValue(price, expected_checkout_price_multiple);
        addToCartPage.removeItemsFromCart();
        
      });
    });

    it('Save for Later',()=>{
        const product_name = assignData.new_product.product_title;
        const expected_cart_count_multiple = assignData.cart.expected_cart_count_multiple;

        addToCartPage.goToCart();
        
        addToCartPage.clickOnSaveForLater();

        addToCartPage.getCartCount().then((initialCount) => {
            performAssert.expectedValue(initialCount, expected_cart_count_multiple-1);
        });
        performAssert.elementVisibility(addToCartPage.webLocators.saveForLaterSection());
        performAssert.elementContainText(addToCartPage.webLocators.saveForLaterProduct(),product_name)

        addToCartPage.clickOnMoveToCart();
        addToCartPage.getCartCount().then((updatedCount) => {
                performAssert.expectedValue(updatedCount, expected_cart_count_multiple);
            });
        addToCartPage.clickOnSaveForLater();
        addToCartPage.getCartCount().then((finalCount) => {
            performAssert.expectedValue(finalCount, expected_cart_count_multiple-1);
        });

        addToCartPage.clickOnDeleteFromSaveForLater();
        performAssert.elementVisibility(addToCartPage.webLocators.removedText());

    })
});