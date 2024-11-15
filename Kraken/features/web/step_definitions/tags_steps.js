const { When, Then } = require("@cucumber/cucumber");

When("navego a la página de creación de tags", async function () {
  await this.driver.url("http://localhost:2368/ghost/#/tags/new");
});

When(
  "creo un nuevo tag con el nombre {string} y descripción {string}",
  async function (tagName, tagDescription) {
    // Seleccionamos el campo de nombre del tag usando el atributo data-test-input
    const tagNameInput = await this.driver.$(
      'input[data-test-input="tag-name"]'
    );
    await tagNameInput.setValue(tagName);

    // Seleccionamos el campo de descripción del tag usando el atributo data-test-input
    const tagDescriptionInput = await this.driver.$(
      'textarea[data-test-input="tag-description"]'
    );
    await tagDescriptionInput.setValue(tagDescription);

    // Seleccionamos el botón de guardar usando el atributo data-test-button
    const publishButton = await this.driver.$(
      'button[data-test-button="save"]'
    );
    await publishButton.click();

    await this.driver.pause(1000); // Espera a que se complete la creación del tag
  }
);

When(
  "creo un nuevo tag con el nombre {string} y descripción vacia",
  async function (tagName) {
    // Seleccionamos el campo de nombre del tag usando el atributo data-test-input
    const tagNameInput = await this.driver.$(
      'input[data-test-input="tag-name"]'
    );
    await tagNameInput.setValue(tagName);

    // Seleccionamos el campo de descripción del tag usando el atributo data-test-input
    const tagDescriptionInput = await this.driver.$(
      'textarea[data-test-input="tag-description"]'
    );
    await tagDescriptionInput.setValue("");

    // Seleccionamos el botón de guardar usando el atributo data-test-button
    const publishButton = await this.driver.$(
      'button[data-test-button="save"]'
    );
    await publishButton.click();

    await this.driver.pause(1000); // Espera a que se complete la creación del tag
  }
);

When(
  "creo un nuevo tag con el nombre vacio y descripción {string}",
  async function (tagDescription) {
    // Seleccionamos el campo de nombre del tag usando el atributo data-test-input
    const tagNameInput = await this.driver.$(
      'input[data-test-input="tag-name"]'
    );
    await tagNameInput.setValue("");

    // Seleccionamos el campo de descripción del tag usando el atributo data-test-input
    const tagDescriptionInput = await this.driver.$(
      'textarea[data-test-input="tag-description"]'
    );
    await tagDescriptionInput.setValue(tagDescription);

    // Seleccionamos el botón de guardar usando el atributo data-test-button
    const publishButton = await this.driver.$(
      'button[data-test-button="save"]'
    );
    await publishButton.click();

    await this.driver.pause(1000); // Espera a que se complete la creación del tag
  }
);

When(
  "creo un nuevo tag con el nombre {string} y descripción excesivamente larga",
  async function (tagName) {
    // Seleccionamos el campo de nombre del tag usando el atributo data-test-input
    const tagNameInput = await this.driver.$(
      'input[data-test-input="tag-name"]'
    );
    await tagNameInput.setValue(tagName);

    // Seleccionamos el campo de descripción del tag usando el atributo data-test-input
    const tagDescriptionInput = await this.driver.$(
      'textarea[data-test-input="tag-description"]'
    );

    // Creamos una cadena de caracteres larga de mas de 500 caracteres:
    const longString = "a".repeat(550);

    await tagDescriptionInput.setValue(longString);

    // Seleccionamos el botón de guardar usando el atributo data-test-button
    const publishButton = await this.driver.$(
      'button[data-test-button="save"]'
    );
    await publishButton.click();

    await this.driver.pause(1000); // Espera a que se complete la creación del tag
  }
);

Then(
  "debería ver el tag titulado {string} en la lista de tags",
  async function (tagName) {
    // Navegar a la lista de tags:
    await this.driver.url("http://localhost:2368/ghost/#/tags");

    // Captura los títulos de los tags una vez cargados
    const tags = await this.driver.$$(".gh-tag-list-name");
    const tagsTitlesPromises = tags.map((tag) => tag.getText()); // Obtener los textos de los elementos directamente

    // Esperar a que todas las promesas se resuelvan y obtener los títulos
    const tagsTitles = await Promise.all(tagsTitlesPromises);

    console.log("Títulos de los tags:", tagsTitles);

    // Verifica si el título esperado está en la lista
    if (!tagsTitles.includes(tagName)) {
      throw new Error(
        `No se encontró el tag llamado "${tagName}" en la lista de tags.`
      );
    }
  }
);

Then("no deberia ser posible crear el tag", async function () {
  // Esperamos a que el botón cambie a "Retry", indicando el fallo en la creación del tag
  const retryButton = await this.driver.$(
    'span[data-test-task-button-state="failure"]'
  );
  const isRetryVisible = await retryButton.waitForDisplayed({ timeout: 3000 }); // Espera hasta 3 segundos para que aparezca

  if (isRetryVisible) {
    console.log(
      "Test passed: El botón muestra el estado 'Retry' indicando un fallo en la creación."
    );
  } else {
    console.log(
      "Test failed: No se mostró el estado 'Retry', la creación debería haber fallado."
    );
    throw new Error(
      `No se mostró el estado 'Retry', la creación debería haber fallado.`
    );
  }
});
