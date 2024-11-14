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

describe("Crear un tag en Ghost con pruebas de regresión visual", () => {
  beforeEach(() => {
    // Given que inicio sesión como administrador
    givenNavigateToTheSite();
    givenUserIsLogin(Cypress.env("emailTest2"), Cypress.env("passwordTest2"));
    cy.screenshot("inicio_sesion_tag"); // Captura de pantalla después de iniciar sesión
  });

  it("EP_09 Crear un tag exitosamente y verlo en el listado de tags", () => {
    // When navego a la página de crear tags
    whenNavigateToTheTags();
    cy.screenshot("navegacion_tags"); // Captura de pantalla después de navegar a la sección de tags
    
    // And hago clic en crear Tag
    thenCreateNewTag();
    cy.screenshot("crear_nuevo_tag"); // Captura de pantalla después de iniciar el proceso de creación de tag
    
    // And ingreso el nombre del tag "Nuevo Tag"
    thenInsertTitleTag("Nuevo Tag");
    cy.screenshot("insertar_titulo_tag"); // Captura de pantalla después de agregar el título del tag
    
    // And ingreso la descripcion del tag "Descripción del Tag"
    thenInsertTagDescription("Descripción del Tag");
    cy.screenshot("insertar_descripcion_tag"); // Captura de pantalla después de agregar la descripción del tag
    
    // And hago clic en Save
    thenClickInSaveTag();
    cy.screenshot("guardar_tag"); // Captura de pantalla después de hacer clic en guardar
    
    // And veo en el listado de tags, el tag con el titulo "Nuevo Tag"
    thenViewCreatedTag("Nuevo Tag");
    cy.screenshot("ver_tag_creado"); // Captura de pantalla de la vista del tag creado en el listado
    
    // And cierro sesión
    thenCloseSession();
  });

  it("EP_10 Crear un tag sin descripción y verlo en el listado", () => {
    // When navego a la página de crear tags
    whenNavigateToTheTags();
    cy.screenshot("navegacion_tags"); // Captura de pantalla después de navegar a la sección de tags
    
    // And hago clic en crear Tag
    thenCreateNewTag();
    cy.screenshot("crear_nuevo_tag"); // Captura de pantalla después de iniciar el proceso de creación de tag
    
    // And ingreso el nombre del tag "Nuevo Tag sin descripción"
    thenInsertTitleTag("Nuevo Tag sin descripción");
    cy.screenshot("insertar_titulo_tag_sin_descripcion"); // Captura de pantalla después de agregar el título del tag
    
    // And dejo la descripcion del tag vacía
    thenInsertTagDescription("");
    cy.screenshot("insertar_descripcion_vacia"); // Captura de pantalla después de dejar la descripción vacía
    
    // And hago clic en Save
    thenClickInSaveTag();
    cy.screenshot("guardar_tag"); // Captura de pantalla después de hacer clic en guardar
    
    // And veo en el listado de tags, el tag con el titulo "Nuevo Tag sin descripción"
    thenViewCreatedTag("Nuevo Tag sin descripción");
    cy.screenshot("ver_tag_sin_descripcion"); // Captura de pantalla de la vista del tag en el listado
    
    // And cierro sesión
    thenCloseSession();
  });

  it("EP_11 Crear un tag sin título pero con descripción y verificar que falla", () => {
    // When navego a la página de crear tags
    whenNavigateToTheTags();
    cy.screenshot("navegacion_tags"); // Captura de pantalla después de navegar a la sección de tags
    
    // And hago clic en crear Tag
    thenCreateNewTag();
    cy.screenshot("crear_nuevo_tag"); // Captura de pantalla después de iniciar el proceso de creación de tag
    
    // And dejo el título del tag vacío
    thenInsertTitleTag("");
    cy.screenshot("insertar_titulo_vacio"); // Captura de pantalla después de dejar el título vacío
    
    // And ingreso la descripción del tag "Nuevo Tag sin titulo"
    thenInsertTagDescription("Nuevo Tag sin titulo");
    cy.screenshot("insertar_descripcion_tag_sin_titulo"); // Captura de pantalla después de agregar la descripción del tag
    
    // And hago clic en Save
    thenClickInSaveTag();
    cy.screenshot("guardar_tag"); // Captura de pantalla después de hacer clic en guardar
    
    // And verifico que la creación del tag falla
    thenTagCreationShouldFail();
    cy.screenshot("error_creacion_tag"); // Captura de pantalla después de la falla en la creación del tag
    
    // And cierro sesión
    thenCloseSession();
  });

  it("EP_12 Crear un tag con descripción excesivamente larga y verificar que falla", () => {
    // Creamos una cadena de caracteres larga de más de 500 caracteres
    const descripcionLarga = "a".repeat(550);

    // When navego a la página de crear tags
    whenNavigateToTheTags();
    cy.screenshot("navegacion_tags"); // Captura de pantalla después de navegar a la sección de tags
    
    // And hago clic en crear Tag
    thenCreateNewTag();
    cy.screenshot("crear_nuevo_tag"); // Captura de pantalla después de iniciar el proceso de creación de tag
    
    // And ingreso el nombre del tag "Nuevo Tag"
    thenInsertTitleTag("Nuevo Tag");
    cy.screenshot("insertar_titulo_tag"); // Captura de pantalla después de agregar el título del tag
    
    // And ingreso una descripción excesivamente larga para el tag
    thenInsertTagDescription(descripcionLarga);
    cy.screenshot("insertar_descripcion_larga"); // Captura de pantalla después de agregar una descripción larga
    
    // And hago clic en Save
    thenClickInSaveTag();
    cy.screenshot("guardar_tag"); // Captura de pantalla después de hacer clic en guardar
    
    // And verifico que la creación del tag falla debido a la descripción larga
    thenTagCreationShouldFail();
    cy.screenshot("error_creacion_tag_largo"); // Captura de pantalla después de la falla en la creación del tag
    
    // And cierro sesión
    thenCloseSession();
  });
});
