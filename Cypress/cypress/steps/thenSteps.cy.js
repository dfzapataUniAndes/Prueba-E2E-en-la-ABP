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
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
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
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
}

export function thenShowErrorUpdate(scenarioNo, featureToTest) {
  cy.get('div[class="gh-alert-content"]').should(
    "have.text",
    "\n        Update failed: Title cannot be longer than 255 characters.\n    "
  );
  cy.wait(2000);
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
  cy.visit("http://localhost:2368/ghost/#/pages");
  cy.wait(2000);
  cy.get('button[class="gh-btn gh-btn-red"]').first().click();
  cy.wait(2000);
}

export function thenDeletePage(title, scenarioNo, featureToTest) {
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      $el.click();
    }
  });
  cy.wait(2000);
  cy.get("button[data-test-psm-trigger]").first().click();
  cy.wait(2000);
  cy.get('button[data-test-button="delete-post"]').first().click();
  cy.wait(2000);
  cy.get('div[class="modal-content"]')
    .find("p strong")
    .should("have.text", title);
  cy.wait(2000);
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
  cy.get('button[data-test-button="delete-post-confirm"]').first().click();
  cy.wait(2000);
}

export function thenNavigateToThePages() {
  cy.visit("http://localhost:2368/ghost/#/pages");
  cy.wait(2000);
}

export function thenViewCreatedPageAndLabelDraft(
  title,
  scenarioNo,
  featureToTest
) {
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      expect(text).to.contain(title);
      cy.get($el).parent().find("p span.draft").should("exist");
    }
  });
  cy.wait(2000);
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
}

export function thenPageCannotBePublished() {
  cy.get('button[data-test-button="publish-flow"]').should("not.exist");
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

export function thenViewUrlWithTitle(title, scenarioNo, featureToTest) {
  cy.get("button[data-test-psm-trigger]").first().click();
  cy.wait(2000);
  cy.get('a[class="post-view-link"]')
    .first()
    .invoke("removeAttr", "target")
    .click();
  cy.wait(2000);
  cy.get('h1[class="gh-article-title is-title"]').should("have.text", title);
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
}

export function thenViewDate(date, scenarioNo, featureToTest) {
  cy.get('button[data-test-button="update-flow"]').first().click();
  cy.wait(2000);
  cy.get("div[data-test-update-flow-confirmation]")
    .find("p")
    .should("contains.text", date);
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
}

export function thenViewCreatedPageWithFilterDraft(
  title,
  scenarioNo,
  featureToTest
) {
  cy.get("div.gh-contentfilter-type").first().click();
  cy.wait(2000);
  cy.get("ul[class='ember-power-select-options'] li")
    .contains("Draft pages")
    .first()
    .click();
  cy.wait(2000);
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      expect(text).to.contain(title);
      cy.get($el).parent().find("p span.draft").should("exist");
    }
  });
  cy.wait(2000);
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
}

export function thenViewCreatedPageWithFilterMemberOnly(
  title,
  scenarioNo,
  featureToTest
) {
  cy.get("div.gh-contentfilter-visibility").first().click();
  cy.wait(2000);
  cy.get("ul[class='ember-power-select-options'] li")
    .contains("Members-only")
    .first()
    .click();
  cy.wait(2000);
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      expect(text).to.contain(title);
    }
  });
  cy.wait(2000);
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
}

export function thenViewCreatedPageWithFilterPaidMemberOnly(
  title,
  scenarioNo,
  featureToTest
) {
  cy.get("div.gh-contentfilter-visibility").first().click();
  cy.wait(2000);
  cy.get("ul[class='ember-power-select-options'] li")
    .contains("Paid members-only")
    .first()
    .click();
  cy.wait(2000);
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      expect(text).to.contain(title);
    }
  });
  cy.wait(2000);
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
}

export function thenViewError(error, scenarioNo, featureToTest) {
  cy.get('p[data-test-error="authors"]').should("contains.text", error);
  cy.wait(2000);
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
  cy.visit("http://localhost:2368/ghost/#/pages");
  cy.wait(2000);
  cy.get("button[data-test-leave-button]").first().click();
  cy.wait(2000);
}

export function thenViewUrlWithoutTitle(scenarioNo, featureToTest) {
  cy.get("button[data-test-psm-trigger]").first().click();
  cy.wait(2000);
  cy.get('a[class="post-view-link"]')
    .first()
    .invoke("removeAttr", "target")
    .click();
  cy.wait(2000);
  cy.get('h1[class="gh-article-title is-title"]').should("not.exist");
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
}

export function thenViewCreatedPageWithFilterScheduled(
  title,
  scenarioNo,
  featureToTest
) {
  cy.get("div.gh-contentfilter-type").first().click();
  cy.wait(2000);
  cy.get("ul[class='ember-power-select-options'] li")
    .contains("Scheduled pages")
    .first()
    .click();
  cy.wait(2000);
  cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
    const text = $el.text();
    if (text.indexOf(title) > -1) {
      expect(text).to.contain(title);
    }
  });
  cy.wait(2000);
  cy.screenshot(
    "actual/" +
      featureToTest +
      "/" +
      scenarioNo +
      "/" +
      new Date().toISOString()
  );
}

