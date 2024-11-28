export function whenNavigateToThePages() {
  cy.visit("http://localhost:2368/ghost/#/pages");
  cy.wait(5000);
}

export function whenCreateNewPost() {
  // Haz clic en el botón de crear nuevo post
  cy.get('a[href="#/editor/post/"]').first().click();
}

export function whenCreateNewTag() {
  // Asegurarse de estar en la página correcta
  cy.url().should("include", "/ghost/#/tags");

  // Buscar y hacer clic en el botón
  cy.get('a[href="#/tags/new/"]', { timeout: 10000 })
    .should("exist")
    .and("be.visible")
    .first()
    .click();
}

export function whenCreateNewPage() {
  cy.get('a[href="#/editor/page/"]').first().click();
  cy.wait(5000);
}
