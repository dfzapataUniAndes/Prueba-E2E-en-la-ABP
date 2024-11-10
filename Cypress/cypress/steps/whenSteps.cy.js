export function whenNavigateToThePages() {
    cy.visit('http://localhost:2368/ghost/#/pages');
    cy.wait(5000)
}