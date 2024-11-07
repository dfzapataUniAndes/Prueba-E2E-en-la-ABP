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

When("ingreso el correo {string}", async function (email) {
  const emailInput = await this.driver.$('input[name="identification"]');
  await emailInput.setValue(email);
});

When("ingreso la contraseña {string}", async function (password) {
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
      'textarea[placeholder="Post Title"]'
    );
    await titleInput.setValue(titulo);
    const contentInput = await this.driver.$(".koenig-editor__editor");
    await contentInput.setValue(contenido);

    // Publicar el post
    const publishMenu = await this.driver.$(".gh-publishmenu");
    await publishMenu.click();
    await this.driver.pause(500); // Espera a que se despliegue el menú
    const publishButton = await this.driver.$(".gh-publishmenu-button");
    await publishButton.click();
    await this.driver.pause(1000); // Espera a que se complete la publicación
  }
);

Then(
  "debería ver el post titulado {string} en la lista de posts",
  async function (titulo) {
    await this.driver.url("http://localhost:2368/ghost/#/posts");
    await this.driver.pause(1000); // Espera para cargar la lista de posts
    const posts = await this.driver.$$(".gh-post-list-title");
    const postTitles = await Promise.all(
      posts.map(async (post) => await post.getText())
    );

    if (!postTitles.includes(titulo)) {
      throw new Error(
        `No se encontró el post titulado "${titulo}" en la lista de posts.`
      );
    }
  }
);
