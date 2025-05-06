import AmazonPage from "../POM/Login.js";

describe('Amazon Login and Search Test', () => {
    const amazonPage = new AmazonPage();

    it('logs in and searches for items', () => {
        // Visit Amazon and log in
        amazonPage.visit();
        amazonPage.clickSignIn();
        amazonPage.enterEmail('akanksha.vishwanath7@gmail.com');
        amazonPage.clickContinue();
        amazonPage.enterPassword('Advaitha@7');
        amazonPage.clickSignInSubmit();

        // Search for items
        amazonPage.searchItem('Bottle');
        amazonPage.searchItem('tote bag');
        amazonPage.searchItem('shampoo');
    });
});