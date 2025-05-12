// import commonUtils from '../support/utils/WebUtils';
class searchPage {
  static totalCartPrice = 0; //Static variable to store total price of items added to cart
  static searchedItemsTotalPrice = 0; //Static variable to store total price of searched items

  webLocators = {
    searchInput: () => cy.get("#twotabsearchtextbox"),
    searchButton: () => cy.get('input.nav-input[type="submit"]'),
    searchResults: () => cy.get("div[role='listitem']"),
    firstProduct: () => cy.get("div.s-main-slot.s-result-list > div").first(),
    leftFilterMenu: () => cy.get("[data-action='s-filter-menu']"),
  };

  //  COMMON METHODS
  clearAndTypeInSearchBox(itemName) {
    this.webLocators.searchInput().clear().type(itemName);
  }

  clickSearchButton() {
    this.webLocators.searchButton().click();
  }

  getProductName(element) {
    return cy
      .wrap(element)
      .find("h2 span")
      .invoke("text")
      .then((text) => text.trim());
  }

  getProductPrice(element) {
    return cy
      .wrap(element)
      .find(".a-price .a-offscreen", { timeout: 5000 })
      .then(($priceEl) => {
        if ($priceEl.length > 0) {
          // Found the price element
          return cy
            .wrap($priceEl)
            .first()
            .invoke("text")
            .then((priceText) => {
              const cleanPrice = parseFloat(
                priceText.replace(/[₹,]/g, "").trim()
              );
              return isNaN(cleanPrice) ? 0 : cleanPrice;
            });
        } else {
          // Price not found
          cy.log("No price found, returning 0");
          return 0;
        }
      });
  }

  //  PAGE ACTIONS

  validateSearchBoxIsEmpty() {
    this.webLocators
      .searchInput()
      .invoke("attr", "placeholder")
      .should((placeholder) => {
        expect(placeholder.trim()).to.equal("Search Amazon.in");
      });
  }

  searchForItem(itemName) {
    this.clearAndTypeInSearchBox(itemName);
    this.clickSearchButton();
  }

  validateFirstResultsContain(text) {
    this.webLocators.searchResults().first().should("contain.text", text);
  }

  validateResultsContain(text) {
    this.webLocators.searchResults().each(($el) => {
      cy.wrap($el).should("contain.text", text);
    });
  }

  validateResultsNotContain(text) {
    this.webLocators.searchResults().each(($el) => {
      cy.wrap($el).should("not.contain.text", text);
    });
  }

  clickFirstProduct() {
    this.webLocators.firstProduct().find("h2 a").click();
  }

  selectFilter(categoryName, valueName, expandIfNeeded = true) {
    cy.log(`Selecting from category: ${categoryName}, value: ${valueName}`);

    this.webLocators
      .leftFilterMenu()
      .contains("span", categoryName, { matchCase: false })
      .parents("div")
      .eq(1)
      .within(() => {
        cy.contains("span", valueName, { matchCase: false }).then(
          ($valueElement) => {
            if ($valueElement.length) {
              cy.wrap($valueElement).scrollIntoView().click({ force: true });
            } else if (expandIfNeeded) {
              cy.contains("See more", { matchCase: false })
                .scrollIntoView()
                .click({ force: true })
                .then(() => {
                  cy.contains("span", valueName, { matchCase: false })
                    .scrollIntoView()
                    .click({ force: true });
                });
            } else {
              cy.log(`Filter "${valueName}" not found and expand is disabled`);
              throw new Error(`Filter "${valueName}" not found`);
            }
          }
        );
      });

    cy.customWait(2);
  }

