import {
  givenNavigateToTheSiteUrl,
  givenUserIsLogin,
} from "../steps/givenSteps.cy";
import { whenCreateNewTag } from "../steps/whenSteps.cy";
import {
  thenViewCreatedTag,
  thenTagCreationShouldFail,
} from "../steps/thenSteps.cy";
import {
  andInsertTitleTag,
  andInsertTagDescription,
  andClickInSaveTag,
  andCloseSession,
} from "../steps/andSteps.cy";

describe("Crear un tag en Ghost", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador
    givenNavigateToTheSiteUrl("http://localhost:2368/ghost/#/signin");
    givenUserIsLogin(Cypress.env("emailTest2"), Cypress.env("passwordTest2"));
    givenNavigateToTheSiteUrl("http://localhost:2368/ghost/#/tags");
  });

  afterEach(() => {
    // And cierro sesión
    andCloseSession();
  });

  it("EP_09 Como administrador inicio sesión, creo un tag en Ghost exitosamente y lo veo en el listado de tags", () => {
    // When hago clic en crear Tag:
    whenCreateNewTag();

    // And ingreso el nombre del tag "Nuevo Tag"
    andInsertTitleTag("Nuevo Tag");

    // And ingreso la descripcion del tag "Contenido del Tag"
    andInsertTagDescription, "Descripción del Tag";

    // And hago clic en Save
    andClickInSaveTag();

    // And veo en el listado de tags, el tag con el titulo "Nuevo Tag"
    thenViewCreatedTag("Nuevo Tag");
  });

  it("EP_10 Como administrador inicio sesión, trato de crear un tag en Ghost sin descripción y hago clic en guardar", () => {
    // When hago clic en crear Tag:
    whenCreateNewTag();

    // And ingreso el nombre del tag "Nuevo Tag"
    andInsertTitleTag("Nuevo Tag sin descripción");

    // And ingreso la descripcion del tag "Contenido del Tag"
    andInsertTagDescription, "";

    // And hago clic en Save
    andClickInSaveTag();

    // And veo en el listado de tags, el tag con el titulo "Nuevo Tag"
    thenViewCreatedTag("Nuevo Tag sin descripción");
  });

  it("EP_11 Como administrador inicio sesión, trato de crear un tag en Ghost sin titulo pero con descripción y hago clic en guardar", () => {
    // When hago clic en crear Tag:
    whenCreateNewTag();

    // And ingreso el nombre del tag "Nuevo Tag"
    andInsertTitleTag("");

    // And ingreso la descripcion del tag "Contenido del Tag"
    andInsertTagDescription, "Nuevo Tag sin titulo";

    // And hago clic en Save
    andClickInSaveTag();

    // And no deberia ser posible guadar el tag
    thenTagCreationShouldFail();
  });

  it("EP_12 Como administrador inicio sesión, trato de crear un tag en Ghost con titulo pero con una descripción excesivamente larga", () => {
    // Creamos una cadena de caracteres larga de mas de 500 caracteres:
    const descripcionLarga = "a".repeat(550);

    // When hago clic en crear Tag:
    whenCreateNewTag();

    // And ingreso el nombre del tag "Nuevo Tag"
    andInsertTitleTag("Nuevo Tag");

    // And ingreso la descripcion del tag "Contenido del Tag"
    andInsertTagDescription(descripcionLarga);

    // And hago clic en Save
    andClickInSaveTag();

    // And no deberia ser posible guadar el tag
    thenTagCreationShouldFail();
  });
});
