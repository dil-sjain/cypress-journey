import { get } from "http"

class loginpage1{

    webLocators = {
        getContinuebtn: () => cy.get("input[class='a-button-input']"),
        getEmailtextbx: () => cy.get("input[id='ap_email_login']"),
        getPasswordtextbx: () => cy.get("input[id='ap_password']"),
        getSignInBtn: () => cy.get("input[id='signInSubmit']"),
        getErrorMessage: ()=> cy.contains('h4','There was a problem'),
        getpasswordIncorrectErrorMsg: () => cy.contains('div','password is incorrect'),
        getConditionslink: () => cy.contains('a','Conditions of Use'),
        getPrivacyandtermslink: () => cy.contains('a','Privacy Notice')

      };

    //Actions

    enterUsernameandpass(username,password){
        this.webLocators.getEmailtextbx().type(username)
        this.webLocators.getContinuebtn().click()
        this.webLocators.getPasswordtextbx().type(password)
        this.webLocators.getSignInBtn().click()
        cy.wait(5000)
    }

    validateErrormsgforWrongpass(expectedErrormsg){
        this.webLocators.getErrorMessage().should('contain',expectedErrormsg)
        cy.log("Unable to Login")
    }

    validateTermsAndCOnditions(){
        this.webLocators.getConditionslink().click()
        cy.url().should('include','condition_of_use')
        cy.log('Conditions Of Use page is Displayed :')
        cy.go('back')
        this.webLocators.getPrivacyandtermslink().click()
        cy.url().should('include','privacy_notice')
        cy.log('Privacy and Terms page is Displayed :')
    }

    }
    
    export default new loginpage1();