// Metodos and para posts:

export function andInsertTitlePost(title) {
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

export function andInsertContentPost(content) {
  const contentField = cy.get(".kg-prose", { timeout: 5000 }).first();

  // Si el contenido es vacío, no intentamos escribir nada
  if (content.trim() === "") {
    contentField.clear(); // Asegura que el campo quede vacío
  } else {
    contentField.type(content); // Escribe el contenido si no está vacío
  }
}

export function andClicInPublishPost() {
  // Haz clic en el botón de publicación:
  cy.get('button[data-test-button="publish-flow"]', { timeout: 5000 })
    .first()
    .click();

  // Haz clic en el botón de flujo de publicación
  cy.get('button[data-test-button="continue"]', { timeout: 5000 })
    .first()
    .click();
}

export function andClicInFinishReviewPost() {
  // Haz clic en el botón de continuar para finalizar la revisión
  cy.get('button[data-test-button="confirm-publish"]', { timeout: 5000 })
    .first()
    .click();
}

export function andClicInConfirmPublishPost() {
  // Haz clic en el botón de confirmación de publicación
  cy.get('button[data-test-button="confirm-publish"]', { timeout: 5000 })
    .first()
    .click();
}

export function andCloseWindowPostPublished() {
  // Cierra el modal de publicación una vez completado
  cy.get('button[data-test-button="close-publish-flow"]', { timeout: 5000 })
    .first()
    .click();
}

export function andCloseSession() {
  cy.visit("http://localhost:2368/ghost/#/signout");
}

// Metodos and para tags:
export function andInsertTitleTag(title) {
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

export function andInsertTagDescription(description) {
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

export function andClickInSaveTag() {
  // Haz clic en el botón de publicación:
  cy.get('button[data-test-button="save"]', { timeout: 5000 }).first().click();
  cy.wait(2000);
}
