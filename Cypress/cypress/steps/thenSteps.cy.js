export function thenCreateNewPage() {
  cy.get('a[href="#/editor/page/"]').first().click();
  cy.wait(5000);
}

export function thenInsertTitlePage(title) {
  cy.get('textarea[placeholder="Page title"]').type(title);
  cy.wait(2000);
}

export function thenInsertContentPage(content) {
  cy.get(".kg-prose").first().type(content);
  cy.wait(2000);
}

export function thenClicInPublish() {
  cy.get('button[data-test-button="publish-flow"]').first().click();
  cy.wait(2000);
}

export function thenClicInFinishReview() {
  cy.get('button[data-test-button="continue"]').first().click();
  cy.wait(2000);
}

export function thenClicInPublishPage() {
  cy.get('button[data-test-button="confirm-publish"]').first().click();
  cy.wait(5000);
}

export function thenCloseWindowPagePublished() {
  cy.get('button[data-test-button="close-publish-flow"]').first().click();
  cy.wait(5000);
}

export function thenViewCreatedPage(title, scenarioNo, featureToTest) {
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      expect(text).to.contain(title);
    }
  });
  cy.wait(2000);
  cy.screenshot( "actual/"+featureToTest+"/" +scenarioNo+ "/" + new Date().toISOString());
}

export function thenSelecteCoverImage() {
  cy.get('button[class="gh-editor-feature-image-unsplash"]').first().click();
  cy.wait(3000); // Espera a que se carguen las imágenes
  cy.get('a[class="gh-unsplash-button"]').first().click();
  cy.wait(3000);
}

export function thenViewCreatedPageWithImage(title) {
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      $el.click();
    }
  });
  cy.wait(2000);
}

export function thenValidatePageWithImage(title, scenarioNo, featureToTest) {
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      $el.click();
    }
  });
  cy.wait(2000);
  cy.get("img[role='presentation']").should("have.length.above", 0);
  cy.wait(2000);
  cy.screenshot( "actual/"+featureToTest+"/" +scenarioNo+ "/" + new Date().toISOString());
}

export function thenNavigateToThePages() {
  cy.visit("http://localhost:2368/ghost/#/pages");
  cy.wait(2000);
}

export function thenViewCreatedPageAndLabelDraft(title) {
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      expect(text).to.contain(title);
      cy.get($el).parent().find("p span.draft").should("exist");
    }
  });
  cy.wait(2000);
}

export function thenClicInPreview() {
  cy.get('button[data-test-button="publish-preview"]').first().click();
  cy.wait(3000);
}

export function thenClicInEditor() {
  cy.get('button[class="gh-btn-editor gh-editor-back-button"]').first().click();
  cy.wait(3000);
}

export function thenClicInUpdate() {
  cy.get('button[data-test-button="publish-save"]').first().click();
  cy.wait(3000);
}

// Métodos para Posts en Cypress:

export function thenViewCreatedPost(ghostCurrentVs, title) {
  // Espera a que los títulos de los posts estén presentes en la página
  cy.get(".gh-content-entry-title", { timeout: 2000 }) // Espera hasta 5 segundos a que los elementos aparezcan
    .should("exist"); // Verifica que al menos un título de post esté presente

  // Busca y compara el título del post
  cy.get(".gh-content-entry-title").then((postTitles) => {
    // Convierte la lista de elementos a un array de sus textos
    const titles = [...postTitles].map((post) => post.innerText);

    // Log para depurar los títulos encontrados en la página
    cy.log("Títulos de los posts:", titles);

    // Verifica si el título deseado está en la lista de títulos
    expect(titles).to.include(title);
  });

  cy.screenshot(
    ghostCurrentVs === Cypress.env("ghostBaseVersion")
      ? "baseline/post-published" + "_" + new Date().toISOString()
      : "actual/post-published" + "_" + new Date().toISOString()
  );

  // Pausa opcional para asegurar que cualquier cambio de UI finalice
  cy.wait(2000);
}

export function thenPostCannotBePublished(ghostCurrentVs) {
  cy.get("body") // Espera que el cuerpo de la página esté cargado
    .then(($body) => {
      // Verifica si el botón de publicar existe
      if ($body.find('button[data-test-button="publish-flow"]').length > 0) {
        // Si el botón existe, verifica que no esté visible
        cy.get('button[data-test-button="publish-flow"]', { timeout: 2000 })
          .should("not.be.visible")
          .then(($btn) => {
            if ($btn.is(":visible")) {
              throw new Error("El botón de publicar debería estar oculto.");
            }
            // Captura de pantalla para la prueba
            cy.screenshot(
              ghostCurrentVs === Cypress.env("ghostBaseVersion")
                ? "baseline/post-cannot-published" +
                    "_" +
                    new Date().toISOString()
                : "actual/post-cannot-published" +
                    "_" +
                    new Date().toISOString()
            );
          });
      }
    });
}

// Métodos para Tags en Cypress:

export function thenViewCreatedTag(ghostCurrentVs = null, tagsPage, tagName) {
  // Navegar a la lista de tags
  cy.visit(tagsPage);

  // Captura los títulos de los tags una vez cargados
  cy.get(".gh-tag-list-name") // Obtén todos los elementos de los tags
    .should("exist") // Asegúrate de que los elementos existen
    .then(($tags) => {
      const tagsTitles = $tags.toArray().map((tag) => tag.innerText); // Obtén los textos de los tags

      console.log("Títulos de los tags:", tagsTitles);

      // Verifica si el título esperado está en la lista
      if (!tagsTitles.includes(tagName)) {
        throw new Error(
          `No se encontró el tag llamado "${tagName}" en la lista de tags.`
        );
      }

      // Captura de pantalla para la prueba
      if (ghostCurrentVs !== null) {
        cy.screenshot(
          ghostCurrentVs === Cypress.env("ghostBaseVersion")
            ? "baseline/tag-created" + "_" + new Date().toISOString()
            : "actual/tag-created" + "_" + new Date().toISOString()
        );
      }
    });
}

export function thenTagCreationShouldFail() {
  // Espera hasta que el botón de "Retry" esté visible, indicando el fallo en la creación del tag
  cy.get('span[data-test-task-button-state="failure"]', { timeout: 3000 })
    .should("be.visible")
    .then(($retryButton) => {
      if ($retryButton.is(":visible")) {
        console.log(
          "Test passed: El botón muestra el estado 'Retry' indicando un fallo en la creación."
        );
      } else {
        console.log(
          "Test failed: No se mostró el estado 'Retry', la creación debería haber fallado."
        );
        throw new Error(
          "No se mostró el estado 'Retry', la creación debería haber fallado."
        );
      }
    });
}
