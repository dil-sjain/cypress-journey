class addToCartPage {
  webLocators = {
    allCartItems: () => cy.get(".sc-list-item-content"),
    cartIcon: () => cy.get("#nav-cart", { timeout: 10000 }),
    proceedToCheckoutButton: () =>
      cy.get("input[name='proceedToRetailCheckout']"),
    productTitlesInCheckout: () => cy.get(".a-truncate-cut"),
    totalAmount: () => cy.get(":nth-child(5) > .a-text-right"),
    deliveryAddressLabel: () => cy.get("#deliver-to-customer-text"),
    deliveryAddress: () => cy.get("#deliver-to-address-text"),
  };

  openCartPage() {
    cy.log("Navigating to Cart page...");

    this.webLocators.cartIcon().should("be.visible").click();

    cy.url().should("include", "/gp/cart/view.html"); // Validate URL contains cart
    cy.log("Cart page opened successfully");
  }

  validateCartItems(numberOfProductsToAdd) {
    cy.log(`Validating ${numberOfProductsToAdd} products in cart`);

    cy.fixture("addedProducts.json").then((expectedProducts) => {
      const expectedList = [...expectedProducts]; // Clone to avoid mutation

      this.getCartItems(numberOfProductsToAdd).then((cartProducts) => {
        this.compareCartWithExpected(cartProducts, expectedList);
      });
    });
  }

  getCartItems(expectedCount) {
    const cartProducts = [];

    return this.webLocators
      .allCartItems()
      .should("have.length.at.least", expectedCount)
      .then(($cartItems) => {
        const actualCount = $cartItems.length;
        cy.log(`Found ${actualCount} items in cart`);
        expect(actualCount, "Cart item count").to.equal(expectedCount);

        // Extract name and price from each cart item
        cy.wrap($cartItems).each(($cartEl) => {
          const product = {};

          this.getCartItemName($cartEl).then((name) => {
            product.name = name;
          });

          this.getCartItemPrice($cartEl).then((price) => {
            product.price = price;
          });

          cy.then(() => {
            cartProducts.push(product);
          });
        });

        return cy.wrap(cartProducts);
      });
  }

  getCartItemName(cartElement) {
    return cy
      .wrap(cartElement)
      .find(".sc-product-title")
      .invoke("text")
      .then((text) => text.trim());
  }

  getCartItemPrice(cartElement) {
    return cy
      .wrap(cartElement)
      .find(".sc-product-price")
      .first()
      .invoke("text")
      .then((priceText) => {
        return parseFloat(priceText.replace(/[₹,]/g, "").trim()) || 0;
      });
  }

  compareCartWithExpected(cartProducts, expectedList) {
    cy.log("Comparing cart products with expected products");

    expectedList.forEach((expectedProduct) => {
      const matchingCartProduct = cartProducts.find((cartProduct) => {
        const nameMatch = cartProduct.name
          .toLowerCase()
          .includes(expectedProduct.name.toLowerCase().substring(0, 15));

        const priceMatch =
          Math.abs(cartProduct.price - expectedProduct.price) <= 5; // Allow ₹5 tolerance

        return nameMatch && priceMatch;
      });

      expect(
        matchingCartProduct,
        `Matching cart item for: ${expectedProduct.name}`
      ).to.exist;
    });

    cy.log("All expected products found in cart!");
  }

  proceedToCheckout() {
    cy.log("Proceeding to checkout...");
    this.webLocators.proceedToCheckoutButton().should("be.visible").click();
  }

  validateProductDetailsInCheckout() {
    cy.fixture("addedProducts.json").then((expectedProducts) => {
      const expectedNames = expectedProducts.map((p) =>
        p.name.toLowerCase().substring(0, 15)
      ); // match partial names

      this.webLocators.productTitlesInCheckout().each(($el) => {
        const checkoutProductName = $el.textContent.trim().toLowerCase();

        const match = expectedNames.some((expected) =>
          checkoutProductName.includes(expected)
        );
        cy.log(`Validating product in checkout: ${checkoutProductName}`);
        expect(match, `Product "${checkoutProductName}" matched with expected`)
          .to.be.true;
      });
    });
  }

  validateDeliveryAddressFields() {
    cy.log("Validating delivery address fields...");
    this.webLocators.deliveryAddressLabel().should("be.visible");
    this.webLocators.deliveryAddress().should("be.visible");
    cy.log("All delivery address fields are visible");
  }

  getCartTotalPrice() {
    cy.log("Fetching total price of all items in the cart...");

    let totalPrice = 0; // local scoped variable

    return this.webLocators
      .allCartItems()
      .each(($cartElement) => {
        this.getCartItemPrice($cartElement).then((itemPrice) => {
          totalPrice += Number(itemPrice);
        });
      })
      .then(() => {
        cy.log(`Total price of cart items: ₹${totalPrice.toFixed(2)}`);

        // Save the total price into a JSON file
        return cy.writeFile("cypress/fixtures/cartTotalPrice.json", {
          totalPrice: totalPrice,
        });
      })
      .then(() => {
        // After writing file, return totalPrice properly inside Cypress chain
        return totalPrice;
      });
  }

  validateTotalAmount() {
    cy.log("Validating total amount at checkout page...");

    // Step 1: Read expected total amount from JSON
    cy.fixture("cartTotalPrice.json").then((cartData) => {
      const expectedAmount = cartData.totalPrice;

      // Step 2: Fetch displayed total amount from page
      this.webLocators
        .totalAmount()
        .invoke("text")
        .then((totalText) => {
          const totalPrice =
            parseFloat(totalText.replace(/[₹,]/g, "").trim()) || 0;

          cy.log(`Total amount at checkout (UI): ₹${totalPrice}`);
          cy.log(`Expected total amount from file: ₹${expectedAmount}`);

          // Step 3: Assertion
          expect(totalPrice).to.be.closeTo(expectedAmount, 5);
          // Allow slight difference if needed (rounding/taxes)
        });
    });
  }

  deleteCartItemByIndex(index) {
    cy.log(`Deleting cart item at index: ${index}`);

    this.webLocators
      .allCartItems()
      .eq(index)
      .within(() => {
        cy.get("input[value='Delete']").click({ force: true });
      });

    cy.log(`Deleted cart item at index ${index}`);
  }

  validateCartItemCount(expectedCount) {
    cy.log(`Validating total items in cart: Expected = ${expectedCount}`);

    this.webLocators
      .allCartItems()
      .should("have.length", expectedCount)
      .then(($items) => {
        const actualCount = $items.length;
        cy.log(`Found ${actualCount} items in cart`);

        cy.wrap(actualCount).should("equal", expectedCount); //Proper Cypress chaining
      });
  }
}

export default new addToCartPage();
