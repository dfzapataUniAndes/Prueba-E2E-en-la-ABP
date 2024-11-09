Feature: Crear un tag en Ghost 

  @user1 @web
  Scenario: Como primer usuario inicio sesión y creo un tag en Ghost
    Given que navego a la página "http://localhost:2368/ghost/#/signin"
    And espero 5 segundos
    When ingreso el correo "<USERNAME1>"
    And espero 2 segundos
    And ingreso la contraseña "<PASSWORD1>"
    And espero 2 segundos
    And hago clic en iniciar sesión
    And espero 7 segundos
    And navego a la página de creación de tags
    And creo un nuevo tag con el nombre "Tag de Prueba" y descripción "Este es un tag de prueba para Ghost."
    And espero 5 segundos
    Then debería ver el tag titulado "Tag de Prueba" en la lista de tags


  @user2 @web
  Scenario: Como segundo usuario inicio sesión y creo un tag en Ghost sin descripción
    Given que navego a la página "http://localhost:2368/ghost/#/signin"
    And espero 5 segundos
    When ingreso el correo "<USERNAME1>"
    And espero 2 segundos
    And ingreso la contraseña "<PASSWORD1>"
    And espero 2 segundos
    And hago clic en iniciar sesión
    And espero 7 segundos
    And navego a la página de creación de tags
    And creo un nuevo tag con el nombre "Tag de Prueba con descripcion vacia" y descripción vacia
    And espero 5 segundos
    Then debería ver el tag titulado "Tag de Prueba con descripcion vacia" en la lista de tags

    
@user3 @web
  Scenario: Como tercer usuario inicio sesión y creo un tag en Ghost sin nombre
    Given que navego a la página "http://localhost:2368/ghost/#/signin"
    And espero 5 segundos
    When ingreso el correo "<USERNAME1>"
    And espero 2 segundos
    And ingreso la contraseña "<PASSWORD1>"
    And espero 2 segundos
    And hago clic en iniciar sesión
    And espero 7 segundos
    And navego a la página de creación de tags
    And creo un nuevo tag con el nombre vacio y descripción "Este es un tag de prueba para Ghost."
    And espero 5 segundos
    Then no deberia ser posible crear el tag


@user4 @web
  Scenario: Como cuarto usuario, inicio sesión y creo una etiqueta en Ghost con una descripción excesivamente larga
    Given que navego a la página "http://localhost:2368/ghost/#/signin"
    And espero 5 segundos
    When ingreso el correo "<USERNAME1>"
    And espero 2 segundos
    And ingreso la contraseña "<PASSWORD1>"
    And espero 2 segundos
    And hago clic en iniciar sesión
    And espero 7 segundos
    And navego a la página de creación de tags
    And creo un nuevo tag con el nombre "Tag de Prueba con descripción larga" y descripción excesivamente larga
    And espero 5 segundos
    Then no deberia ser posible crear el tag    
