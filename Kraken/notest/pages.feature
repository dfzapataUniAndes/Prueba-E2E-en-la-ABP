Feature: Crear Pages

  @user1 @web
  Scenario: EP_01 Como administrador inicio sesión, creo una página en Ghost exitosamente y la veo en el listado de páginas
    Given navego a la página de crear páginas
    And espero 5 segundos
    When hago clic en crear nueva página
    And espero 5 segundos
    And ingreso el título de la página "Titulo página"
    And espero 2 segundos
    And ingreso el contenido de la página "Contenido de lá página"
    And espero 2 segundos
    And hago clic en Publish
    And espero 2 segundos
    And hago clic en finalizar revisión
    And espero 2 segundos
    And hago clic en Publish page
    And espero 2 segundos
    And cierro la ventana de página publicada
    And espero 2 segundos
    Then veo en el listado de páginas la página con el titulo "Titulo página"
    And espero 2 segundos
    And cierro sesión

  @user2 @web
  Scenario: EP_02 Como administrador inicio sesión, creo una página con una imagen por defecto y la visualizo luego de creada
    Given navego a la página de crear páginas
    And espero 5 segundos
    When navego a la página de crear páginas
    And espero 5 segundos
    Then hago clic en crear nueva página
    And espero 5 segundos
    And selecciono una imagen de portada
    And ingreso el título de la página "Titulo página con imagen"
    And espero 2 segundos
    And ingreso el contenido de la página "Contenido de lá página"
    And espero 2 segundos
    And hago clic en Publish
    And espero 2 segundos
    And hago clic en finalizar revisión
    And espero 2 segundos
    And hago clic en Publish page
    And espero 2 segundos
    And cierro la ventana de página publicada
    And espero 5 segundos
    And abro en el listado de páginas la página con el titulo "Titulo página con imagen"
    And espero 2 segundos
    And valido que la página tenga una imagen
    And espero 2 segundos
    And cierro sesión

  @user3 @web
  Scenario: EP_03 Como administrador inicio sesión, creo una página como borrador y la visualizo en el listado de páginas como draft
    Given navego a la página de crear páginas
    And espero 5 segundos
    When hago clic en crear nueva página
    And espero 5 segundos
    Then ingreso el título de la página "Titulo página draft"
    And espero 2 segundos
    And ingreso el contenido de la página "Contenido de lá página draft"
    And espero 3 segundos
    And navego a la página de crear páginas
    And espero 2 segundos
    And veo en el listado de páginas la página con el titulo "Titulo página draft" y la etiqueta draft
    And espero 2 segundos
    And cierro sesión

  @user4 @web
  Scenario: EP_04 Como administrador inicio sesión, intento crear y hacer preview de una página en Ghost sin contenido y valido el draft generado
    Given navego a la página de crear páginas
    And espero 5 segundos
    When hago clic en crear nueva página
    And espero 5 segundos
    Then selecciono una imagen de portada
    And ingreso el título de la página "Titulo página sin contenido con imagen"
    And espero 5 segundos
    And hago clic en Preview
    And espero 3 segundos
    And hago clic en Editor
    And espero 3 segundos
    And navego a la página de crear páginas
    And espero 5 segundos
    And veo en el listado de páginas la página con el titulo "Titulo página sin contenido con imagen" y la etiqueta draft
    And espero 2 segundos
    And cierro sesión