///reference types="cypress" />
describe('Assignment 1 Amazon Login', () => {
    beforeEach(() => {
        cy.visit('https://www.amazon.in'); 
    });

    it('Amazon Login ', () => {
        cy.get('#nav-link-accountList-nav-line-1').click();
        cy.get('#ap_email_login').type('9307056667');//Enter your email or phone number
        cy.get('#continue').click();
        cy.get('#ap_password').type('Ankita@54321!');//Enter your password
        cy.get('#signInSubmit').click();
        
    });

    it('Amazon Search', () => {
        cy.get('#twotabsearchtextbox').type('iphone 16e{enter}');
        cy.get('.s-main-slot').should('exist');
       // cy.get('#nav-search-submit-button').should('exist').click;
    }
    );

    it('Amazon Add to Cart', () => {
        cy.get('#twotabsearchtextbox').type('iphon  16 128gb{enter}');
        
        cy.xpath('//span[contains(text(),"iPhone 16e 128 GB")]').then(($ele)=>{
            cy.log($ele.text())
            if ($ele.text()==='iPhone 16e 128 GB')
                {
                cy.wrap($ele).click({force:true})
                cy.log('iphone 16 128gb clicked')
                }
            });
            
       
        cy.get('.s-main-slot').should('exist');
        cy.wait(2000);
        //cy.get('.a-section:visible').find('.a-section.a-spacing-none.puis-padding-right-small.s-title-instructions-style').eq(1);
    
        cy.get('#a-autoid-1-announce').contains('Add to cart').click();
        // cy.get('#a-autoid-1-announce').click();
        
    });
    it('Go to Cart', () => {
        cy.get('#nav-cart-count-container').click();
        //cy.get('.a-size-medium.sc-product-title.a-text-bold').should('exist');
    });
    
});