import {
    givenNavigateToTheSite,
    givenUserIsLogin,
    givenNavigateToThePages
  } from "../steps/givenSteps.cy";
  import {  
    whenCreateNewPage
   } from "../steps/whenSteps.cy";
  import {
    thenViewUrlWithTitle,
    thenViewDate,
    thenViewCreatedPageWithFilterDraft,
    thenViewCreatedPageWithFilterMemberOnly,
    thenViewCreatedPageWithFilterPaidMemberOnly,
    thenViewError,
    thenViewUrlWithoutTitle,
    thenViewCreatedPageWithFilterScheduled,
    thenViewCreatedPage
  } from "../steps/thenSteps.cy";
  
  import {
    andInsertTitleContentPage,
    andCloseSession,
    andOpenCreatedPage,
    andInsertTitleContentPublishDate,
    andInsertTitleContentPageDraft,
    andUpdateTitleAndAccessMemberOnly,
    andUpdateTitleAndAccessPaidMemberOnly,
    andUpdateTitleAndDeleteAuthors,
    andUpdateTitleAndDisableTitle,
    andInsertTitleContentPageAndScheduled,
    andRevertSchedulePage,
    andUpdateTitle,
    andReturnState
  } from "../steps/andSteps.cy";
  
  import {getRandomInt} from '../support/helpers'
  
  import {faker} from '@faker-js/faker'
  
  
  let dataPages = [];
  let dataPagesDynamic = [];
  let functionalityName = "Crear pages"
  const STEP_GIVEN = "PASO_GIVEN";
  const STEP_WHEN = "PASO_WHEN";
  const STEP_THEN = "PASO_THEN";
  
  const apiKey = Cypress.env("apiKeyPages");
  let mockarooApiUrlPages = `https://my.api.mockaroo.com/pages.json?key=${apiKey}`;


