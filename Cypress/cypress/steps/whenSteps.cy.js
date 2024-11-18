export function whenNavigateToThePages() {
  cy.visit("http://localhost:2368/ghost/#/pages");
  cy.wait(5000);
}

export function whenCreateNewPost() {
  // Haz clic en el botón de crear nuevo post
  cy.get('a[href="#/editor/post/"]').first().click();
}

export function whenCreateNewTag() {
  // Haz clic en el botón de crear nuevo tag
  cy.get('a[href="#/tags/new/"]').first().click();
}
