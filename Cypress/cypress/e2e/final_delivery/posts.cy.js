import { faker } from "@faker-js/faker";
import {
  givenNavigateToTheSiteUrl,
  givenUserIsLogin,
} from "../steps/givenSteps.cy";
import { whenCreateNewPost } from "../steps/whenSteps.cy";
import {
  thenViewCreatedPost,
  thenPostCannotBePublished,
} from "../steps/thenSteps.cy";

import {
  andInsertTitlePost,
  andInsertContentPost,
  andClicInPublishPost,
  andClicInFinishReviewPost,
  andCloseWindowPostPublished,
  andCloseSession,
} from "../steps/andSteps.cy";
const { Schema } = require("faker-schema");

var blns = require("blns");
const rpcVerUrl = "http://localhost:" + Cypress.env("ghostRcVersionPort");
const fakerSeed = 123;

// Post sin titulo:
const untitledPost = "(Untitled)";

describe("Crear un post en Ghost.", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador y navego a la página de posts:
    givenNavigateToTheSiteUrl(rpcVerUrl + "/ghost/#/signin");
    givenUserIsLogin(Cypress.env("emailTest2"), Cypress.env("passwordTest2"));
    givenNavigateToTheSiteUrl(rpcVerUrl + "/ghost/#/posts");
  });

  afterEach(() => {
    // And cierro sesión
    andCloseSession();
  });

  it("EP_161 Debe permitir seleccionar la fecha correcta al programar un post", () => {
    // Datos de prueba
    const tomorrow = Cypress.moment().add(1, "days").format("YYYY-MM-DD"); // Fecha de mañana

    // When creo un nuevo post
    whenCreateNewPost();

    // And ingreso el título y contenido del post
    andInsertTitlePost("Post de Prueba Programado");
    andInsertContentPost("Contenido del post de prueba.");

    // And hago clic en publicar como programado
    andClicInPublishPost();
    cy.get("div.gh-publishmenu-radio-label")
      .contains("Schedule it for later")
      .click();

    // And selecciono la fecha
    cy.get('input[type="date"]').clear().type(tomorrow);

    // Then verifico que la fecha seleccionada sea la correcta
    cy.get('input[type="date"]').should("have.value", tomorrow);

    // And finalizo la publicación
    andClicInFinishReviewPost();

    // And cierro la ventana de post programado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts el post programado
    thenViewCreatedPost("Post de Prueba Programado");
  });

  it("EP_162 Como administrador edito una imagen recortándola, aplico efectos y guardo los cambios correctamente", () => {
    // When creo un nuevo post
    whenCreateNewPost();

    // And ingreso el título y contenido del post
    andInsertTitlePost("Post con Imagen Editada");
    andInsertContentPost("Contenido con imagen.");

    // And agrego una imagen destacada para editar
    cy.get("button").contains("Add feature image").click();
    cy.get('input[type="file"]').selectFile("path/to/your/test-image.jpg", {
      force: true,
    });

    // And accedo a las herramientas de edición de imagen
    cy.get(".gh-editor-feature-image").click();
    cy.get("button").contains("Edit").click();

    // And aplico recorte
    cy.get(".image-editor").within(() => {
      cy.get(".crop-tool").click();
      cy.get(".crop-area").invoke(
        "attr",
        "style",
        "width: 200px; height: 200px;"
      );
      cy.get("button").contains("Apply").click();
    });

    // And aplico un efecto de brillo
    cy.get(".effect-tool").click();
    cy.get(".brightness-slider").invoke("val", 70).trigger("change");
    cy.get("button").contains("Apply").click();

    // And guardo los cambios en la imagen
    cy.get("button").contains("Save").click();

    // Then verifico que los cambios de la imagen se guardaron correctamente
    cy.get(".gh-editor-feature-image")
      .should("have.attr", "src")
      .and("include", "edited");

    // And publico el post
    andClicInPublishPost();
    andClicInFinishReviewPost();

    // Then veo la notificación de post publicado
    cy.get(".gh-notification-content").should("contain", "Published");
  });

  it("EP_163 Como administrador visualizo y restauro ediciones previas de un post", () => {
    // When creo un nuevo post
    whenCreateNewPost();

    // And ingreso el título y contenido inicial del post
    andInsertTitlePost("Post con Historial");
    andInsertContentPost("Contenido inicial del post.");

    // And guardo los cambios
    andClicInPublishPost();
    andClicInFinishReviewPost();

    // Then verifico que el post inicial se guarda correctamente
    thenViewCreatedPost("Post con Historial");

    // And edito el contenido del post y lo guardo como una nueva versión
    cy.get("a.gh-post-list-title").contains("Post con Historial").click();
    andInsertContentPost("Contenido modificado del post.");
    andClicInPublishPost();
    andClicInFinishReviewPost();

    // Then verifico que la nueva versión se guarda correctamente
    thenViewCreatedPost("Post con Historial");

    // When accedo al historial de publicaciones
    cy.get(".settings-menu-toggle").click();
    cy.get("button").contains("Post history").click();

    // Then verifico que las versiones previas aparecen listadas
    cy.get(".post-history-item").should("have.length.at.least", 2);

    // And selecciono una versión previa para restaurarla
    cy.get(".post-history-item").first().click();
    cy.get("button").contains("Restore this version").click();

    // Then verifico que la versión previa se restaura correctamente
    cy.get(".koenig-editor__editor").should(
      "contain",
      "Contenido inicial del post."
    );

    // And publico nuevamente el post restaurado
    andClicInPublishPost();
    andClicInFinishReviewPost();

    // Then confirmo que el post restaurado aparece publicado correctamente
    thenViewCreatedPost("Post con Historial");
  });

  it("EP_164 Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados aleatoriamente excesivamente largo. Luego lo veo en el listado de posts.", () => {
    const randomIndex = Math.floor(Math.random() * blns.length);

    // Seleccionar strings aleatorios de la lista BLNS
    const randomTitle = blns[randomIndex];
    const randomContent = blns
      .slice(randomIndex, randomIndex + 250)
      .join("\n\n"); // Usar 3 strings consecutivos como contenido

    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost(randomTitle);
    // And ingreso el contenido del post vacío
    andInsertContentPost(randomContent);

    // And hago clic en Publish
    andClicInPublishPost();

    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();

    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts, el post con el titulo del JSON
    thenViewCreatedPost(randomTitle);
  });

  it("EP_165 Como administrador, publico un post con imagen destacada válida y verifico que se muestra correctamente", () => {
    // When creo un nuevo post:
    whenCreateNewPost();

    // And ingreso el título y el contenido del post:
    andInsertTitlePost("Post con Imagen Destacada");
    andInsertContentPost("Contenido del post con imagen destacada.");

    // And añado una imagen destacada válida:
    whenAddFeatureImage("path/to/valid-image.jpg");

    // And hago clic en Publish:
    andClicInPublishPost();

    // And hago clic en finalizar revisión:
    andClicInFinishReviewPost();

    // Then verifico que la imagen destacada se muestra correctamente en el listado:
    thenViewFeatureImage("path/to/valid-image.jpg");
  });

  it("EP_166 Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados pseudo aleatoriamente con caracteres especiales. Luego lo veo en el listado de posts.", () => {
    const randomLength = Math.floor(Math.random() * 11);
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Crear un esquema con faker y caracteres especiales
    const postSchema = new Schema(() => ({
      title: faker.helpers.arrayElement(blns), // Selecciona un string pseudoaleatorio de naughtyStrings
      content: faker.helpers.arrayElements(blns, randomLength).join("\n\n"), // Selecciona n strings y los combina con saltos de línea
    }));

    // Generar datos basados en el esquema
    const postData = postSchema.makeOne();

    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost(postData.title);
    // And ingreso el contenido del post vacío
    andInsertContentPost(postData.content);

    // And hago clic en Publish
    andClicInPublishPost();

    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();

    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts, el post con el titulo del JSON
    thenViewCreatedPost(postData.title);
  });

  it("EP_167 Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados aleatoriamente con caracteres especiales. Luego lo veo en el listado de posts.", () => {
    const randomLength = Math.floor(Math.random() * 11);
    const randomIndex = Math.floor(Math.random() * blns.length);

    // Seleccionar strings aleatorios de la lista BLNS
    const randomTitle = blns[randomIndex];
    const randomContent = blns
      .slice(randomIndex, randomIndex + randomLength)
      .join("\n\n"); // Usar 3 strings consecutivos como contenido

    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost(randomTitle);
    // And ingreso el contenido del post vacío
    andInsertContentPost(randomContent);

    // And hago clic en Publish
    andClicInPublishPost();

    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();

    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts, el post con el titulo del JSON
    thenViewCreatedPost(randomTitle);
  });

  // Fin

  // 3 sin título pero con contenido alfanumérico (frontera)

  it("EP_168 Como administrador inicio sesión, trato de crear un post en Ghost sin titulo pero contenido alfanumérico creado a priori desde archivo json y hago clic en publicar. Luego veo el post en el listado de posts.", () => {
    cy.fixture("post.json").then((posts) => {
      // Seleccionar el segundo post del array
      const post = posts[2];

      // When hago clic en crear Post:
      whenCreateNewPost();

      // And ingreso el título del post
      andInsertTitlePost("");

      // And ingreso el contenido del post
      andInsertContentPost(post.content);

      // And hago clic en Publish
      andClicInPublishPost();

      // And hago clic en finalizar revisión
      andClicInFinishReviewPost();

      // And cierro la ventana de post publicado
      andCloseWindowPostPublished();

      // Then veo en el listado de posts, el post con el titulo del JSON
      thenViewCreatedPost(untitledPost);
    });
  });

  it("EP_169 Como administrador inicio sesión, trato de crear un post en Ghost sin titulo y contenido alfanumérico creado pesudo aleatorio y hago clic en publicar. Luego veo el post en el listado de posts.", () => {
    const randomLength = Math.floor(Math.random() * 11);
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Definir el esquema para generar el título y contenido del post:
    const postSchema = new Schema(() => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(randomLength),
    }));

    // Generar datos pseudoaleatorios basados en el esquema de forma dinámica:
    const postData = postSchema.makeOne();

    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost(postData.title);
    // And ingreso el contenido del post "Contenido del Post"
    andInsertContentPost(postData.content);

    // And hago clic en Publish
    andClicInPublishPost();
    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();
    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts, el post con el titulo generico de "Untitled":
    thenViewCreatedPost(untitledPost);
  });

  it("EP_170 Como administrador inicio sesión, trato de crear un post en Ghost sin titulo y contenido alfanumérico creado aleatoriamente y hago clic en publicar. Luego veo el post en el listado de posts.", () => {
    // Generar datos aleatorios usando semilla aleatoria de faker:
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));

    const randomContent = faker.lorem.paragraphs(3); // Generar contenido aleatorio con 3 párrafos

    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost("");
    // And ingreso el contenido del post "Contenido del Post"
    andInsertContentPost(randomContent);

    // And hago clic en Publish
    andClicInPublishPost();
    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();
    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts, el post con el titulo generico de "Untitled":
    thenViewCreatedPost(untitledPost);
  });
});
