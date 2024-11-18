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
  andSelecteCoverImage,
  andInsertTitleContentPageDraft,
  andInsertTitleContentPagePreview,
  andViewCreatedPageWithImage,
  andUpdateTitle
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
    andInsertTitleContentPage("Titulo página con imagen", "Contenido de lá página", "EP_02_PASO_WHEN", "Crear pages");
    thenValidatePageWithImage("Titulo página con imagen", "EP_02_PASO_THEN", "Crear pages");
  });

  it("EP_03 Como administrador inicio sesión, creo una página como borrador y la visualizo en el listado de páginas como draft", () => {
    givenNavigateToThePages("EP_03_PASO_GIVEN", "Crear pages");
    whenCreateNewPage();
    andInsertTitleContentPageDraft("Titulo página draft", "Contenido de lá página draft", "EP_03_PASO_WHEN", "Crear pages");
    thenViewCreatedPageAndLabelDraft("Titulo página draft", "EP_03_PASO_THEN", "Crear pages");
  });

  it("EP_04 Como administrador inicio sesión, intento crear y hacer preview de una página en Ghost sin contenido y valido el draft generado", () => {
    givenNavigateToThePages("EP_04_PASO_GIVEN", "Crear pages");
    whenCreateNewPage();
    andSelecteCoverImage();
    andInsertTitleContentPagePreview("Titulo página sin contenido con imagen", "EP_04_PASO_WHEN", "Crear pages");
    thenViewCreatedPageAndLabelDraft("Titulo página sin contenido con imagen", "EP_04_PASO_THEN", "Crear pages");
  });

  it("EP_17 Como administrador inicio sesión, edito el titulo de una página y la veo en el listado", () => {
    givenNavigateToThePages("EP_17_PASO_GIVEN", "Editar pages");
    whenCreateNewPage();
    andInsertTitleContentPage("Titulo página a editar", "Contenido de lá página", "EP_17_PASO_WHEN", "Editar pages");
    andViewCreatedPageWithImage("Titulo página a editar");
    andUpdateTitle("Titulo página modificada", "Contenido de lá página", "EP_17_PASO_WHEN", "Editar pages");
    thenViewCreatedPage("Titulo página modificada", "EP_17_PASO_THEN", "Editar pages"); 
  });
  
});
