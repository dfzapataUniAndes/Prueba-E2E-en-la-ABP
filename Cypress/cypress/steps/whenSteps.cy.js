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

export const whenAddFeatureImage = (imagePath) => {
  // Hacer clic en el botón de agregar imagen destacada
  cy.get("button").contains("Add feature image").click();

  // Seleccionar el archivo de imagen desde la ruta proporcionada
  cy.get('input[type="file"]').selectFile(imagePath, { force: true });

  // Validar que la imagen se ha cargado correctamente
  cy.get(".gh-editor-feature-image").should("be.visible");
};
