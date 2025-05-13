import searchPage from './searchPage.js';

class addToCartPage {
    webLocators = {
      productAvailability: () => cy.get('#availability').contains('In stock'),
      addToCartButton: () => cy.get('#a-autoid-1-announce'),
      cartCount: () => cy.get('span#nav-cart-count'),
      addToCartButtonOnProductPage:()=> cy.get('body > div:nth-child(5) > div:nth-child(42) > div:nth-child(2) > div:nth-child(9) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > form:nth-child(1) > div:nth-child(31) > div:nth-child(1) > div:nth-child(38) > div:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1) > input:nth-child(2)'),
      cartCountButtonOnProductPage: () => cy.get('span[data-a-selector="value"]'),
      productTitle: () => cy.get('.a-truncate-full.a-offscreen'),
      overlayCloseButtonOnProductPage: () => cy.get('body > div:nth-child(31) > div:nth-child(3) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > a:nth-child(10)'),
      addedToCartText:()=> cy.get('div[id="attachDisplayAddBaseAlert"] h4[class="a-alert-heading"]'),
      decreaseCartCount: () => cy.get('.a-icon.a-icon-small-remove'),
      increaseCartCount:()=> cy.get('span[class="a-icon a-icon-small-add"]').first(),
      deleteCartItemButton: () => cy.get('input[value="Delete"]'),
      goToCartButton: () => cy.get('a[href="/cart?ref_=ewc_gtc"]'),
      cartIcon: ()=> cy.get('#nav-cart'),
      cartSectionTitle: () => cy.get('h2#sc-active-items-header'),
      checkoutButton: () => cy.get('input[value="Proceed to checkout"]'),
      checkoutPageTitle: () => cy.get('#nav-checkout-title-header-text'),
      addNewAddressButton: () => cy.get('a.a-button-text'),
      addAnotherAddressButton: () => cy.get('#add-new-address-desktop-sasp-tango-link'),
      addAddressText: () => cy.get('h4.a-popover-header-content'),
      countryDropdown: () => cy.get('select[name="address-ui-widgets-countryCode"]'),
      nameField: () => cy.get('input[name="address-ui-widgets-enterAddressFullName"]'),
      mobileField: () => cy.get('input[name="address-ui-widgets-enterAddressPhoneNumber"]'),
      pinCodeField: () => cy.get('input[name="address-ui-widgets-enterAddressPostalCode"]'),
      addressField: () => cy.get('input[name="address-ui-widgets-enterAddressLine1"]'),
      areaField: () => cy.get('input[name="address-ui-widgets-enterAddressLine2"]'),
      cityField: () => cy.get('input[name="address-ui-widgets-enterAddressCity"]'),
      landmarkField: () => cy.get('input[name="address-ui-widgets-landmark"]'),
      stateDropdown: () => cy.get('select[name="address-ui-widgets-enterAddressStateOrRegion"]'),
      useThisAddressButton: () => cy.get('input[data-csa-c-slot-id="address-ui-widgets-continue-address-btn-bottom"]'),
      addressCheckPopUp: () => cy.get('#address-ui-widgets-enterAddressFormContainer'),
      originalAddressSelector: () => cy.get('span.a-text-bold').contains('Original address:'),
      deliverToThisAddressButton:()=> cy.get('.a-button-input[data-csa-c-slot-id="checkout-secondary-continue-shipaddressselect"]'),
      addressOwnersList:()=> cy.get('span[class="a-text-bold"]'),

      deliveringCustomerName: () => cy.get('#deliver-to-customer-text'),
      deliveryAddress: () => cy.get('#deliver-to-address-text'),
      orderPrice: () => cy.get('td.a-color-base.a-size-medium.a-text-right.grand-total-price'),
      deliveryAddressChangeButton:()=> cy.get('a.a-declarative').contains('Change'),
      couponCodeField: () => cy.get('input[placeholder="Enter Code"]'),
      couponApplyButton: () => cy.get('input[name="ppw-claimCodeApplyPressed"]'),
      couponMessage: () => cy.get('div[class="a-column a-span12 pmts-error-message-inline"] p'),
      item1: () =>  cy.get('#a-autoid-1-announce'),
      item2: () =>  cy.get('#a-autoid-2-announce'),
      item3: () =>  cy.get('#a-autoid-3-announce'),
      cartCountButtonInProductTile1: () => cy.get('div[name="sc-quantity"]'),
      cartCountButtonInProductTile2:()=> cy.get('div[class="s-widget-container s-spacing-small s-widget-container-height-small celwidget slot=MAIN template=SEARCH_RESULTS widgetId=search-results_2"] div[name="ax-qs"]'),
      cartCountButtonInProductTile3:()=> cy.get('div[class="s-widget-container s-spacing-small s-widget-container-height-small celwidget slot=MAIN template=SEARCH_RESULTS widgetId=search-results_3"] div[name="ax-qs"]'),
      saveForLaterButton:()=>cy.get('input[data-action="save-for-later"]').first(),
      saveForLaterSection:()=> cy.get('a[aria-selected="true"]'),
      saveForLaterProduct:()=> cy.get('div[id="sc-saved-b00989c1-1c95-4b81-9d4d-d067cf11be5b"] span[class="a-truncate-full"]'),
      moveToCartButton:()=> cy.get('div.sc-list-item-content > div > div:nth-child(2) > div.a-row.sc-action-links > div > span > span > span > input'),
      deleteButtonFromSaveForLater:()=> cy.get('div.sc-list-item-content > div > div:nth-child(2) > div.a-row.sc-action-links > span.a-size-small.sc-action-delete > span > input'),
      removedText:()=> cy.get('span[class="a-text-bold"]').contains('Removed'),
    };

    
    addProductToCart() {
      this.webLocators.addToCartButton().click({timeout: 10000});
      this.webLocators.cartCountButtonInProductTile1().should('be.visible', { timeout: 30000 });
      // cy.wait(3000);
      //   .then(($button) => {
      //       cy.wrap($button).should('not.be.visible'); 
      //   });
    }
    addMultipleProductsToCart() {
      this.webLocators.item1().click({force:true});
      this.webLocators.cartCountButtonInProductTile1().should('be.visible')

      this.webLocators.item2().click({force:true});
      
      this.webLocators.item3().click({force:true});
      
    }

