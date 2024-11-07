Feature: Crear un post en Ghost 

Feature: Inicio de sesión y publicación de un mensaje en Ghost CMS

  @user1 @web
  Scenario: Como primer usuario inicio sesión y publico un mensaje en Ghost
    Given que navego a la página "http://localhost:2368/ghost/#/signin"
    And espero 5 segundos
    And que no existe ningún post creado en el sistema
    When ingreso el correo "<USERNAME1>"
    And espero 2 segundos
    And ingreso la contraseña "<PASSWORD1>"
    And espero 2 segundos
    And hago clic en iniciar sesión
    And espero 7 segundos
    And navego a la página de creación de posts
    And creo un nuevo post con el título "Mensaje para Usuario 2" y contenido "Este es un mensaje de prueba para el usuario 2."
    And espero 5 segundos
    Then debería ver el post titulado "Mensaje para Usuario 2" en la lista de posts