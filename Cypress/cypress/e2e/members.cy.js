import {
  givenNavigateToTheSiteUrl,
  givenUserIsLogin,
} from "../steps/givenSteps.cy";
import { whenCreateNewMember } from "../steps/whenSteps.cy";
import {
  thenViewCreatedMember,
  thenMemberCreationShouldFail,
} from "../steps/thenSteps.cy";
import {
  andInsertMemberName,
  andInsertMemberEmail,
  andClickInSaveMember,
  andCloseSession,
} from "../steps/andSteps.cy";

const baseVerUrl = "http://localhost:" + Cypress.env("ghostBaseVersionPort");
const rpcVerUrl = "http://localhost:" + Cypress.env("ghostRcVersionPort");

describe("Crear un miembro en Ghost version base", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador
    givenNavigateToTheSiteUrl(baseVerUrl + "/ghost/#/signin");
    givenUserIsLogin(Cypress.env("emailTest2"), Cypress.env("passwordTest2"));
    givenNavigateToTheSiteUrl(baseVerUrl + "/ghost/#/members");
  });

  afterEach(() => {
    // And cierro sesión
    andCloseSession();
  });

  it("EP_13 Como administrador inicio sesión, creo un miembro en Ghost exitosamente y lo veo en el listado de miembros", () => {
    // When hago clic en crear Miembro:
    whenCreateNewMember();

    // And ingreso el nombre del miembro "Nuevo Miembro"
    andInsertMemberName("Nuevo Miembro");

    // And ingreso el email del miembro "miembro@example.com"
    andInsertMemberEmail("miembro@example.com");

    // And hago clic en Save
    andClickInSaveMember();

    // And veo en el listado de miembros, el miembro con el nombre "Nuevo Miembro"
    thenViewCreatedMember(
      Cypress.env("ghostBaseVersion"),
      baseVerUrl + "/ghost/#/members",
      "Nuevo Miembro"
    );
  });

  it("EP_14 Como administrador inicio sesión, trato de crear un miembro en Ghost sin email y hago clic en guardar", () => {
    // When hago clic en crear Miembro:
    whenCreateNewMember();

    // And ingreso el nombre del miembro "Miembro sin email"
    andInsertMemberName("Miembro sin email");

    // And ingreso el email del miembro ""
    andInsertMemberEmail("");

    // And hago clic en Save
    andClickInSaveMember();

    // And no deberia ser posible guadar el miembro
    thenMemberCreationShouldFail();
  });

  it("EP_15 Como administrador inicio sesión, trato de crear un miembro en Ghost sin nombre pero con email y hago clic en guardar", () => {
    // When hago clic en crear Miembro:
    whenCreateNewMember();

    // And ingreso el nombre del miembro ""
    andInsertMemberName("");

    // And ingreso el email del miembro "miembro@example.com"
    andInsertMemberEmail("miembro@example.com");

    // And hago clic en Save
    andClickInSaveMember();

    // And no deberia ser posible guadar el miembro
    thenMemberCreationShouldFail();
  });
});

describe("Crear un miembro en Ghost version rc", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador
    givenNavigateToTheSiteUrl(rpcVerUrl + "/ghost/#/signin");
    givenUserIsLogin(Cypress.env("emailTest2"), Cypress.env("passwordTest2"));
    givenNavigateToTheSiteUrl(rpcVerUrl + "/ghost/#/members");
  });

  afterEach(() => {
    // And cierro sesión
    andCloseSession();
  });

  it("EP_13 Como administrador inicio sesión, creo un miembro en Ghost exitosamente y lo veo en el listado de miembros", () => {
    // When hago clic en crear Miembro:
    whenCreateNewMember();

    // And ingreso el nombre del miembro "Nuevo Miembro"
    andInsertMemberName("Nuevo Miembro");

    // And ingreso el email del miembro "miembro@example.com"
    andInsertMemberEmail("miembro@example.com");

    // And hago clic en Save
    andClickInSaveMember();

    // And veo en el listado de miembros, el miembro con el nombre "Nuevo Miembro"
    thenViewCreatedMember(
      Cypress.env("ghostRcVersion"),
      rpcVerUrl + "/ghost/#/members",
      "Nuevo Miembro"
    );
  });
});