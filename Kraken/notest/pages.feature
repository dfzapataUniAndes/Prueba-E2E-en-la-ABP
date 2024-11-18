Feature: Crear Pages

 @user1 @web
  Scenario: EP_01 Como administrador inicio sesión, creo una página en Ghost exitosamente y la veo en el listado de páginas
    Given navego a la página de crear páginas
    When creo una nueva página con titulo "Titulo página" y contenido "Contenido de lá página"
    Then veo en el listado de páginas la página con el titulo "Titulo página"

  @user2 @web
  Scenario: EP_02 Como administrador inicio sesión, creo una página con una imagen por defecto y la visualizo luego de creada
    Given navego a la página de crear páginas
    When creo una nueva página con una imagen de portada, titulo "Titulo página con imagen" y contenido "Contenido de lá página"
    Then valido que la página con el titulo "Titulo página con imagen" tenga una imagen

  @user3 @web
  Scenario: EP_03 Como administrador inicio sesión, creo una página como borrador y la visualizo en el listado de páginas como draft
    Given navego a la página de crear páginas
    When creo una página como draft con titulo "Titulo página draft" y contenido "Contenido de lá página draft"
    Then veo en el listado de páginas la página con el titulo "Titulo página draft" y la etiqueta draft

  @user4 @web
  Scenario: EP_04 Como administrador inicio sesión, intento crear y hacer preview de una página en Ghost sin contenido y valido el draft generado
    Given navego a la página de crear páginas
    When hago preview de una nueva página con titulo "Titulo página sin contenido con imagen"
    Then veo en el listado de páginas la página con el titulo "Titulo página sin contenido con imagen" y la etiqueta draft

  @user5 @web
  Scenario: EP_17 Como administrador inicio sesión, edito el titulo de una página y la veo en el listado
    Given navego a la página de crear páginas
    When creo una página con título "Titulo página a editar" contenido "Contenido de lá página" y la edito con titulo "Titulo página modificada"
    Then veo en el listado de páginas la página con el titulo "Titulo página modificada"