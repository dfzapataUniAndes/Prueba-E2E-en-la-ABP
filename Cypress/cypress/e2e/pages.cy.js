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

import {getRandomInt} from '../support/helpers'

import {faker} from '@faker-js/faker'


let dataPages = [];
let dataPagesDynamic = [];
let functionalityName = "Crear pages"
const STEP_GIVEN = "PASO_GIVEN";
const STEP_WHEN = "PASO_WHEN";
const STEP_THEN = "PASO_THEN";

const apiKey = '4c728640';
let mockarooApiUrl = `https://my.api.mockaroo.com/pages.json?key=${apiKey}`;

describe(functionalityName, () => {
  beforeEach(() => {
    cy.fixture("pages.json").then((data) => {
      dataPages = data;
    });

    cy.request(mockarooApiUrl)
    .then((response) => {
      dataPagesDynamic = response.body;
    });
    
    // Given que inicio sesión como administrador
    givenNavigateToTheSite();
    givenUserIsLogin(Cypress.env("emailTest1"), Cypress.env("passwordTest1"));
  });

  afterEach(() => {
    // And cierro sesión
    andCloseSession();
  });

  it("EP_01_A_PRIORI Como administrador inicio sesión, creo una página en Ghost exitosamente y la veo en el listado de páginas", () => {
    const scenarioId = "EP_01_A_PRIORI";
    const titlePage = dataPages[getRandomInt(0, dataPages.length)]["page_title"];
    const contentPage = dataPages[getRandomInt(0, dataPages.length)]["page_content"];
    
    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPage(titlePage, scenarioId+STEP_THEN, functionalityName); 
  });

  it("EP_02_PSEUDO Como administrador inicio sesión, creo una página en Ghost exitosamente y la veo en el listado de páginas (a priori)", () => {
    const scenarioId = "EP_02_PSEUDO";
    const titlePage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];
    const contentPage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_content"];
    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPage(titlePage, scenarioId+STEP_THEN, functionalityName); 
  });

  it("EP_03_ALEATORIO Como administrador inicio sesión, creo una página en Ghost exitosamente y la veo en el listado de páginas (a priori)", () => {
    const scenarioId = "EP_03_ALEATORIO";
    faker.seed(Date.now() ^ (Math.random() * 0x100000000));
    const titlePage = faker.lorem.words();
    const contentPage = faker.lorem.paragraph();

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPage(titlePage, scenarioId+STEP_THEN, functionalityName); 
  });

  it("EP_04_A_PRIORI Como administrador inicio sesión, creo una página con una imagen por defecto y la visualizo luego de creada", () => {
    const scenarioId = "EP_04_A_PRIORI";
    const titlePage = dataPages[getRandomInt(0, dataPages.length)]["page_title"];
    const contentPage = dataPages[getRandomInt(0, dataPages.length)]["page_content"];

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andSelecteCoverImage();
    andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenValidatePageWithImage(titlePage, scenarioId+STEP_THEN, functionalityName);
  });

  it("EP_05_PSEUDO Como administrador inicio sesión, creo una página con una imagen por defecto y la visualizo luego de creada", () => {
    const scenarioId = "EP_05_PSEUDO";
    const titlePage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];
    const contentPage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_content"];
    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andSelecteCoverImage();
    andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenValidatePageWithImage(titlePage, scenarioId+STEP_THEN, functionalityName);
  });

  it("EP_06_ALEATORIO Como administrador inicio sesión, creo una página con una imagen por defecto y la visualizo luego de creada", () => {
    const scenarioId = "EP_06_ALEATORIO";
    faker.seed(Date.now() ^ (Math.random() * 0x100000000));
    const titlePage = faker.lorem.words();
    const contentPage = faker.lorem.paragraph();

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andSelecteCoverImage();
    andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenValidatePageWithImage(titlePage, scenarioId+STEP_THEN, functionalityName);
  });

  it("EP_07_A_PRIORI Como administrador inicio sesión, creo una página como borrador y la visualizo en el listado de páginas como draft", () => {
    const scenarioId = "EP_07_A_PRIORI";
    const titlePage = dataPages[getRandomInt(0, dataPages.length)]["page_title"];
    const contentPage = dataPages[getRandomInt(0, dataPages.length)]["page_content"];

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andInsertTitleContentPageDraft(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPageAndLabelDraft(titlePage, scenarioId+STEP_THEN, functionalityName);
  });

  it("EP_08_PSEUDO Como administrador inicio sesión, creo una página como borrador y la visualizo en el listado de páginas como draft", () => {
    const scenarioId = "EP_08_PSEUDO";
    const titlePage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];
    const contentPage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_content"];

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andInsertTitleContentPageDraft(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPageAndLabelDraft(titlePage, scenarioId+STEP_THEN, functionalityName);
  });

  it("EP_09_ALEATORIO Como administrador inicio sesión, creo una página como borrador y la visualizo en el listado de páginas como draft", () => {
    const scenarioId = "EP_09_ALEATORIO";
    faker.seed(Date.now() ^ (Math.random() * 0x100000000));
    const titlePage = faker.lorem.words();
    const contentPage = faker.lorem.paragraph();

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andInsertTitleContentPageDraft(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPageAndLabelDraft(titlePage, scenarioId+STEP_THEN, functionalityName);
  });

  it("EP_10_A_PRIORI Como administrador inicio sesión, intento crear y hacer preview de una página en Ghost sin contenido y valido el draft generado", () => {
    const scenarioId = "EP_10_A_PRIORI";
    const titlePage = dataPages[getRandomInt(0, dataPages.length)]["page_title"];

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andSelecteCoverImage();
    andInsertTitleContentPagePreview(titlePage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPageAndLabelDraft(titlePage, scenarioId+STEP_THEN, functionalityName);
  });

  it("EP_11_PSEUDO Como administrador inicio sesión, intento crear y hacer preview de una página en Ghost sin contenido y valido el draft generado", () => {
    const scenarioId = "EP_11_PSEUDO";
    const titlePage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andSelecteCoverImage();
    andInsertTitleContentPagePreview(titlePage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPageAndLabelDraft(titlePage, scenarioId+STEP_THEN, functionalityName);
  });

  it("EP_12_ALEATORIO Como administrador inicio sesión, intento crear y hacer preview de una página en Ghost sin contenido y valido el draft generado", () => {
    const scenarioId = "EP_12_ALEATORIO";
    faker.seed(Date.now() ^ (Math.random() * 0x100000000));
    const titlePage = faker.lorem.words();

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andSelecteCoverImage();
    andInsertTitleContentPagePreview(titlePage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPageAndLabelDraft(titlePage, scenarioId+STEP_THEN, functionalityName);
  });
  
});

functionalityName = "Edit pages"

describe(functionalityName, () => {
  beforeEach(() => {
    cy.fixture("pages.json").then((data) => {
      dataPages = data;
    });

    cy.request(mockarooApiUrl)
    .then((response) => {
      dataPagesDynamic = response.body;
    });
    
    // Given que inicio sesión como administrador
    givenNavigateToTheSite();
    givenUserIsLogin(Cypress.env("emailTest1"), Cypress.env("passwordTest1"));
  });

  afterEach(() => {
    // And cierro sesión
    andCloseSession();
  });

  it("EP_13_A_PRIORI Como administrador inicio sesión, edito el titulo de una página y la veo en el listado", () => {
    const scenarioId = "EP_13_A_PRIORI";
    const titlePage = dataPages[getRandomInt(0, dataPages.length)]["page_title"];
    const contentPage = dataPages[getRandomInt(0, dataPages.length)]["page_content"];
    const titlePageEdit = dataPages[getRandomInt(0, dataPages.length)]["page_title"];

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    andViewCreatedPageWithImage(titlePage);
    andUpdateTitle(titlePageEdit, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPage(titlePageEdit, scenarioId+STEP_THEN, functionalityName); 
  });

  it("EP_14_PSEUDO Como administrador inicio sesión, edito el titulo de una página y la veo en el listado", () => {
    const scenarioId = "EP_14_PSEUDO";
    const titlePage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];
    const contentPage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_content"];
    const titlePageEdit = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    andViewCreatedPageWithImage(titlePage);
    andUpdateTitle(titlePageEdit, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPage(titlePageEdit, scenarioId+STEP_THEN, functionalityName); 
  });

  it("EP_15_ALEATORIO Como administrador inicio sesión, edito el titulo de una página y la veo en el listado", () => {
    const scenarioId = "EP_15_ALEATORIO";
    faker.seed(Date.now() ^ (Math.random() * 0x100000000));
    const titlePage = faker.lorem.words();
    const contentPage = faker.lorem.paragraph();
    const titlePageEdit = faker.lorem.words();

    givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
    whenCreateNewPage();
    andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
    andViewCreatedPageWithImage(titlePage);
    andUpdateTitle(titlePageEdit, contentPage, scenarioId+STEP_WHEN, functionalityName);
    thenViewCreatedPage(titlePageEdit, scenarioId+STEP_THEN, functionalityName); 
  });
  
});