// Métodos para Posts en Cypress:

export function thenViewCreatedPost(title) {
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

  cy.screenshot("actual/post-published" + "_" + new Date().toISOString());

  // Pausa opcional para asegurar que cualquier cambio de UI finalice
  cy.wait(2000);
}

export const thenViewFeatureImage = () => {
  // Verificar que la imagen destacada esté visible en el post
  cy.get(".gh-editor-feature-image").should("be.visible");

  // Validar que la imagen tiene un atributo src que contiene una URL válida
  cy.get(".gh-editor-feature-image")
    .should("have.attr", "src")
    .and("match", /http[s]?:\/\/.*\.(jpg|jpeg|png|gif|bmp)/i); // Comprobamos que el src corresponde a una imagen
};

export function thenPostCannotBePublished() {
  cy.get("body") // Espera que el cuerpo de la página esté cargado
    .then(($body) => {
      // Verifica si el elemento aside.gh-alerts existe
      if ($body.find("aside.gh-alerts").length > 0) {
        cy.get("aside.gh-alerts")
          .should("exist")
          .within(() => {
            // Verifica que el artículo con clase gh-alert-red exista
            cy.get("article.gh-alert.gh-alert-red").should("exist");

            // Verifica el contenido del mensaje de alerta
            cy.get(".gh-alert-content").should(
              "contain.text",
              "Validation failed: Title cannot be longer than 255 characters."
            );

            // Verifica que el botón para cerrar exista
            cy.get('button[data-test-button="close-notification"]').should(
              "exist"
            );
          });
      }
      // Verifica si el botón de publicar existe:
      else if (
        $body.find('button[data-test-button="publish-flow"]').length > 0
      ) {
        // Si el botón existe, verifica que no esté visible
        cy.get('button[data-test-button="publish-flow"]', { timeout: 2000 })
          .should("not.be.visible")
          .then(($btn) => {
            if ($btn.is(":visible")) {
              throw new Error("El botón de publicar debería estar oculto.");
            }
            // Captura de pantalla para la prueba
            cy.screenshot(
              "actual/post-cannot-published" + "_" + new Date().toISOString()
            );
          });
      } else {
        throw new Error(
          "No se encontró el elemento esperado para verificar el mensaje de alerta."
        );
      }
    });
}

// Métodos para Tags en Cypress:
export function thenViewCreatedTag(tagTitle, urlTags) {
  // Normalizar el título del tag esperado
  const normalizedTagTitle = tagTitle.trim().toLowerCase().replace(/\s+/g, " ");

  // Navegar a la lista de tags
  cy.visit(urlTags);

  let loadedTags = [];

  // Función para realizar scroll y cargar elementos dinámicos
  function scrollToBottomUntilComplete() {
    return new Cypress.Promise((resolve) => {
      let loadedTags = []; // Inicializar array de tags
      function performScroll(previousCount) {
        // Esperar que el contenedor principal de tags exista
        cy.get(".gh-main", { timeout: 10000 }).should("exist");

        // Luego buscar los elementos de la lista de tags
        cy.get(".gh-tag-list-name", { timeout: 10000 }).then(($tags) => {
          // Normalizar todos los tags cargados
          const currentTags = $tags
            .toArray()
            .map((tag) =>
              tag.innerText.trim().toLowerCase().replace(/\s+/g, " ")
            );

          const currentCount = currentTags.length;

          // Combinar tags cargados sin duplicados
          loadedTags = [...new Set([...loadedTags, ...currentTags])];

          console.log("Tags cargados actualmente:", currentTags);
          console.log("Total tags encontrados:", loadedTags);

          // Si no hay más tags nuevos después de un scroll, terminar
          if (currentCount === previousCount) {
            resolve(loadedTags);
          } else {
            // Realizar scroll hacia abajo
            cy.get(".gh-main")
              .scrollTo("bottom", { duration: 1000, ensureScrollable: false })
              .then(() => {
                cy.wait(1000).then(() => performScroll(currentCount));
              });
          }
        });
      }

      performScroll(0); // Iniciar con un conteo de 0
    });
  }

  // Realizar el scroll y validar
  scrollToBottomUntilComplete().then((allTags) => {
    console.log("Todos los títulos de tags encontrados:", allTags);

    // Validar si el título esperado está en la lista
    if (!allTags.includes(normalizedTagTitle)) {
      throw new Error(
        `No se encontró el tag llamado "${normalizedTagTitle}" en la lista de tags.`
      );
    }

    console.log(
      `El tag "${normalizedTagTitle}" se encontró correctamente en la lista.`
    );

    // Captura de pantalla para confirmar
    cy.screenshot("tag-found-success");
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
