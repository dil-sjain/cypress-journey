describe('FirstAssignment', () => {
    it("SearchFunctionality", () => {
        //Navigate to Application
        cy.visit("https://www.amazon.com")
        //Click on sign-in 
        cy.get("#nav-link-accountList-nav-line-1").click()
        cy.wait(4000)
        //Enter number or email-id
        cy.xpath("//input[@id='ap_email_login']").type("muthyalavasavi8@gmail.com")
        //Click on continue button
        cy.get(".a-button-input").click()
        //Enter password
        cy.get("input[name='password']").type("Kanna@2321")
        //Click on sign-in button 
        cy.get("input.a-button-input").click()
        // User should be able to login successfully and home screen should be visible
        // searching for samsung mobile phones
        cy.get("#twotabsearchtextbox").type("dairy milk chocolate")
        cy.get("#nav-search-submit-button").click()

       



    })
    
})