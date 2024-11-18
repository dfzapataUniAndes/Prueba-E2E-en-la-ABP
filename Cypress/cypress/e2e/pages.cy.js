import {
  givenNavigateToTheSite,
  givenUserIsLogin,
  givenNavigateToThePages
} from "../steps/givenSteps.cy";
import { whenNavigateToThePages,
  whenCreateNewPage
 } from "../steps/whenSteps.cy";
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
  thenClicInUpdate,
} from "../steps/thenSteps.cy";

import {
  andInsertTitleContentPage,
  andCloseSession,
  andSelecteCoverImage
} from "../steps/andSteps.cy";

describe("Crear pages", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador
    givenNavigateToTheSite();
    givenUserIsLogin(Cypress.env("emailTest1"), Cypress.env("passwordTest1"));
  });

  afterEach(() => {
    // And cierro sesión
    andCloseSession();
  });

  it("EP_01 Como administrador inicio sesión, creo una página en Ghost exitosamente y la veo en el listado de páginas", () => {
    givenNavigateToThePages("EP_01_PASO_GIVEN", "Crear pages");
    whenCreateNewPage();
    andInsertTitleContentPage("Titulo página", "Contenido de lá página", "EP_01_PASO_WHEN", "Crear pages");
    thenViewCreatedPage("Titulo página", "EP_01_PASO_THEN", "Crear pages"); 
  });


  it("EP_02 Como administrador inicio sesión, creo una página con una imagen por defecto y la visualizo luego de creada", () => {
    givenNavigateToThePages("EP_02_PASO_GIVEN", "Crear pages");
    whenCreateNewPage();
    andSelecteCoverImage();
    andInsertTitleContentPage("Titulo página", "Contenido de lá página", "EP_02_PASO_WHEN", "Crear pages");
    thenValidatePageWithImage("Titulo página", "EP_02_PASO_THEN", "Crear pages");
  });

  it("EP_03 Como administrador inicio sesión, creo una página como borrador y la visualizo en el listado de páginas como draft", () => {
    // When navego a la página de crear páginas
    whenNavigateToThePages();
    // Then hago clic en crear nueva página
    thenCreateNewPage();
    // And ingreso el título de la página "Titulo página draft"
    thenInsertTitlePage("Titulo página draft");
    // And ingreso el contenido de la página "Contenido de lá página draft"
    thenInsertContentPage("Contenido de lá página draft");
    // And navego a la página de crear páginas
    thenNavigateToThePages();
    // And veo en el listado de páginas la página con el titulo "Titulo página draft" y la etiqueta draft
    thenViewCreatedPageAndLabelDraft("Titulo página draft");
    // And cierro sesión
    thenCloseSession();
  });

  it("EP_04 Como administrador inicio sesión, intento crear y hacer preview de una página en Ghost sin contenido y valido el draft generado", () => {
    // When navego a la página de crear páginas
    whenNavigateToThePages();
    // Then hago clic en crear nueva página
    thenCreateNewPage();
    // And selecciono una imagen de portada
    thenSelecteCoverImage();
    // And ingreso el título de la página "Titulo página sin contenido con imagen"
    thenInsertTitlePage("Titulo página sin contenido con imagen");
    // And hago clic en Preview
    thenClicInPreview();
    // And hago clic en Editor
    thenClicInEditor();
    // And navego a la página de crear páginas
    thenNavigateToThePages();
    // And veo en el listado de páginas la página con el titulo "Titulo página sin contenido con imagen" y la etiqueta draft
    thenViewCreatedPageAndLabelDraft("Titulo página sin contenido con imagen");
    // And cierro sesión
    thenCloseSession();
  });

  it("EP_17 Como administrador inicio sesión, edito el titulo de una página y la veo en el listado", () => {
    // When navego a la página de crear páginas
    whenNavigateToThePages();
    // And hago clic en crear nueva página
    thenCreateNewPage();
    // And ingreso el título de la página "Titulo página"
    thenInsertTitlePage("Titulo página a editar");
    // And ingreso el contenido de la página "Contenido de lá página"
    thenInsertContentPage("Contenido de lá página");
    // And hago clic en Publish
    thenClicInPublish();
    // And hago clic en finalizar revisión
    thenClicInFinishReview();
    // And hago clic en Publish page
    thenClicInPublishPage();
    // And cierro la ventana de página publicada
    thenCloseWindowPagePublished();
    // Then abro en el listado de páginas la página con el titulo "Titulo página a editar"
    thenViewCreatedPageWithImage("Titulo página a editar");
    // And ingreso el título de la página "Titulo página modificada"
    thenInsertTitlePage("Titulo página modificada");
    // And hago clic en Update
    thenClicInUpdate();
    // And navego a la página de crear páginas
    thenNavigateToThePages();
    // And veo en el listado de páginas la página con el titulo "Titulo página modificada"
    thenViewCreatedPage("Titulo página modificada");
    // And cierro sesión
    thenCloseSession();
  });

  
});
