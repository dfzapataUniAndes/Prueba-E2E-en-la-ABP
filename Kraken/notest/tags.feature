Feature: Crear un tag en Ghost 

  @user1 @web
  Scenario: EP_09 Como primer usuario inicio sesión y creo un tag en Ghost
    Given navego a la página de creación de tags
    When creo un nuevo tag con el nombre "Tag de Prueba" y descripción "Este es un tag de prueba para Ghost."
    And espero 5 segundos
    Then debería ver el tag titulado "Tag de Prueba" en la lista de tags

  @user2 @web
  Scenario: EP_10 Como segundo usuario inicio sesión y creo un tag en Ghost sin descripción
    Given navego a la página de creación de tags
    When creo un nuevo tag con el nombre "Tag de Prueba con descripcion vacia" y descripción vacia
    And espero 5 segundos
    Then debería ver el tag titulado "Tag de Prueba con descripcion vacia" en la lista de tags

@user3 @web
  Scenario: EP_11 Como tercer usuario inicio sesión y creo un tag en Ghost sin nombre
    Given navego a la página de creación de tags
    When creo un nuevo tag con el nombre vacio y descripción "Este es un tag de prueba para Ghost."
    And espero 5 segundos
    Then no deberia ser posible crear el tag

@user4 @web
  Scenario: EP_12 Como cuarto usuario, inicio sesión y creo un tag en Ghost con una descripción excesivamente larga
    Given navego a la página de creación de tags
    When creo un nuevo tag con el nombre "Tag de Prueba con descripción larga" y descripción excesivamente larga
    And espero 5 segundos
    Then no deberia ser posible crear el tag

@user5 @web
Scenario: Como cuarto usuario, inicio sesión y creo un tag en Ghost con caracteres especiales
  Given navego a la página de creación de tags
  When creo un nuevo tag con el nombre "Tag Caracteres Especiales" y descripción "Descripción con caracteres especiales: !@#$%^&*()_+[]{}|;:,.<>?"
  And espero 5 segundos
  Then debería ver el tag titulado "Tag Caracteres Especiales" en la lista de tags
