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

export function thenViewCreatedPage(title) {
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      expect(text).to.contain(title);
    }
  });
  cy.wait(2000);
}

export function thenCloseSession() {
  cy.visit("http://localhost:2368/ghost/#/signout");
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

export function thenValidatePageWithImage() {
  cy.get("img[role='presentation']").should("have.length.above", 0);
  cy.wait(2000);
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

// Métodos para Posts en Cypress:

export function thenInsertTitlePost(title) {
  // Espera que el campo de título esté visible y escribe el título del post
  const titleField = cy
    .get('textarea[placeholder="Post title"]', {
      timeout: 5000,
    })
    .first();

  // Si el título es vacío, no intentamos escribir nada
  if (title.trim() === "") {
    titleField.clear(); // Asegura que el campo quede vacío
  } else {
    titleField.type(title); // Escribe el título si no está vacío
  }
}

export function thenInsertContentPost(content) {
  const contentField = cy.get(".kg-prose", { timeout: 5000 }).first();

  // Si el contenido es vacío, no intentamos escribir nada
  if (content.trim() === "") {
    contentField.clear(); // Asegura que el campo quede vacío
  } else {
    contentField.type(content); // Escribe el contenido si no está vacío
  }
}

export function thenCreateNewPost() {
  // Haz clic en el botón de crear nuevo post
  cy.get('a[href="#/editor/post/"]').first().click();
}

export function thenClicInPublishPost() {
  // Haz clic en el botón de publicación:
  cy.get('button[data-test-button="publish-flow"]', { timeout: 5000 })
    .first()
    .click();

  // Haz clic en el botón de flujo de publicación
  cy.get('button[data-test-button="continue"]', { timeout: 5000 })
    .first()
    .click();
}

export function thenClicInFinishReviewPost() {
  // Haz clic en el botón de continuar para finalizar la revisión
  cy.get('button[data-test-button="confirm-publish"]', { timeout: 5000 })
    .first()
    .click();
}

export function thenClicInConfirmPublishPost() {
  // Haz clic en el botón de confirmación de publicación
  cy.get('button[data-test-button="confirm-publish"]', { timeout: 5000 })
    .first()
    .click();
}

export function thenCloseWindowPostPublished() {
  // Cierra el modal de publicación una vez completado
  cy.get('button[data-test-button="close-publish-flow"]', { timeout: 5000 })
    .first()
    .click();
}

export function thenViewCreatedPost(title) {
  // Espera a que los títulos de los posts estén presentes en la página
  cy.get(".gh-content-entry-title", { timeout: 5000 }) // Espera hasta 5 segundos a que los elementos aparezcan
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

  // Pausa opcional para asegurar que cualquier cambio de UI finalice
  cy.wait(2000);
}

export function thenPostCannotBePublished() {
  cy.get("body") // Espera que el cuerpo de la página esté cargado
    .then(($body) => {
      // Verifica si el botón de publicar existe
      if ($body.find('button[data-test-button="publish-flow"]').length > 0) {
        // Si el botón existe, verifica que no esté visible
        cy.get('button[data-test-button="publish-flow"]', { timeout: 10000 })
          .should("not.be.visible")
          .then(($btn) => {
            if ($btn.is(":visible")) {
              throw new Error("El botón de publicar debería estar oculto.");
            }
          });
      }
    });
}

// Métodos para Tags en Cypress:
export function thenCreateNewTag() {
  // Haz clic en el botón de crear nuevo tag
  cy.get('a[href="#/tags/new/"]').first().click();
}

export function thenInsertTitleTag(title) {
  // Espera que el campo de título esté visible y escribe el título del tag
  const titleField = cy
    .get('input[data-test-input="tag-name"]', {
      timeout: 5000,
    })
    .first();
  // Si el título es vacío, no intentamos escribir nada
  if (title.trim() === "") {
    titleField.clear(); // Asegura que el campo quede vacío
  } else {
    titleField.type(title); // Escribe el título si no está vacío
  }
}

export function thenInsertTagDescription(description) {
  // Espera que el campo de título esté visible y escribe el título del tag
  const titleField = cy
    .get('textarea[data-test-input="tag-description"]', {
      timeout: 5000,
    })
    .first();
  if (description.trim() === "") {
    titleField.clear();
  } else {
    titleField.type(description);
  }
}

export function thenClickInSaveTag() {
  // Haz clic en el botón de publicación:
  cy.get('button[data-test-button="save"]', { timeout: 5000 }).first().click();
  cy.wait(2000);
}

export function thenViewCreatedTag(tagName) {
  // Navegar a la lista de tags
  cy.visit("http://localhost:2368/ghost/#/tags");

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
