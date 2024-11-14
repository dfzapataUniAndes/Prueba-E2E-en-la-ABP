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
  thenPostCannotBePublished,
  thenCloseSession,
} from "../steps/thenSteps.cy";

describe("Crear un post en Ghost con pruebas de regresión visual", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador
    givenNavigateToTheSite();
    givenUserIsLogin(Cypress.env("emailTest2"), Cypress.env("passwordTest2"));
    cy.screenshot("inicio_sesion_post"); // Captura de pantalla después de iniciar sesión
  });

  it("EP_05 Crear un post exitosamente y verlo en el listado de posts", () => {
    // When navego a la página de crear posts
    whenNavigateToThePosts();
    cy.screenshot("navegacion_posts"); // Captura de pantalla después de navegar a la sección de posts
    
    // And hago clic en crear Post:
    thenCreateNewPost();
    cy.screenshot("crear_nuevo_post"); // Captura de pantalla después de iniciar el proceso de creación de post
    
    // And ingreso el título del post "Titulo de Post"
    thenInsertTitlePost("Titulo de Post");
    cy.screenshot("insertar_titulo_post"); // Captura de pantalla después de agregar el título del post
    
    // And ingreso el contenido del post "Contenido del Post"
    thenInsertContentPost("Contenido del Post");
    cy.screenshot("insertar_contenido_post"); // Captura de pantalla después de agregar el contenido del post
    
    // And hago clic en Publish
    thenClicInPublishPost();
    cy.screenshot("clic_publicar_post"); // Captura de pantalla después de hacer clic en publicar
    
    // And hago clic en finalizar revisión
    thenClicInFinishReviewPost();
    cy.screenshot("finalizar_revision_post"); // Captura de pantalla después de finalizar la revisión
    
    // And cierro la ventana de post publicado
    thenCloseWindowPostPublished();
    cy.screenshot("cerrar_ventana_post_publicado"); // Captura de pantalla después de cerrar la ventana de post publicado
    
    // And veo en el listado de posts, el post con el titulo "Titulo de Post"
    thenViewCreatedPost("Titulo de Post");
    cy.screenshot("ver_post_creado"); // Captura de pantalla de la vista del post creado en el listado
    
    // And cierro sesión
    thenCloseSession();
  });

  it("EP_06 Intento de crear un post sin título ni contenido, verificar que no se puede publicar", () => {
    // When navego a la página de crear posts
    whenNavigateToThePosts();
    cy.screenshot("navegacion_posts"); // Captura de pantalla después de navegar a la sección de posts
    
    // And hago clic en crear Post:
    thenCreateNewPost();
    cy.screenshot("crear_nuevo_post"); // Captura de pantalla después de iniciar el proceso de creación de post
    
    // And ingreso el título del post vacío
    thenInsertTitlePost("");
    cy.screenshot("insertar_titulo_vacio"); // Captura de pantalla después de dejar el título vacío
    
    // And ingreso el contenido del post vacío
    thenInsertContentPost("");
    cy.screenshot("insertar_contenido_vacio"); // Captura de pantalla después de dejar el contenido vacío
    
    // Verifico que no se puede publicar el post
    thenPostCannotBePublished();
    cy.screenshot("post_no_publicable"); // Captura de pantalla de la restricción para publicar un post vacío
    
    // And cierro sesión
    thenCloseSession();
  });

  it("EP_07 Crear un post con título sin contenido y verificar en el listado", () => {
    // When navego a la página de crear posts
    whenNavigateToThePosts();
    cy.screenshot("navegacion_posts"); // Captura de pantalla después de navegar a la sección de posts
    
    // And hago clic en crear Post:
    thenCreateNewPost();
    cy.screenshot("crear_nuevo_post"); // Captura de pantalla después de iniciar el proceso de creación de post
    
    // And ingreso el título del post "Titulo de Post sin Contenido"
    thenInsertTitlePost("Titulo de Post sin Contenido");
    cy.screenshot("insertar_titulo_sin_contenido"); // Captura de pantalla después de agregar el título sin contenido
    
    // And ingreso el contenido del post vacío
    thenInsertContentPost("");
    cy.screenshot("insertar_contenido_vacio"); // Captura de pantalla después de dejar el contenido vacío
    
    // And hago clic en Publish
    thenClicInPublishPost();
    cy.screenshot("clic_publicar_post"); // Captura de pantalla después de hacer clic en publicar
    
    // And hago clic en finalizar revisión
    thenClicInFinishReviewPost();
    cy.screenshot("finalizar_revision_post"); // Captura de pantalla después de finalizar la revisión
    
    // And cierro la ventana de post publicado
    thenCloseWindowPostPublished();
    cy.screenshot("cerrar_ventana_post_publicado"); // Captura de pantalla después de cerrar la ventana de post publicado
    
    // And veo en el listado de posts, el post con el titulo "Titulo de Post sin Contenido"
    thenViewCreatedPost("Titulo de Post sin Contenido");
    cy.screenshot("ver_post_sin_contenido"); // Captura de pantalla de la vista del post en el listado
    
    // And cierro sesión
    thenCloseSession();
  });

  it("EP_08 Crear un post con contenido sin título y verificar que aparece como (Untitled)", () => {
    const sinTitulo = "(Untitled)";
    
    // When navego a la página de crear posts
    whenNavigateToThePosts();
    cy.screenshot("navegacion_posts"); // Captura de pantalla después de navegar a la sección de posts
    
    // And hago clic en crear Post:
    thenCreateNewPost();
    cy.screenshot("crear_nuevo_post"); // Captura de pantalla después de iniciar el proceso de creación de post
    
    // And ingreso el título del post vacío
    thenInsertTitlePost("");
    cy.screenshot("insertar_titulo_vacio"); // Captura de pantalla después de dejar el título vacío
    
    // And ingreso el contenido del post "Contenido del Post sin Titulo"
    thenInsertContentPost("Contenido del Post sin Titulo");
    cy.screenshot("insertar_contenido_post_sin_titulo"); // Captura de pantalla después de agregar contenido sin título
    
    // And hago clic en Publish
    thenClicInPublishPost();
    cy.screenshot("clic_publicar_post"); // Captura de pantalla después de hacer clic en publicar
    
    // And hago clic en finalizar revisión
    thenClicInFinishReviewPost();
    cy.screenshot("finalizar_revision_post"); // Captura de pantalla después de finalizar la revisión
    
    // And cierro la ventana de post publicado
    thenCloseWindowPostPublished();
    cy.screenshot("cerrar_ventana_post_publicado"); // Captura de pantalla después de cerrar la ventana de post publicado
    
    // And veo en el listado de posts, el post con el titulo generico de "Untitled"
    thenViewCreatedPost(sinTitulo);
    cy.screenshot("ver_post_sin_titulo"); // Captura de pantalla de la vista del post en el listado como "Untitled"
    
    // And cierro sesión
    thenCloseSession();
  });
});
