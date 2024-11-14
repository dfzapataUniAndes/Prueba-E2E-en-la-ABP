export function thenCreateNewPage() {
  cy.get('a[href="#/editor/page/"]').first().click();
  cy.wait(5000);
  cy.screenshot("crear_nueva_pagina");
}

export function thenInsertTitlePage(title) {
  cy.get('textarea[placeholder="Page title"]').type(title);
  cy.wait(2000);
  cy.screenshot("insertar_titulo_pagina");
}

export function thenInsertContentPage(content) {
  cy.get(".kg-prose").first().type(content);
  cy.wait(2000);
  cy.screenshot("insertar_contenido_pagina");
}

export function thenClicInPublish() {
  cy.get('button[data-test-button="publish-flow"]').first().click();
  cy.wait(2000);
  cy.screenshot("clic_en_publicar");
}

export function thenClicInFinishReview() {
  cy.get('button[data-test-button="continue"]').first().click();
  cy.wait(2000);
  cy.screenshot("finalizar_revision");
}

export function thenClicInPublishPage() {
  cy.get('button[data-test-button="confirm-publish"]').first().click();
  cy.wait(5000);
  cy.screenshot("publicar_pagina");
}

export function thenCloseWindowPagePublished() {
  cy.get('button[data-test-button="close-publish-flow"]').first().click();
  cy.wait(5000);
  cy.screenshot("cerrar_ventana_publicada");
}

export function thenViewCreatedPage(title) {
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      expect(text).to.contain(title);
    }
  });
  cy.wait(2000);
  cy.screenshot("ver_pagina_creada");
}

export function thenSelecteCoverImage() {
  cy.get('button[class="gh-editor-feature-image-unsplash"]').first().click();
  cy.wait(3000);
  cy.get('a[class="gh-unsplash-button"]').first().click();
  cy.wait(3000);
  cy.screenshot("seleccionar_imagen_portada");
}

export function thenViewCreatedPageWithImage(title) {
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      $el.click();
    }
  });
  cy.wait(2000);
  cy.screenshot("ver_pagina_con_imagen");
}

export function thenValidatePageWithImage() {
  cy.get("img[role='presentation']").should("have.length.above", 0);
  cy.wait(2000);
  cy.screenshot("validar_pagina_con_imagen");
}

export function thenClicInPreview() {
  cy.get('button[data-test-button="publish-preview"]').first().click();
  cy.wait(3000);
  cy.screenshot("clic_en_preview");
}

export function thenClicInEditor() {
  cy.get('button[class="gh-btn-editor gh-editor-back-button"]').first().click();
  cy.wait(3000);
  cy.screenshot("clic_en_editor");
}

export function thenClicInUpdate() {
  cy.get('button[data-test-button="publish-save"]').first().click();
  cy.wait(3000);
  cy.screenshot("clic_en_actualizar");
}
