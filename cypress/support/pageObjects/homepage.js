class homepage{


    webLocators = {
        getSearchbtnHome: () => cy.get("#nav-search-submit-button"),
        getSearchTxbOnHome: () => cy.get('#twotabsearchtextbox'),
        getAddToCartLogoBtn: () => cy.get("#nav-cart-count")


    };


    //Actions
    checkHomepage(){
        //cy.title().should('include','Online Shopping site in India')
        cy.url().should('include','?ref_=nav_ya_signin')
        cy.log('Homepage is Displayed')
    }
    
    
    }
    
    export default new homepage();