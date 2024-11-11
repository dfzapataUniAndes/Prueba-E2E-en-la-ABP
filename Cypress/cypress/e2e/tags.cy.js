import {
  givenNavigateToTheSite,
  givenUserIsLogin,
} from "../steps/givenSteps.cy";
import { whenNavigateToTheTags } from "../steps/whenSteps.cy";
import {
  thenCreateNewTag,
  thenInsertTitleTag,
  thenInsertTagDescription,
  thenClickInSaveTag,
  thenViewCreatedTag,
  thenTagCreationShouldFail,
  thenCloseSession,
} from "../steps/thenSteps.cy";

describe("Crear un tag en Ghost", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador
    givenNavigateToTheSite();
    givenUserIsLogin(Cypress.env("emailTest2"), Cypress.env("passwordTest2"));
  });

  it("Como administrador inicio sesión, creo un tag en Ghost exitosamente y lo veo en el listado de tags", () => {
    // When navego a la página de crear tags
    whenNavigateToTheTags();

    // And hago clic en crear Tag:
    thenCreateNewTag();

    // And ingreso el nombre del tag "Nuevo Tag"
    thenInsertTitleTag("Nuevo Tag");

    // And ingreso la descripcion del tag "Contenido del Tag"
    thenInsertTagDescription("Descripción del Tag");

    // And hago clic en Save
    thenClickInSaveTag();

    // And veo en el listado de tags, el tag con el titulo "Nuevo Tag"
    thenViewCreatedTag("Nuevo Tag");

    // And cierro sesión
    thenCloseSession();
  });

  it("Como administrador inicio sesión, trato de crear un tag en Ghost sin descripción y hago clic en guardar", () => {
    // When navego a la página de crear tags
    whenNavigateToTheTags();

    // And hago clic en crear Tag:
    thenCreateNewTag();

    // And ingreso el nombre del tag "Nuevo Tag"
    thenInsertTitleTag("Nuevo Tag sin descripción");

    // And ingreso la descripcion del tag "Contenido del Tag"
    thenInsertTagDescription("");

    // And hago clic en Save
    thenClickInSaveTag();

    // And veo en el listado de tags, el tag con el titulo "Nuevo Tag"
    thenViewCreatedTag("Nuevo Tag sin descripción");

    // And cierro sesión
    thenCloseSession();
  });

  it("Como administrador inicio sesión, trato de crear un tag en Ghost sin titulo pero con descripción y hago clic en guardar", () => {
    // When navego a la página de crear tags
    whenNavigateToTheTags();

    // And hago clic en crear Tag:
    thenCreateNewTag();

    // And ingreso el nombre del tag "Nuevo Tag"
    thenInsertTitleTag("");

    // And ingreso la descripcion del tag "Contenido del Tag"
    thenInsertTagDescription("Nuevo Tag sin titulo");

    // And hago clic en Save
    thenClickInSaveTag();

    // And no deberia ser posible guadar el tag
    thenTagCreationShouldFail();

    // And cierro sesión
    thenCloseSession();
  });

  it("Como administrador inicio sesión, trato de crear un tag en Ghost con titulo pero con una descripción excesivamente larga", () => {
    // Creamos una cadena de caracteres larga de mas de 500 caracteres:
    const descripcionLarga = "a".repeat(550);

    // When navego a la página de crear tags
    whenNavigateToTheTags();

    // And hago clic en crear Tag:
    thenCreateNewTag();

    // And ingreso el nombre del tag "Nuevo Tag"
    thenInsertTitleTag("Nuevo Tag");

    // And ingreso la descripcion del tag "Contenido del Tag"
    thenInsertTagDescription(descripcionLarga);

    // And hago clic en Save
    thenClickInSaveTag();

    // And no deberia ser posible guadar el tag
    thenTagCreationShouldFail();

    // And cierro sesión
    thenCloseSession();
  });
});
