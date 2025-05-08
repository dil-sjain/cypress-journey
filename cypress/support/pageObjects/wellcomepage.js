class wellcomepage{

    webLocators = {
        getSignInbtn: () => cy.contains('span','Sign in'),
        getAccountListbtn: () => cy.get("span[class='nav-line-2 ']"),
        getDirectSignInbtn: () => cy.get("span[id='nav-link-accountList-nav-line-1']"),
        getSearchTxbOnWellcome: () => cy.get('#twotabsearchtextbox'),
        getSearchbtnWellcome: () => cy.get("#nav-search-submit-button"),

      };

      //Actions

    
    
    }
    
    export default new wellcomepage();