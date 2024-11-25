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

  // 3 con titulo y contenido alfanumérico

  it("EP_31_A_PRIORI Como administrador inicio sesión, creo un post en Ghost con titulo y contenido alfanumérico generados a priori desde archivo json. Luego lo veo en el listado de posts.", () => {
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

  it("EP_32_PSEUDO Como administrador inicio sesión, creo un post en Ghost con titulo y contenido alfanumérico generados pseudo aleatoriamente. Luego lo veo en el listado de posts.", () => {
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

  it("EP_33_ALEATORIO Como administrador inicio sesión, creo un post en Ghost con titulo y contenido alfanumérico generados aleatoriamente. Luego lo veo en el listado de posts.", () => {
    // Generar datos aleatorios usando semilla aleatoria de faker:
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));

    const randomTitle = faker.lorem.sentence; // Generar un título aleatorio de 5 palabras
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

  // Fin

  // 3 con título y contenido caracteres especiales

  it("EP_34_A_PRIORI Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados a priori desde archivo json con caracteres especiales. Luego lo veo en el listado de posts.", () => {
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

  it("EP_36_ALEATORIO Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados aleatoriamente con caracteres especiales. Luego lo veo en el listado de posts.", () => {
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

  it("EP_37_A_PRIORI_FRONTERA_INFERIOR Como administrador inicio sesión, trato de crear un post en Ghost sin titulo pero contenido alfanumérico creado a priori desde archivo json y hago clic en publicar. Luego veo el post en el listado de posts.", () => {
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

  it("EP_38_PSEUDO_FRONTERA_INFERIOR Como administrador inicio sesión, trato de crear un post en Ghost sin titulo y contenido alfanumérico creado pesudo aleatorio y hago clic en publicar. Luego veo el post en el listado de posts.", () => {
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

  it("EP_39_ALEATORIO_FRONTERA_INFERIOR Como administrador inicio sesión, trato de crear un post en Ghost sin titulo y contenido alfanumérico creado aleatoriamente y hago clic en publicar. Luego veo el post en el listado de posts.", () => {
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

  // Fin

  // 3 con título alfanumérico largo pero con contenido alfanumérico (frontera)

  it("EP_40_A_PRIORI_FRONTERA_SUPERIOR Como administrador inicio sesión, trato de crear un post en Ghost con titulo que excede los 255 caracteres y contenido generado a priori y hago clic en publicar.", () => {
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

  it("EP_41_PSEUDO_FRONTERA_SUPERIOR Como administrador inicio sesión, trato de crear un post en Ghost con titulo que excede los 255 caracteres y contenido generado de forma pseudo aletoria y hago clic en publicar.", () => {
    const randomLength = Math.floor(Math.random() * 11);
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Definir el esquema para generar el título y contenido del post:
    const postSchema = new Schema(() => ({
      title: faker.string.alphanumeric(256),
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

    // Then el post no se deberia dejar crear, deberia salir un error:
    thenPostCannotBePublished();
  });

  it("EP_42_ALETORIO_FRONTERA_SUPERIOR Como administrador inicio sesión, trato de crear un post en Ghost con titulo que excede los 255 caracteres y contenido generado de forma aletoria y hago clic en publicar.", () => {
    // Configurar una semilla aletoria:
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));

    // Definir el esquema para generar el título y contenido del post:
    const randomTitle = faker.string.alphanumeric(256);
    const randomContent = faker.lorem.paragraphs(3);

    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost(randomTitle);
    // And ingreso el contenido del post "Contenido del Post"
    andInsertContentPost(randomContent);

    // Then el post no se deberia dejar crear, deberia salir un error:
    thenPostCannotBePublished();
  });

  // Fin

  // 3 con título con caracteres especiales pero contenido alfanumérico

  it("EP_43_A_PRIORI Como administrador inicio sesión, creo un post en Ghost con titulo con caracteres especiales y contenido alfanumérico a priori desde archivo json. Luego lo veo en el listado de posts.", () => {
    cy.fixture("post.json").then((posts) => {
      // Seleccionar el primer post del array
      const post = posts[3];
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

  it("EP_44_PSEUDO Como administrador inicio sesión, creo un post en Ghost con titulo con caracteres especiales y contenido alfanumérico  generados pseudo aleatoriamente. Luego lo veo en el listado de posts.", () => {
    const randomLength = Math.floor(Math.random() * 11);
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Crear un esquema con faker y caracteres especiales
    const postSchema = new Schema(() => ({
      title: faker.helpers.arrayElement(blns), // Selecciona un string pseudoaleatorio de naughtyStrings),
      content: faker.lorem.paragraphs(randomLength),
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

  it("EP_45_ALEATORIO Como administrador inicio sesión, creo un post en Ghost con titulo con caracteres especiales y contenido alfanumérico generados aleatoriamente. Luego lo veo en el listado de posts.", () => {
    const randomLength = Math.floor(Math.random() * 11);
    const randomIndex = Math.floor(Math.random() * blns.length);

    // Configurar una semilla aletoria:
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));

    // Seleccionar strings aleatorios de la lista BLNS
    const randomTitle = faker.lorem.sentence();
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

  // 3 sin título pero con contenido caracteres especiales (frontera)

  it("EP_46_A_PRIORI_FRONTERA_INFERIOR Como administrador inicio sesión, trato de crear un post en Ghost sin titulo pero contenido con caracteres especiales creado a priori desde archivo json y hago clic en publicar. Luego lo veo en el listado de posts.", () => {
    cy.fixture("post.json").then((posts) => {
      // Seleccionar el segundo post del array
      const post = posts[5];

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

  it("EP_47_PSEUDO_FRONTERA_INFERIOR Como administrador inicio sesión, trato de crear un post en Ghost sin titulo y contenido con caracteres especiales creado pesudo aleatorio y hago clic en publicar. Luego lo veo en el listado de posts.", () => {
    const randomLength = Math.floor(Math.random() * 11);
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Definir el esquema para generar el título y contenido del post:
    const postSchema = new Schema(() => ({
      title: "",
      content: faker.helpers.arrayElements(blns, randomLength).join("\n\n"), // Selecciona n strings y los combina con saltos de línea
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

  it("EP_48_ALEATORIO_FRONTERA_INFERIOR Como administrador inicio sesión, trato de crear un post en Ghost sin titulo y contenido con caracteres especiales creado aleatoriamente y hago clic en publicar. Luego lo veo en el listado de posts.", () => {
    const randomLength = Math.floor(Math.random() * 11);
    const randomIndex = Math.floor(Math.random() * blns.length);

    // Configurar una semilla aletoria:
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));

    // Seleccionar strings aleatorios de la lista BLNS
    const randomContent = blns
      .slice(randomIndex, randomIndex + randomLength)
      .join("\n\n"); // Usar n strings consecutivos como contenido

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

  // Fin

  // 3 con título alfanumérico largo pero con contenido caracteres especiales (frontera)

  it("EP_49_A_PRIORI_FRONTERA_SUPERIOR Como administrador inicio sesión, trato de crear un post en Ghost con titulo alfanumérico que excede los 255 caracteres y contenido (carateres especiales) generado a priori y hago clic en publicar. Luego lo veo en el listado de posts.", () => {
    cy.fixture("post.json").then((posts) => {
      // Seleccionar el segundo post del array
      const post = posts[6];

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

  it("EP_50_PSEUDO_FRONTERA_SUPERIOR Como administrador inicio sesión, trato de crear un post en Ghost con titulo alfanumérico que excede los 255 caracteres y contenido (carateres especiales) generado de forma pseudo aletoria y hago clic en publicar. Luego lo veo en el listado de posts.", () => {
    const randomLength = Math.floor(Math.random() * 11);
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Definir el esquema para generar el título y contenido del post:
    const postSchema = new Schema(() => ({
      title: faker.string.alphanumeric(256),
      content: faker.helpers.arrayElements(blns, randomLength).join("\n\n"),
    }));

    // Generar datos pseudoaleatorios basados en el esquema de forma dinámica:
    const postData = postSchema.makeOne();

    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost(postData.title);
    // And ingreso el contenido del post "Contenido del Post"
    andInsertContentPost(postData.content);

    // Then el post no se deberia dejar crear, deberia salir un error:
    thenPostCannotBePublished();
  });

  it("EP_51_ALETORIO_FRONTERA_SUPERIOR Como administrador inicio sesión, trato de crear un post en Ghost con titulo alfanumérico que excede los 255 caracteres y contenido  (carateres especiales) generado de forma aletoria y hago clic en publicar. Luego lo veo en el listado de posts.", () => {
    const randomLength = Math.floor(Math.random() * 11);
    const randomIndex = Math.floor(Math.random() * blns.length);

    // Configurar una semilla aletoria:
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));

    // Definir el esquema para generar el título y contenido del post:
    const randomTitle = faker.string.alphanumeric(256);
    const randomContent = blns
      .slice(randomIndex, randomIndex + randomLength)
      .join("\n\n"); // Usar n strings consecutivos como contenido

    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost(randomTitle);
    // And ingreso el contenido del post "Contenido del Post"
    andInsertContentPost(randomContent);

    // Then el post no se deberia dejar crear, deberia salir un error:
    thenPostCannotBePublished();
  });

  // Fin

  // 3 con título alfanumérico pero sin contenido

  it("EP_52_A_PRIORI Como administrador inicio sesión, creo un post en Ghost con titulo alfanumérico generado a priori desde archivo json pero sin contenido. Luego lo veo en el listado de posts. Luego lo veo en el listado de posts.", () => {
    cy.fixture("post.json").then((posts) => {
      // Seleccionar el primer post del array
      const post = posts[7];
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

  it("EP_53_PSEUDO Como administrador inicio sesión, creo un post en Ghost con titulo alfanumérico generado pseudo aleatoriamente pero sin contenido. Luego lo veo en el listado de posts. Luego lo veo en el listado de posts.", () => {
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Definir el esquema para generar el título y contenido del post:
    const postSchema = new Schema(() => ({
      title: faker.lorem.sentence(),
      content: "",
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

  it("EP_54_ALEATORIO Como administrador inicio sesión, creo un post en Ghost con titulo alfanumérico generado aleatoriamente pero sin contenido. Luego lo veo en el listado de posts. Luego lo veo en el listado de posts.", () => {
    // Generar datos aleatorios usando semilla aleatoria de faker:
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));

    const randomTitle = faker.lorem.sentence; // Generar un título aleatorio de 5 palabras

    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost(randomTitle);
    // And ingreso el contenido del post vacío
    andInsertContentPost("");

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

  // 3 con título con caracteres especiales pero sin contenido

  it("EP_55_A_PRIORI Como administrador inicio sesión, creo un post en Ghost con titulo con caracteres especiales, generado a priori desde archivo json, pero sin contenido. Luego lo veo en el listado de posts.", () => {
    cy.fixture("post.json").then((posts) => {
      // Seleccionar el primer post del array
      const post = posts[8];
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

  it("EP_56_PSEUDO Como administrador inicio sesión, creo un post en Ghost con titulo con caracteres especiales, generado pseudo aleatoriamente, pero sin contenido. Luego lo veo en el listado de posts.", () => {
    // Configurar una semilla para generar datos reproducibles:
    faker.seed(fakerSeed);

    // Crear un esquema con faker y caracteres especiales
    const postSchema = new Schema(() => ({
      title: faker.helpers.arrayElement(blns),
      content: "",
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

    // Then veo en el listado de posts, el post con el titulo correspondiente
    thenViewCreatedPost(postData.title);
  });

  it("EP_57_ALEATORIO Como administrador inicio sesión, creo un post en Ghost con titulo con caracteres especiales, generado aleatoriamente, pero sin contenido. Luego lo veo en el listado de posts.", () => {
    // Generar datos aleatorios usando semilla aleatoria de faker:
    faker.seed(Math.abs(Date.now() ^ (Math.random() * 0x100000000)));

    const randomTitle = faker.lorem.sentence; // Generar un título aleatorio de 5 palabras

    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost(randomTitle);
    // And ingreso el contenido del post vacío
    andInsertContentPost("");

    // And hago clic en Publish
    andClicInPublishPost();

    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();

    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts, el post con el titulo correspondiente
    thenViewCreatedPost(randomTitle);
  });
  // Fin

  // 3 con título y contenido mezclado entre caracteres especiales y alfanumérico
  it("EP_58_A_PRIORI Como administrador inicio sesión, creo un post en Ghost con titulo y contenido generados a priori desde archivo json con caracteres especiales y alfanuméricos mezclados. Luego lo veo en el listado de posts.", () => {
    cy.fixture("post.json").then((posts) => {
      // Seleccionar el primer post del array
      const post = posts[9];
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

  it("EP_59_PSEUDO Como administrador inicio sesión, creo un post en Ghost con título y contenido generados pseudo aleatoriamente mezclando caracteres especiales y alfanuméricos mezclados. Luego lo veo en el listado de posts.", () => {
    const randomLength = Math.floor(Math.random() * 11);

    // Configurar una semilla para reproducibilidad:
    faker.seed(fakerSeed);

    // Crear un esquema para mezclar cadenas especiales y alfanuméricas
    const postSchema = new Schema(() => ({
      title: `${faker.helpers.arrayElement(blns)} - ${faker.random.alphaNumeric(
        10
      )}`,
      content: faker.helpers
        .arrayElements(blns, randomLength)
        .map((s) => `${s} ${faker.random.alphaNumeric(5)}`) // Combinar cada cadena especial con texto alfanumérico
        .join("\n\n"),
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

    // Then veo en el listado de posts, el post con el título generado
    thenViewCreatedPost(postData.title);
  });

  it("EP_60_ALEATORIO Como administrador inicio sesión, creo un post en Ghost con título y contenido generados completamente aleatorios mezclando caracteres especiales y alfanuméricos mezclados. Luego lo veo en el listado de posts.", () => {
    const randomLength = Math.floor(Math.random() * 11);
    const randomIndex = Math.floor(Math.random() * blns.length);

    // Generar un título aleatorio combinando caracteres alfanuméricos y especiales
    const randomTitle = `${blns[randomIndex]} ${faker.random.alphaNumeric(15)}`;

    // Generar contenido aleatorio combinando cadenas especiales y alfanuméricas
    const randomContent = blns
      .slice(randomIndex, randomIndex + randomLength)
      .map((s) => `${s} ${faker.random.alphaNumeric(5)}`) // Mezclar cada cadena con texto alfanumérico
      .join("\n\n");

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

    // Then veo en el listado de posts, el post con el título generado
    thenViewCreatedPost(randomTitle);
  });

  // Fin
});
