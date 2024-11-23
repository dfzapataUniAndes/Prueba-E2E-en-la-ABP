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

const { fakerSchema } = require("faker-schema");
const rpcVerUrl = "http://localhost:" + Cypress.env("ghostRcVersionPort");
// Configurar una semilla para generar datos reproducibles
faker.seed(1234);

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

  it("EP_05 Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados a priori desde pool de datos. Luego lo veo en el listado de posts", () => {
    cy.fixture("post.json").then((posts) => {
      // Seleccionar el primer post del array
      const post = posts[0];
      // When hago clic en crear Post:
      whenCreateNewPost();

      // And ingreso el título del post
      andInsertTitlePost(post.title);

      // And ingreso el contenido del post
      andInsertContentPost(post.content);

      // And hago clic en Publish
      andClicInPublishPost();

      // And hago clic en finalizar revisión
      andClicInFinishReviewPost();

      // And cierro la ventana de post publicado
      andCloseWindowPostPublished();

      // Then veo en el listado de posts, el post con el titulo del JSON
      thenViewCreatedPost(post.title);
    });
  });

  it("EP_06 Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados pseudo aleatoriamente. Luego lo veo en el listado de posts.", () => {
    // Definir el esquema para generar el título y contenido del post
    const postSchema = fakerSchema({
      title: () => faker.lorem.sentence(),
      content: () => faker.lorem.paragraphs(3),
    });

    // When hago clic en crear Post:
    whenCreateNewPost();

    // Generar datos pseudoaleatorios basados en el esquema de forma dinámica:
    const postData = postSchema.generate();

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
    thenViewCreatedPost(randomTitle);
  });

  it("EP_07 Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados aleatoriamente. Luego lo veo en el listado de posts.", () => {
    // Generar datos aleatorios usando Faker
    const randomTitle = faker.lorem.words(5); // Generar un título aleatorio de 5 palabras
    const randomContent = faker.lorem.paragraphs(3); // Generar contenido aleatorio con 3 párrafos

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

  it("EP_08 Como administrador inicio sesión, trato de crear un post en Ghost con titulo pero sin contenido y hago clic en publicar", () => {
    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost(
      Cypress.env("ghostRcVersion"),
      "Titulo de Post sin Contenido"
    );
    // And ingreso el contenido del post vacío
    andInsertContentPost("");

    // And hago clic en Publish
    andClicInPublishPost();
    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();
    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();
    // Then veo en el listado de posts, el post con el titulo "Titulo de Post"
    thenViewCreatedPost("Titulo de Post sin Contenido");
  });

  it("EP_09 Como administrador inicio sesión, trato de crear un post en Ghost con titulo vacio pero con contenido y hago clic en publicar", () => {
    const sinTitulo = "(Untitled)";
    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost(Cypress.env("ghostRcVersion"), "");
    // And ingreso el contenido del post "Contenido del Post"
    andInsertContentPost("Contenido del Post sin Titulo");

    // And hago clic en Publish
    andClicInPublishPost();
    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();
    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts, el post con el titulo generico de "Untitled":
    thenViewCreatedPost(sinTitulo);
  });
});
