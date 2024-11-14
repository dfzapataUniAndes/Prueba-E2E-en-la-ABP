import {
  givenNavigateToTheSite,
  givenUserIsLogin,
} from "../steps/givenSteps.cy";
import { whenNavigateToThePages } from "../steps/whenSteps.cy";
import {
  thenCreateNewPage,
  thenInsertTitlePage,
  thenInsertContentPage,
  thenClicInPublish,
  thenClicInFinishReview,
  thenClicInPublishPage,
  thenCloseWindowPagePublished,
  thenViewCreatedPage,
  thenCloseSession,
  thenSelecteCoverImage,
  thenViewCreatedPageWithImage,
  thenValidatePageWithImage,
  thenNavigateToThePages,
  thenViewCreatedPageAndLabelDraft,
  thenClicInPreview,
  thenClicInEditor,
  thenClicInUpdate
} from "../steps/thenSteps.cy";

describe("Crear y gestionar páginas en Ghost con pruebas de regresión visual", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador
    givenNavigateToTheSite();
    givenUserIsLogin(Cypress.env("emailTest1"), Cypress.env("passwordTest1"));
    cy.screenshot("inicio_sesion_pages"); // Captura de pantalla después de iniciar sesión
  });

  it("EP_01 Crear una página y verla en el listado de páginas", () => {
    // When navego a la página de crear páginas
    whenNavigateToThePages();
    cy.screenshot("navegacion_paginas"); // Captura de pantalla después de navegar a la sección de páginas
    
    // And hago clic en crear nueva página
    thenCreateNewPage();
    cy.screenshot("crear_nueva_pagina"); // Captura de pantalla después de iniciar el proceso de creación de página
    
    // And ingreso el título de la página "Titulo página"
    thenInsertTitlePage("Titulo página");
    cy.screenshot("insertar_titulo_pagina"); // Captura de pantalla después de agregar el título de la página
    
    // And ingreso el contenido de la página "Contenido de la página"
    thenInsertContentPage("Contenido de la página");
    cy.screenshot("insertar_contenido_pagina"); // Captura de pantalla después de agregar el contenido de la página
    
    // And hago clic en Publish
    thenClicInPublish();
    cy.screenshot("clic_publicar_pagina"); // Captura de pantalla después de hacer clic en publicar
    
    // And hago clic en finalizar revisión
    thenClicInFinishReview();
    cy.screenshot("finalizar_revision_pagina"); // Captura de pantalla después de finalizar la revisión
    
    // And hago clic en Publish page
    thenClicInPublishPage();
    cy.screenshot("publicar_pagina"); // Captura de pantalla después de publicar la página
    
    // And cierro la ventana de página publicada
    thenCloseWindowPagePublished();
    cy.screenshot("cerrar_ventana_publicada"); // Captura de pantalla después de cerrar la ventana de página publicada
    
    // And veo en el listado de páginas la página con el titulo "Titulo página"
    thenViewCreatedPage("Titulo página");
    cy.screenshot("ver_pagina_creada"); // Captura de pantalla de la vista de la página creada en el listado
    
    // And cierro sesión
    thenCloseSession();
  });

  it("EP_02 Crear una página con una imagen de portada y visualizarla luego de creada", () => {
    // When navego a la página de crear páginas
    whenNavigateToThePages();
    cy.screenshot("navegacion_paginas"); // Captura de pantalla después de navegar a la sección de páginas
    
    // And hago clic en crear nueva página
    thenCreateNewPage();
    cy.screenshot("crear_nueva_pagina"); // Captura de pantalla después de iniciar el proceso de creación de página
    
    // And selecciono una imagen de portada
    thenSelecteCoverImage();
    cy.screenshot("seleccionar_imagen_portada"); // Captura de pantalla después de seleccionar la imagen de portada
    
    // And ingreso el título de la página "Titulo página con imagen"
    thenInsertTitlePage("Titulo página con imagen");
    cy.screenshot("insertar_titulo_pagina_con_imagen"); // Captura de pantalla después de agregar el título de la página
    
    // And ingreso el contenido de la página "Contenido de la página"
    thenInsertContentPage("Contenido de la página");
    cy.screenshot("insertar_contenido_pagina_con_imagen"); // Captura de pantalla después de agregar el contenido de la página
    
    // And hago clic en Publish
    thenClicInPublish();
    cy.screenshot("clic_publicar_pagina"); // Captura de pantalla después de hacer clic en publicar
    
    // And hago clic en finalizar revisión
    thenClicInFinishReview();
    cy.screenshot("finalizar_revision_pagina"); // Captura de pantalla después de finalizar la revisión
    
    // And hago clic en Publish page
    thenClicInPublishPage();
    cy.screenshot("publicar_pagina"); // Captura de pantalla después de publicar la página
    
    // And cierro la ventana de página publicada
    thenCloseWindowPagePublished();
    cy.screenshot("cerrar_ventana_publicada"); // Captura de pantalla después de cerrar la ventana de página publicada
    
    // And abro en el listado de páginas la página con el titulo "Titulo página con imagen"
    thenViewCreatedPageWithImage("Titulo página con imagen");
    cy.screenshot("ver_pagina_con_imagen"); // Captura de pantalla de la vista de la página con imagen en el listado
    
    // And valido que la página tenga una imagen
    thenValidatePageWithImage();
    cy.screenshot("validar_pagina_con_imagen"); // Captura de pantalla de la validación de la imagen en la página
    
    // And cierro sesión
    thenCloseSession();
  });

  it("EP_03 Crear una página como borrador y visualizarla en el listado como draft", () => {
    // When navego a la página de crear páginas
    whenNavigateToThePages();
    cy.screenshot("navegacion_paginas"); // Captura de pantalla después de navegar a la sección de páginas
    
    // And hago clic en crear nueva página
    thenCreateNewPage();
    cy.screenshot("crear_nueva_pagina"); // Captura de pantalla después de iniciar el proceso de creación de página
    
    // And ingreso el título de la página "Titulo página draft"
    thenInsertTitlePage("Titulo página draft");
    cy.screenshot("insertar_titulo_pagina_draft"); // Captura de pantalla después de agregar el título de la página
    
    // And ingreso el contenido de la página "Contenido de la página draft"
    thenInsertContentPage("Contenido de la página draft");
    cy.screenshot("insertar_contenido_pagina_draft"); // Captura de pantalla después de agregar el contenido de la página
    
    // And navego a la página de crear páginas
    thenNavigateToThePages();
    cy.screenshot("navegacion_paginas"); // Captura de pantalla después de regresar a la sección de páginas
    
    // And veo en el listado de páginas la página con el titulo "Titulo página draft" y la etiqueta draft
    thenViewCreatedPageAndLabelDraft("Titulo página draft");
    cy.screenshot("ver_pagina_como_borrador"); // Captura de pantalla de la vista de la página como borrador en el listado
    
    // And cierro sesión
    thenCloseSession();
  });

  it("EP_17 Editar el título de una página y verificar en el listado", () => {
    // When navego a la página de crear páginas
    whenNavigateToThePages();
    cy.screenshot("navegacion_paginas"); // Captura de pantalla después de navegar a la sección de páginas
    
    // And hago clic en crear nueva página
    thenCreateNewPage();
    cy.screenshot("crear_nueva_pagina"); // Captura de pantalla después de iniciar el proceso de creación de página
    
    // And ingreso el título de la página "Titulo página a editar"
    thenInsertTitlePage("Titulo página a editar");
    cy.screenshot("insertar_titulo_pagina_a_editar"); // Captura de pantalla después de agregar el título de la página
    
    // And ingreso el contenido de la página "Contenido de la página"
    thenInsertContentPage("Contenido de la página");
    cy.screenshot("insertar_contenido_pagina"); // Captura de pantalla después de agregar el contenido de la página
    
    // And hago clic en Publish
    thenClicInPublish();
    cy.screenshot("clic_publicar_pagina"); // Captura de pantalla después de hacer clic en publicar
    
    // And hago clic en finalizar revisión
    thenClicInFinishReview();
    cy.screenshot("finalizar_revision_pagina"); // Captura de pantalla después de finalizar la revisión
    
    // And hago clic en Publish page
    thenClicInPublishPage();
    cy.screenshot("publicar_pagina"); // Captura de pantalla después de publicar la página
    
    // And cierro la ventana de página publicada
    thenCloseWindowPagePublished();
    cy.screenshot("cerrar_ventana_publicada"); // Captura de pantalla después de cerrar la ventana de página publicada
    
    // And veo en el listado de páginas la página con el titulo "Titulo página a editar"
    thenViewCreatedPageWithImage("Titulo página a editar");
    cy.screenshot("ver_pagina_con_imagen"); // Captura de pantalla de la vista de la página con imagen en el listado
    
    // And ingreso el nuevo título de la página "Titulo página modificada"
    thenInsertTitlePage("Titulo página modificada");
    cy.screenshot("insertar_titulo_pagina_modificada"); // Captura de pantalla después de modificar el título de la página
    
    // And hago clic en Update
    thenClicInUpdate();
    cy.screenshot("clic_en_actualizar"); // Captura de pantalla después de hacer clic en actualizar
    
    // And navego a la página de crear páginas
    thenNavigateToThePages();
    cy.screenshot("navegacion_paginas"); // Captura de pantalla después de regresar a la sección de páginas
    
    // And veo en el listado de páginas la página con el titulo "Titulo página modificada"
    thenViewCreatedPage("Titulo página modificada");
    cy.screenshot("ver_pagina_modificada"); // Captura de pantalla de la vista de la página con el título modificado en el listado
    
    // And cierro sesión
    thenCloseSession();
  });
});
