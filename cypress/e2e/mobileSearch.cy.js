
import search from "../support/pages/SearchPage";
import login from "../support/pages/LoginPage"
import data from "../fixtures/users.json"
describe('Mobile Search and Title Verification', () => {
    beforeEach(() => {
        
        login.loginwithCreds(data.validUser.username, data.validUser.password)
    
    });

    const mobiles = [
        { name: 'iPhone 14', expectedInTitle: 'iPhone 14' },
        { name: 'Samsung Galaxy S23', expectedInTitle: 'Samsung Galaxy' },
        { name: 'OnePlus 11', expectedInTitle: 'OnePlus' }
    ];

    mobiles.forEach(mobile => {
        it(`should search for ${mobile.name} and verify the title`, () => {
            search.searchMobile(mobile.name);
            search.verifyTitleContains(mobile.expectedInTitle);
        });
    });
});