describe(functionalityName, () => {
    beforeEach(() => {
      cy.fixture("pages.json").then((data) => {
        dataPages = data;
      });
  
      cy.request(mockarooApiUrlPages)
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
  
  
    it("EP_131 Como administrador inicio sesión, publico una página y veo la url de la página con su titulo", () => {
      const scenarioId = "EP_131";
      const titlePage = dataPages[getRandomInt(0, dataPages.length)]["page_title"];
      const contentPage = dataPages[getRandomInt(0, dataPages.length)]["page_content"];
  
      givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
      whenCreateNewPage();
      andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
      andOpenCreatedPage(titlePage);
      thenViewUrlWithTitle(titlePage, scenarioId+STEP_THEN, functionalityName);
    });

    it("EP_132 Como administrador inicio sesión, creo una página con fecha de publicación anterior a la de hoy", () => {
      const scenarioId = "EP_132";
      const titlePage = dataPages[getRandomInt(0, dataPages.length)]["page_title"];
      const contentPage = dataPages[getRandomInt(0, dataPages.length)]["page_content"];
      const datePage = "1992-09-09";
      const datePageValidate = "9 Sep 1992"
  
      givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
      whenCreateNewPage();
      andInsertTitleContentPublishDate(titlePage, contentPage, datePage, scenarioId+STEP_WHEN, functionalityName);
      andOpenCreatedPage(titlePage);
      thenViewDate(datePageValidate, scenarioId+STEP_THEN, functionalityName);
    });

    it("EP_133 Como administrador inicio sesión, creo una página draft y la veo en el listado aplicando el filtro de drafts", () => {
      const scenarioId = "EP_133";
      const titlePage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];
      const contentPage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_content"];
  
      givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
      whenCreateNewPage();
      andInsertTitleContentPageDraft(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
      thenViewCreatedPageWithFilterDraft(titlePage, scenarioId+STEP_THEN, functionalityName);
    });

    it("EP_134 Como administrador inicio sesión, creo y edito pagina con access member only y la veo en el listado con filtro de members only", () => {
      const scenarioId = "EP_134";
      const titlePage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];
      const contentPage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_content"];
      const titlePageEdit = dataPages[getRandomInt(0, dataPages.length)]["page_title"];

      givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
      whenCreateNewPage();
      andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
      andOpenCreatedPage(titlePage);
      andUpdateTitleAndAccessMemberOnly(titlePageEdit, contentPage, scenarioId+STEP_WHEN, functionalityName);
      thenViewCreatedPageWithFilterMemberOnly(titlePageEdit, scenarioId+STEP_THEN, functionalityName);
    });

    it("EP_135 Como administrador inicio sesión, creo y edito pagina con access paid-member only y la veo en el listado con filtro de paid-member only", () => {
      const scenarioId = "EP_135";
      const titlePage = dataPages[getRandomInt(0, dataPages.length)]["page_title"];
      const contentPage = dataPages[getRandomInt(0, dataPages.length)]["page_content"];
      const titlePageEdit = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];

      givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
      whenCreateNewPage();
      andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
      andOpenCreatedPage(titlePage);
      andUpdateTitleAndAccessPaidMemberOnly(titlePageEdit, contentPage, scenarioId+STEP_WHEN, functionalityName);
      thenViewCreatedPageWithFilterPaidMemberOnly(titlePageEdit, scenarioId+STEP_THEN, functionalityName);
    });

    it("EP_136 Como administrador inicio sesión, edito pagina, quito authors y sale error de validación", () => {
      const scenarioId = "EP_136";
      const titlePage = dataPages[getRandomInt(0, dataPages.length)]["page_title"];
      const contentPage = dataPages[getRandomInt(0, dataPages.length)]["page_content"];
      const titlePageEdit = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];
      const errorUpdateAuthor = "At least one author is required"

      givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
      whenCreateNewPage();
      andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
      andOpenCreatedPage(titlePage);
      andUpdateTitleAndDeleteAuthors(titlePageEdit, contentPage, scenarioId+STEP_WHEN, functionalityName);
      thenViewError(errorUpdateAuthor, scenarioId+STEP_THEN, functionalityName);
    });

    it("EP_137 Como administrador inicio sesión, edito una página deshabilitando el titulo y veo que no se muestra el titulo al ver la url de la página", () => {
      const scenarioId = "EP_137";
      const titlePage = dataPages[getRandomInt(0, dataPages.length)]["page_title"];
      const contentPage = dataPages[getRandomInt(0, dataPages.length)]["page_content"];
      const titlePageEdit = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];

      givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
      whenCreateNewPage();
      andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
      andOpenCreatedPage(titlePage);
      andUpdateTitleAndDisableTitle(titlePageEdit, contentPage, scenarioId+STEP_WHEN, functionalityName);
      thenViewUrlWithoutTitle(scenarioId+STEP_THEN, functionalityName);
    });
    
    it("EP_138 Como administrador inicio sesión, creo una página con schedule en 10 minutos, y se observa en el listado con filtro de scheduled", () => {
      const scenarioId = "EP_138";
      const titlePage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_title"];
      const contentPage = dataPagesDynamic[getRandomInt(0, dataPagesDynamic.length)]["page_content"];

      givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
      whenCreateNewPage();
      andInsertTitleContentPageAndScheduled(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
      thenViewCreatedPageWithFilterScheduled(titlePage, scenarioId+STEP_THEN, functionalityName);
    });

    it("EP_139 Como administrador inicio sesión, creo una página con schedule, revierto el schedule y la veo en el listado con filtro de draft", () => {
      const scenarioId = "EP_139";
      faker.seed(Date.now() ^ (Math.random() * 0x100000000));
      const titlePage = faker.lorem.words();
      const contentPage = faker.lorem.paragraph();

      givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
      whenCreateNewPage();
      andInsertTitleContentPageAndScheduled(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
      andOpenCreatedPage(titlePage);
      andRevertSchedulePage(titlePage, scenarioId+STEP_WHEN, functionalityName);
      thenViewCreatedPageWithFilterDraft(titlePage, scenarioId+STEP_THEN, functionalityName);
    });
    

    it("EP_140 Como administrador inicio sesión, creo y edito una página, me devuelvo a un estado anterior y veo el titulo inicial", () => {
      const scenarioId = "EP_140";
      faker.seed(Date.now() ^ (Math.random() * 0x100000000));
      const titlePage = faker.lorem.words();
      const contentPage = faker.lorem.paragraph();
      const titlePageEdit = faker.lorem.words();

      givenNavigateToThePages(scenarioId+STEP_GIVEN, functionalityName);
      whenCreateNewPage();
      andInsertTitleContentPage(titlePage, contentPage, scenarioId+STEP_WHEN, functionalityName);
      andOpenCreatedPage(titlePage);
      andUpdateTitle(titlePageEdit, contentPage, scenarioId+STEP_WHEN, functionalityName);
      andOpenCreatedPage(titlePageEdit);
      andReturnState(titlePageEdit)
      thenViewCreatedPage(titlePage, scenarioId+STEP_THEN, functionalityName); 
    });

  });
  
  
  