  validateResultsContainAtLeast(text, passPercentage) {
    this.webLocators.searchResults().then(($products) => {
      const totalProducts = $products.length;
      let matchedCount = 0;
      let checkedCount = 0;
      const mismatchedProducts = [];

      cy.wrap($products)
        .each(($el, index, $list) => {
          cy.wrap($el)
            .invoke("text")
            .then((productText) => {
              checkedCount++;

              if (productText.toLowerCase().includes(text.toLowerCase())) {
                matchedCount++;
              } else {
                mismatchedProducts.push(productText.trim().substring(0, 100));
              }

              const matchPercentage = (matchedCount / checkedCount) * 100;
              const maxPossiblePercentage =
                ((matchedCount + ($list.length - checkedCount)) /
                  $list.length) *
                100;

              if (maxPossiblePercentage < passPercentage) {
                cy.log(`Failing early after ${checkedCount} checks.`);
                mismatchedProducts
                  .slice(0, 5)
                  .forEach((m, idx) => cy.log(`Mismatch ${idx + 1}: ${m}`));
                throw new Error(
                  `Fail Early: Max possible ${maxPossiblePercentage.toFixed(
                    2
                  )}% < required ${passPercentage}%`
                );
              }
            });
        })
        .then(() => {
          const finalMatchPercentage = (matchedCount / totalProducts) * 100;
          cy.log(
            `Final Match: ${matchedCount}/${totalProducts} products (${finalMatchPercentage.toFixed(
              2
            )}%)`
          );

          if (finalMatchPercentage < passPercentage) {
            mismatchedProducts
              .slice(0, 5)
              .forEach((m, idx) => cy.log(`Mismatch ${idx + 1}: ${m}`));
          }

          expect(
            finalMatchPercentage,
            `Expected at least ${passPercentage}%`
          ).to.be.greaterThan(passPercentage);
        });
    });
  }

  fetchAndSaveSearchedItems() {
    cy.log("Fetching all searched item details...");
    const productsArray = [];
    let localTotal = 0;

    this.webLocators
      .searchResults()
      .then(($products) => {
        cy.wrap($products).each(($el, index) => {
          const product = {};

          this.getProductName($el).then((name) => {
            product.name = name;
          });

          // this.getProductPrice($el).then((price) => {
          //   product.price = price;
          //   localTotal += price;
          // });

          cy.then(() => {
            productsArray.push(product);
            cy.log(`Product ${index + 1}:`, JSON.stringify(product, null, 2));
            console.log(`Product ${index + 1}:`, product);
          });
        });
      })
      .then(() => {
        searchPage.searchedItemsTotalPrice = localTotal;
        cy.log(
          `Total Sum of Product Prices: ₹${searchPage.searchedItemsTotalPrice.toFixed(
            2
          )}`
        );
        cy.writeFile("cypress/fixtures/searchedProducts.json", productsArray);
        cy.log(
          "Saved searched products to 'cypress/fixtures/searchedProducts.json'"
        );
      });
  }

  addProductsToCart(numberOfProductsToAdd) {
    cy.log(`Adding ${numberOfProductsToAdd} products to cart`);
    const addedProducts = [];

    let totalPrice = 0; // local total tracker

    this.webLocators
      .searchResults()
      .each(($el, index) => {
        if (index < numberOfProductsToAdd) {
          cy.wrap($el)
            .find("button[name='submit.addToCart']")
            .then(($btn) => {
              if ($btn.length > 0) {
                cy.wrap($btn).scrollIntoView().click({ force: true });

                const product = {};

                this.getProductName($el).then((name) => {
                  product.name = name;
                });

                this.getProductPrice($el).then((price) => {
                  product.price = price;

                  cy.then(() => {
                    totalPrice += price;
                    addedProducts.push(product);
                    cy.log(
                      `Product ${index + 1}: ${
                        product.name
                      } (₹${price}) added to cart.`
                    );
                  });
                });
              } else {
                cy.log(`Product ${index + 1}: Add to Cart button not found.`);
              }
            });

          cy.customWait(5);
        }
      })
      .then(() => {
        cy.log(`Added ${addedProducts.length} products to cart.`);
        cy.writeFile("cypress/fixtures/addedProducts.json", addedProducts);
        cy.log("Saved added products to 'cypress/fixtures/addedProducts.json'");

        // searchPage.totalCartPrice = totalPrice; //Save it into static variable
        // cy.log(
        //   `Total price of added products: ₹${addToCartPage.totalCartPrice}`
        // );
      });
  }

  getTotalCartPrice() {
    return searchPage.totalCartPrice; //Getter for static total
  }
}

export default new searchPage();
