import {
  givenNavigateToTheSite,
  givenUserIsLogin,
} from "../steps/givenSteps.cy";
import { whenNavigateToThePosts } from "../steps/whenSteps.cy";
import {
  thenCreateNewPost,
  thenInsertTitlePost,
  thenInsertContentPost,
  thenClicInPublishPost,
  thenClicInFinishReviewPost,
  thenCloseWindowPostPublished,
  thenViewCreatedPost,
  thenCloseSession,
} from "../steps/thenSteps.cy";

describe("Crear un post en Ghost", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador
    givenNavigateToTheSite();
    givenUserIsLogin(Cypress.env("emailTest2"), Cypress.env("passwordTest2"));
  });

  it("Como administrador inicio sesión, creo un post en Ghost exitosamente y lo veo en el listado de posts", () => {
    // When navego a la página de crear posts
    whenNavigateToThePosts();
    // And hago clic en crear Post:
    thenCreateNewPost();
    // And ingreso el título del post "Titulo de Post"
    thenInsertTitlePost("Titulo de Post");
    // And ingreso el contenido del post "Contenido del Post"
    thenInsertContentPost("Contenido del Post");
    // And hago clic en Publish
    thenClicInPublishPost();
    // And hago clic en finalizar revisión
    thenClicInFinishReviewPost();
    // And cierro la ventana de post publicado
    thenCloseWindowPostPublished();
    // And veo en el listado de posts, el post con el titulo "Titulo de Post"
    thenViewCreatedPost("Titulo de Post");
    // And cierro sesión
    thenCloseSession();
  });
});
