Feature: Crear un post en Ghost

  @user1 @web
  Scenario: EP_05 Como administrador inicio sesión, creo un post en Ghost exitosamente y lo veo en el listado de posts
    Given que navego a la página 'http://localhost:2368/ghost/#/posts'
    And espero 1 segundos
    When que no existe ningún post creado en el sistema
    And navego a la página de creación de posts
    And espero 2 segundos
    And creo un nuevo post con el título "Mi primer Post" y contenido "Este es mi primer post de prueba en Ghost."
    And espero 2 segundos
    Then debería ver el post titulado "Mi primer Post" en la lista de posts

  @user2 @web
  Scenario: EP_06 Como administrador inicio sesión, trato de crear un post en Ghost sin completar el titulo, el contenido y hago clic en publicar
    Given navego a la página de creación de posts
    And espero 2 segundos
    When no debería ser posible crear un post con campos vacíos
    Then que navego a la página 'http://localhost:2368/ghost/#/posts'

 @user3 @web
  Scenario: EP_07 Como administrador inicio sesión, trato de crear un post en Ghost con titulo pero sin contenido y hago clic en publicar
   Given navego a la página de creación de posts
   And espero 2 segundos
   When creo un nuevo post con título "Este es un mensaje de prueba" y contenido vacio
   And espero 2 segundos
   Then debería ver el post titulado "Este es un mensaje de prueba" en la lista de posts

  @user4 @web
  Scenario: EP_08 Como administrador inicio sesión, trato de crear un post en Ghost con titulo vacio pero con contenido y hago clic en publicar
    Given navego a la página de creación de posts
    And espero 3 segundos
    When creo un nuevo post con título vacio y contenido "Este es un mensaje de prueba"
    Then debería ver el post titulado "(Untitled)" en la lista de posts

  @user5 @web
  Scenario: Como quinto usuario intento crear un post con caracteres especiales
    Given navego a la página de creación de posts
    And espero 5 segundos
    When creo un nuevo post con el título "&6*(@#$%^%#@!ñ" y contenido "$%{:>}#@@@@!!@##$%#$%$%$&%&<>)(**"
    Then debería ver el post titulado "&6*(@#$%^%#@!ñ" en la lista de posts
