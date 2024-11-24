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

  it("EP_31_A_PRIORI Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados a priori desde pool de datos. Luego lo veo en el listado de posts", () => {
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

  it("EP_32_PSEUDO Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados pseudo aleatoriamente. Luego lo veo en el listado de posts.", () => {
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Definir el esquema para generar el título y contenido del post:
    const postSchema = new Schema(() => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
    }));

    // When hago clic en crear Post:
    whenCreateNewPost();

    // Generar datos pseudoaleatorios basados en el esquema de forma dinámica:
    const postData = postSchema.makeOne();

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

  it("EP_33_ALEATORIO Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados aleatoriamente. Luego lo veo en el listado de posts.", () => {
    // Generar datos aleatorios usando semilla aleatoria de faker:
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));

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

  it("EP_34_A_PRIORI Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados a priori desde pool de datos con caracteres especiales. Luego lo veo en el listado de posts", () => {
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

  it("EP_35_PSEUDO Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados pseudo aleatoriamente con caracteres especiales. Luego lo veo en el listado de posts.", () => {
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Crear un esquema con faker y caracteres especiales
    const postSchema = new Schema(() => ({
      title: faker.helpers.arrayElement(blns), // Selecciona un string pseudoaleatorio de naughtyStrings
      content: faker.helpers.arrayElements(blns, 3).join("\n\n"), // Selecciona 3 strings y los combina con saltos de línea
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

  it("EP_36_ALEATORIO Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados aleatoriamente con caracteres especiales. Luego lo veo en el listado de posts.", () => {
    // Generar un índice aleatorio del array blns:
    const randomIndex = Math.floor(Math.random() * blns.length);

    // Seleccionar strings aleatorios de la lista BLNS
    const randomTitle = blns[randomIndex];
    const randomContent = blns.slice(randomIndex, randomIndex + 3).join("\n\n"); // Usar 3 strings consecutivos como contenido

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

  it("EP_37_A_PRIORI_FRONTERA_INFERIOR Como administrador inicio sesión, trato de crear un post en Ghost sin titulo pero contenido creado a priori y hago clic en publicar", () => {
    cy.fixture("post.json").then((posts) => {
      // Seleccionar el segundo post del array
      const post = posts[1];

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

  it("EP_38_PSEUDO_FRONTERA_INFERIOR Como administrador inicio sesión, trato de crear un post en Ghost sin titulo y contenido creado pesudo aleatorio y hago clic en publicar", () => {
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Definir el esquema para generar el título y contenido del post:
    const postSchema = new Schema(() => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
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

  it("EP_39_ALEATORIO_FRONTERA_INFERIOR Como administrador inicio sesión, trato de crear un post en Ghost sin titulo y contenido creado aleatoriamente y hago clic en publicar", () => {
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

  it("EP_40_A_PRIORI_FRONTERA_SUPERIOR Como administrador inicio sesión, trato de crear un post en Ghost con titulo que excede los 255 caracteres y contenido generado a priori y hago clic en publicar", () => {
    cy.fixture("post.json").then((posts) => {
      // Seleccionar el segundo post del array
      const post = posts[2];

      // When hago clic en crear Post:
      whenCreateNewPost();

      // And ingreso el título del post
      andInsertTitlePost(post.title);

      // And ingreso el contenido del post
      andInsertContentPost(post.content);

      // Then el post no se deberia dejar crear, deberia salir un error:
      thenPostCannotBePublished();
    });
  });

  it("EP_41_PSEUDO_FRONTERA_SUPERIOR Como administrador inicio sesión, trato de crear un post en Ghost con titulo que excede los 255 caracteres y contenido generado de forma pseudo aletoria y hago clic en publicar", () => {
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Definir el esquema para generar el título y contenido del post:
    const postSchema = new Schema(() => ({
      title: faker.string.alphanumeric(256),
      content: faker.lorem.paragraphs(3),
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
});
