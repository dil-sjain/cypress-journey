class errorHelper {

    errorForNaN(value) {
        if(isNaN(value)) {
            return `The value "${value}" is not a number`;
        }
    }   
  
  static logError(error) {
    const message = this.getErrorMessage(error);
    cy.log(`Error: ${message}`);
  }
}
export default new errorHelper();