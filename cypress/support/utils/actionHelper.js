class actionHelper {
    clickOnButton(element) {
        cy.log(`Clicking on : ${element}`);
        element.click();
    }

    enterText(element, text) {
        cy.log(`Entering text: ${text} in : ${element}`);
        element.type(text);
    }

    enterTextWithWait(element, text) {
        cy.log(`Entering text: ${text} in : ${element}`);
        element.should('be.visible').then(($el) => {
            if ($el.is(':disabled')) {
                cy.log(`Element ${selector} is disabled, waiting for it to be enabled`);
                cy.waitUntil(() => element.should('not.be.disabled'));
            }
        });
        element.should('be.visible').then(() => {
            element.type(text);
        });
    }

    clearValue(element) {
        cy.log(`Clearing value in : ${element}`);
        element.clear();
    }

    selectDropDown(element, value) {
        cy.log(`Selecting value: ${value} in : ${element}`);
        element.select(value);
    }

    checkCheckbox(element) {
        cy.log(`Checking checkbox: ${element}`);
        element.check();
    }

    uncheckCheckbox(element) {
        cy.log(`Unchecking checkbox: ${element}`);
        element.uncheck();
    }

    hoverOnElement(element) {
        cy.log(`Hovering on element: ${element}`);
        element.trigger('mouseover');
    }

    uploadFile(element, filePath) {
        cy.log(`Uploading file: ${filePath} to element: ${element}`);
        cy.task('verifyFileExists', filePath).then((fileExists) => {
            if (!fileExists) {
                throw new Error(`File does not exist: ${filePath}`);
            }
        });
        element.attachFile(filePath);
    }
    
}

export default new actionHelper();