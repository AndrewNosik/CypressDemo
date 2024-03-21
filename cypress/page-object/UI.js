class UI {
    selectors = {
        crumb: '.crumb',
        input: '[formcontrolname="input"]',
        button: '.button'
    }

    elements = {
        crumb: () => cy.get(this.selectors.crumb),
        input: () => cy.get(this.selectors.input),
        button: () => cy.get(this.selectors.button),
    }

    click(string) {
        this.elements.crumb().should('be.visible');
        this.elements.input().type(string);
        this.elements.button().click();
        cy.get('result').should('be.visible').contains(string); // check that string is saved and present on the page
    }
}

export default new UI