    getCartCount() {
      cy.reload();
      return this.webLocators.cartCount({timeout: 10000})
      .invoke('text')
      .then((text) => {
        const count = parseInt(text, 10);
        return count;
      });
    }

    
    updateCart(action) {
      if (action === 'addProduct') {
        this.webLocators.increaseCartCount().click();
        cy.wait(2000);
      } else if (action === 'removeProduct') {
        this.webLocators.decreaseCartCount().click();
        cy.wait(2000);
      }
    }

    makeCartEmpty() {
        this.getCartCount().then((cartCount) => {
      if (cartCount > 0) {
        cy.log('Cart has items');
        this.webLocators.cartCount().click();
        this.webLocators.deleteCartItemButton().first().click();
      }
      else {
        cy.log('Cart is empty');
      }
    })
    }

 

    goToCart() {
      this.webLocators.goToCartButton().click({force:true});
    }
    removeItemsFromCart(){
      this.webLocators.cartIcon().click({force:true});
      this.webLocators.deleteCartItemButton().should('be.visible');
      this.webLocators.deleteCartItemButton().first().click();

    }
    getCartSectionTitle() {
      return this.webLocators.cartSectionTitle()
    }
    goToCheckoutPage(){
      this.webLocators.checkoutButton().click();
    }
    getCheckoutPageTitle() {
      return this.webLocators.checkoutPageTitle();
    }
    
    ClickOnAddNewAddressButton() {
    this.webLocators.addNewAddressButton().then(($button) => {
        if ($button.is(':visible')) {
            cy.wrap($button).click();
        } else {
            this.webLocators.deliveryAddressChangeButton().click();
            this.webLocators.addAnotherAddressButton().click();
        }
      });
    }

    clickOnChangeAddressButton() {
      
      this.webLocators.addAnotherAddressButton().click();
    }

    addNewAddress(name, mobile, pinCode, country, address, area, city, landmark, state) {
      this.webLocators.nameField().should('be.visible');
      this.webLocators.nameField().type(name);
      this.webLocators.mobileField().type(mobile);
      this.webLocators.pinCodeField().type(pinCode);
      this.webLocators.countryDropdown().select(country, { force: true });
      this.webLocators.addressField().type(address,{ force: true });
      this.webLocators.areaField().type(area,{ force: true });
      this.webLocators.landmarkField().type(landmark,{ force: true });
      this.webLocators.cityField().clear();
      this.webLocators.cityField().type(city,{ force: true });
      this.webLocators.stateDropdown().select(state, { force: true });
      this.webLocators.useThisAddressButton().click( { force: true });
    }
    checkForAddressSuggestionPopUp() {
      this.webLocators.addressCheckPopUp().then((addressCheck) => {
        if (addressCheck.is(':visible')) {
          cy.log('Address suggestion popup is visible');
          this.webLocators.originalAddressSelector().click();
          this.webLocators.useThisAddressButton().click();

        } else {
          cy.log('Address suggestion popup is not visible');
        }
      });
      
    }

    selectDeliveryAddress(owner_name){
        this.webLocators.addressOwnersList().each(($owner) => {
        const address_owner = $owner.text().trim();
        if (address_owner.includes(owner_name)) {
            cy.wrap($owner).click({force:true});
        }
      });
      }
      clickOnDeliverToThis(){
        this.webLocators.deliverToThisAddressButton().click();
      }

    getDeliveringCustomerName() {
      return this.webLocators.deliveringCustomerName()
    }
    getDeliveryAddress() {
      return this.webLocators.deliveryAddress()
    }
    
    applyCouponCode(couponCode) {
      this.webLocators.couponCodeField().type(couponCode);
      this.webLocators.couponApplyButton().click();
    } 
    getCouponMessage() {
      return this.webLocators.couponMessage()
    }

    addSelectedProductToCart(product_name) {
      searchPage.enterSearchText(product_name);
      searchPage.clickSearchButton();
      this.webLocators.addToCartButton().click();
      cy.reload();
} 
    cartOverlay() {
    this.webLocators.addedToCartText().then(($text) => {
        if ($text.length > 0 && $text.is(':visible')) {
            cy.log('Overlay is visible');
            cy.wrap($text).should('contain', 'Added to Cart');

            this.webLocators.overlayCloseButtonOnProductPage().then(($button) => {
                if ($button.length > 0 && $button.is(':visible')) {
                    cy.wrap($button).click();
                } else {
                    cy.log('Close button is not visible');
                }
            });
        } else {
            cy.log('Overlay is not visible');
        }
    });
}
    addProductToCartOnProductPage() {
      this.webLocators.addToCartButtonOnProductPage().click({force: true});
      
      this.webLocators.cartCountButtonOnProductPage().should('be.visible');  
      cy.reload();

}
    clickOnSaveForLater(){
      this.webLocators.saveForLaterButton();
    }
    clickOnMoveToCart(){
      this.webLocators.moveToCartButton();
    }
    clickOnDeleteFromSaveForLater(){
      this.webLocators.deleteButtonFromSaveForLater();
    }
}

export default new addToCartPage();
