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

const baseVerUrl = "http://localhost:" + Cypress.env("ghostBaseVersionPort");
const rpcVerUrl = "http://localhost:" + Cypress.env("ghostRcVersionPort");

describe("Crear un post en Ghost version base", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador y navego a la página de posts:
    givenNavigateToTheSiteUrl(baseVerUrl + "/ghost/#/signin");
    givenUserIsLogin(Cypress.env("emailTest2"), Cypress.env("passwordTest2"));
    givenNavigateToTheSiteUrl(baseVerUrl + "/ghost/#/posts");
  });

  afterEach(() => {
    // And cierro sesión
    andCloseSession();
  });

  it("EP_05 Como administrador inicio sesión, creo un post en Ghost exitosamente y lo veo en el listado de posts", () => {
    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post "Titulo de Post"
    andInsertTitlePost("Titulo de Post");
    // And ingreso el contenido del post "Contenido del Post"
    andInsertContentPost("Contenido del Post");
    // And hago clic en Publish
    andClicInPublishPost();
    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();
    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts, el post con el titulo "Titulo de Post"
    thenViewCreatedPost(Cypress.env("ghostBaseVersion"), "Titulo de Post");
  });

  it("EP_06 Como administrador inicio sesión, trato de crear un post en Ghost sin completar el titulo, el contenido y hago clic en publicar", () => {
    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost("");
    // And ingreso el contenido del post vacío
    andInsertContentPost("");

    // Then No puedo hacer clic en publicar ni crear el post:
    thenPostCannotBePublished(Cypress.env("ghostBaseVersion"));
  });

  it("EP_07 Como administrador inicio sesión, trato de crear un post en Ghost con titulo pero sin contenido y hago clic en publicar", () => {
    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost("Titulo de Post sin Contenido");
    // And ingreso el contenido del post vacío
    andInsertContentPost("");

    // And hago clic en Publish
    andClicInPublishPost();
    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();
    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();
    // Then veo en el listado de posts, el post con el titulo "Titulo de Post"
    thenViewCreatedPost(
      Cypress.env("ghostBaseVersion"),
      "Titulo de Post sin Contenido"
    );
  });

  it("EP_08 Como administrador inicio sesión, trato de crear un post en Ghost con titulo vacio pero con contenido y hago clic en publicar", () => {
    const sinTitulo = "(Untitled)";
    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost("");
    // And ingreso el contenido del post "Contenido del Post"
    andInsertContentPost("Contenido del Post sin Titulo");

    // And hago clic en Publish
    andClicInPublishPost();
    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();
    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts, el post con el titulo generico de "Untitled":
    thenViewCreatedPost(Cypress.env("ghostBaseVersion"), sinTitulo);
  });
});

describe("Crear un post en Ghost version rc", () => {
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

  it("EP_05 Como administrador inicio sesión, creo un post en Ghost exitosamente y lo veo en el listado de posts", () => {
    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post "Titulo de Post"
    andInsertTitlePost("Titulo de Post");
    // And ingreso el contenido del post "Contenido del Post"
    andInsertContentPost("Contenido del Post");
    // And hago clic en Publish
    andClicInPublishPost();
    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();
    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts, el post con el titulo "Titulo de Post"
    thenViewCreatedPost(Cypress.env("ghostRcVersionPort"), "Titulo de Post");
  });

  it("EP_06 Como administrador inicio sesión, trato de crear un post en Ghost sin completar el titulo, el contenido y hago clic en publicar", () => {
    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost("");
    // And ingreso el contenido del post vacío
    andInsertContentPost("");

    // Then No puedo hacer clic en publicar ni crear el post:
    thenPostCannotBePublished(Cypress.env("ghostRcVersionPort"));
  });

  it("EP_07 Como administrador inicio sesión, trato de crear un post en Ghost con titulo pero sin contenido y hago clic en publicar", () => {
    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost("Titulo de Post sin Contenido");
    // And ingreso el contenido del post vacío
    andInsertContentPost("");

    // And hago clic en Publish
    andClicInPublishPost();
    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();
    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();
    // Then veo en el listado de posts, el post con el titulo "Titulo de Post"
    thenViewCreatedPost(
      Cypress.env("ghostRcVersionPort"),
      "Titulo de Post sin Contenido"
    );
  });

  it("EP_08 Como administrador inicio sesión, trato de crear un post en Ghost con titulo vacio pero con contenido y hago clic en publicar", () => {
    const sinTitulo = "(Untitled)";
    // When hago clic en crear Post:
    whenCreateNewPost();

    // And ingreso el título del post vacío
    andInsertTitlePost("");
    // And ingreso el contenido del post "Contenido del Post"
    andInsertContentPost("Contenido del Post sin Titulo");

    // And hago clic en Publish
    andClicInPublishPost();
    // And hago clic en finalizar revisión
    andClicInFinishReviewPost();
    // And cierro la ventana de post publicado
    andCloseWindowPostPublished();

    // Then veo en el listado de posts, el post con el titulo generico de "Untitled":
    thenViewCreatedPost(Cypress.env("ghostRcVersionPort"), sinTitulo);
  });
});
