class assertHelper {
    elementText(element, expectedText) {
        cy.log(`Asserting text of ${element} is "${expectedText}"`);
        element.should('have.text', expectedText, `Expected element ${element} to have text: ${expectedText}`);
        
    }

    elementVisibility(element) {
        cy.log(`Asserting visibility of ${element}`);
        element.should('be.visible',{timeout:30000});
        
    }

    elementContainText(element, expectedText) {
        cy.log(`Asserting ${element} contains text: "${expectedText}"`);
        element.should('contain', expectedText, `Expected element ${element} to contain text: ${expectedText}`);
        
    }

    elementValue(element, expectedText){
        cy.log(`Asserting value of ${element} is "${expectedText}"`);
        element.should('have.value', expectedText, `Expected element ${element} to have value: ${expectedText}`);
        
    }
    pageUrlIncludes(expectedUrl) {
        cy.log(`Asserting URL includes: "${expectedUrl}"`);
        cy.url().should('include', expectedUrl, `Expected URL to include: ${expectedUrl}`);
        
    }
    expectedValue(actualValue, expectedValue) {
        cy.log(`Asserting count of ${actualValue} is "${expectedValue}"`);
        expect(actualValue).to.equal(expectedValue);
        
    }   
    expectedValueNotEqual(actualValue, expectedValue) {
        cy.log(`Asserting count of ${actualValue} is not equal to "${expectedValue}"`);
        expect(actualValue).not.to.equal(expectedValue);
        
    }
        
    
    elementTextWithTrim(element, expectedText) {
    cy.log(`Asserting text of ${element} is "${expectedText}"`);
    element.invoke('text').then((text) => {
        expect(text.trim()).to.equal(expectedText);
    });
}
}


export default new assertHelper();