const { Given, When, Then } = require("@cucumber/cucumber");

Given("que navego a la página {string}", async function (url) {
  await this.driver.url(url);
});

Given("espero {int} segundos", async function (segundos) {
  await this.driver.pause(segundos * 1000);
});

Given("que no existe ningún post creado en el sistema", async function () {
  // Navega a la página de posts y verifica que no haya posts.
  await this.driver.url("http://localhost:2368/ghost/#/posts");
  await this.driver.pause(1000); // Espera para cargar la página
  const posts = await this.driver.$$(".gh-post-list-title");

  // Verifica que la longitud de la lista de posts sea 0
  if (posts.length !== 0) {
    throw new Error(
      "Se esperaba que no hubiera posts, pero se encontraron posts en el sistema."
    );
  }
});

When("ingreso el correo {kraken-string}", async function (email) {
  const emailInput = await this.driver.$('input[name="identification"]');
  await emailInput.setValue(email);
});

When("ingreso la contraseña {kraken-string}", async function (password) {
  const passwordInput = await this.driver.$('input[name="password"]');
  await passwordInput.setValue(password);
});

When("hago clic en iniciar sesión", async function () {
  const loginButton = await this.driver.$('button[type="submit"]');
  await loginButton.click();
});

When("navego a la página de creación de posts", async function () {
  await this.driver.url("http://localhost:2368/ghost/#/editor/post");
});

When(
  "creo un nuevo post con el título {string} y contenido {string}",
  async function (titulo, contenido) {
    const titleInput = await this.driver.$(
      'textarea[placeholder="Post title"]'
    );
    await titleInput.setValue(titulo);
    const contentInput = await this.driver.$(".kg-prose");
    await contentInput.setValue(contenido);

    // Publicar el post
    const publishButton = await this.driver.$(
      'button[data-test-button="publish-flow"]'
    );
    await publishButton.click();
    // Confirmar la publicación:
    const confirmPublishButton = await this.driver.$(
      'button[data-test-button="continue"]'
    );
    await confirmPublishButton.click();

    // Confirmar definitivmanete la publicación:
    const confirmPublishButton2 = await this.driver.$(
      'button[data-test-button="confirm-publish"]'
    );
    await confirmPublishButton2.click();

    await this.driver.pause(1000); // Espera a que se complete la publicación
  }
);

Then(
  "debería ver el post titulado {string} en la lista de posts",
  async function (titulo) {
    // Localiza el botón de cierre del modal usando el atributo data-test-button
    const closeModalButton = await this.driver.$(
      'button[data-test-button="close-publish-flow"]'
    );

    // Verificar si el botón de cierre está presente
    if (await closeModalButton.isExisting()) {
      await closeModalButton.click();
      await this.driver.pause(500); // Pausa breve para asegurar que el modal se cierre
    } else {
      console.log("El botón de cierre del modal no está presente.");
      throw new Error(
        `No se encontró el modal para cerrar y poder continuar con la prueba.`
      );
    }

    // Espera a que los títulos de los posts estén presentes en la página
    await this.driver.$(".gh-content-entry-title").waitForExist({
      timeout: 5000, // Tiempo máximo de espera en milisegundos
      timeoutMsg:
        "Los títulos de los posts no se cargaron en el tiempo esperado",
    });

    // Captura los títulos de los posts una vez cargados
    const posts = await this.driver.$$(".gh-content-entry-title");
    const postTitlesPromises = posts.map((post) => post.getText()); // Obtener los textos de los elementos directamente

    // Esperar a que todas las promesas se resuelvan y obtener los títulos
    const postTitles = await Promise.all(postTitlesPromises);

    console.log("Títulos de los posts:", postTitles);

    // Verifica si el título esperado está en la lista
    if (!postTitles.includes(titulo)) {
      throw new Error(
        `No se encontró el post titulado "${titulo}" en la lista de posts.`
      );
    }
  }
);

Then(
  "no debería ser posible crear un post con campos vacíos",
  async function () {
    const publishButton = await this.driver.$(
      'button[data-test-button="publish-flow"]'
    );
    const isPublishButtonVisible = await publishButton.isDisplayed();

    if (isPublishButtonVisible) {
      throw new Error("El botón de publicar debería estar oculto.");
    }
  }
);

When(
  "creo un nuevo post con título {string} y contenido vacio",
  async function (titulo) {
    const titleInput = await this.driver.$(
      'textarea[placeholder="Post title"]'
    );
    await titleInput.setValue(titulo);

    // Crear un contenido vacío:
    const contentInput = await this.driver.$(".kg-prose");
    await contentInput.setValue("");

    // Publicar el post
    const publishButton = await this.driver.$(
      'button[data-test-button="publish-flow"]'
    );
    await publishButton.click();
    // Confirmar la publicación:
    const confirmPublishButton = await this.driver.$(
      'button[data-test-button="continue"]'
    );
    await confirmPublishButton.click();

    // Confirmar definitivmanete la publicación:
    const confirmPublishButton2 = await this.driver.$(
      'button[data-test-button="confirm-publish"]'
    );
    await confirmPublishButton2.click();

    await this.driver.pause(1000); // Espera a que se complete la publicación
  }
);

When(
  "creo un nuevo post con título vacio y contenido {string}",
  async function (contenido) {
    const titleInput = await this.driver.$(
      'textarea[placeholder="Post title"]'
    );
    await titleInput.setValue("");

    // Crear un contenido vacío:
    const contentInput = await this.driver.$(".kg-prose");
    await contentInput.setValue(contenido);

    // Publicar el post
    const publishButton = await this.driver.$(
      'button[data-test-button="publish-flow"]'
    );
    await publishButton.click();
    // Confirmar la publicación:
    const confirmPublishButton = await this.driver.$(
      'button[data-test-button="continue"]'
    );
    await confirmPublishButton.click();

    // Confirmar definitivmanete la publicación:
    const confirmPublishButton2 = await this.driver.$(
      'button[data-test-button="confirm-publish"]'
    );
    await confirmPublishButton2.click();

    await this.driver.pause(1000); // Espera a que se complete la publicación
  }
);

Then("cierro sesión en Ghost", async function () {
  // Esperar que el avatar de usuario esté presente en el DOM antes de interactuar
  const userMenuButton = await this.driver.$(".gh-user-avatar");
  await this.driver.waitUntil(async () => await userMenuButton.isDisplayed(), {
    timeout: 5000,
    timeoutMsg:
      "El botón de menú de usuario no se mostró en el tiempo esperado",
  });

  // Hacer clic en el avatar de usuario para abrir el menú
  await userMenuButton.click();

  // Esperar a que la opción de cerrar sesión sea visible y hacer clic en ella
  const logoutButton = await this.driver.$('a[href="#/signout/"]');
  await this.driver.waitUntil(async () => await logoutButton.isDisplayed(), {
    timeout: 5000,
    timeoutMsg: "El botón de cerrar sesión no se mostró en el tiempo esperado",
  });
  await logoutButton.click();

  // Pausar para asegurar que el proceso de cierre de sesión se complete
  await this.driver.pause(2000);
});
