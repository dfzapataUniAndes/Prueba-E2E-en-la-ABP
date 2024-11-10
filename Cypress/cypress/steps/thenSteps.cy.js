export function thenCreateNewPage() {
    cy.get('a[href="#/editor/page/"]').click();
    cy.wait(5000);
}