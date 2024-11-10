Feature: Crear un tag en Ghost 
#
#  @user1 @web @tag1
#  Scenario: Como primer usuario inicio sesión y creo un tag en Ghost
#    Given que inicio sesion
#    And espero 7 segundos
#    And navego a la página de creación de tags
#    When creo un nuevo tag con el nombre "Tag de Prueba" y descripción "Este es un tag de prueba para Ghost."
#    And espero 5 segundos
#    Then debería ver el tag titulado "Tag de Prueba" en la lista de tags
#    And cierro sesión en Ghost
#
#
#  @user2 @web @tag2
#  Scenario: Como segundo usuario inicio sesión y creo un tag en Ghost sin descripción
#    Given que inicio sesion
#    And espero 7 segundos
#    And navego a la página de creación de tags
#    When creo un nuevo tag con el nombre "Tag de Prueba con descripcion vacia" y descripción vacia
#    And espero 5 segundos
#    Then debería ver el tag titulado "Tag de Prueba con descripcion vacia" en la lista de tags
#    And cierro sesión en Ghost
#
#
#@user3 @web @tag3
#  Scenario: Como tercer usuario inicio sesión y creo un tag en Ghost sin nombre
#    Given que inicio sesion
#    And espero 7 segundos
#    And navego a la página de creación de tags
#    When creo un nuevo tag con el nombre vacio y descripción "Este es un tag de prueba para Ghost."
#    And espero 5 segundos
#    Then no deberia ser posible crear el tag
#    And cierro sesión en Ghost
#
#
#@user4 @web @tag4
#  Scenario: Como cuarto usuario, inicio sesión y creo un tag en Ghost con una descripción excesivamente larga
#    Given que inicio sesion
#    And espero 7 segundos
#    And navego a la página de creación de tags
#    When creo un nuevo tag con el nombre "Tag de Prueba con descripción larga" y descripción excesivamente larga
#    And espero 5 segundos
#    Then no deberia ser posible crear el tag
#    And cierro sesión en Ghost

#
#@user5 @web @tag5
#Scenario: Como cuarto usuario, inicio sesión y creo un tag en Ghost con caracteres especiales
#  Given que inicio sesion
#  And espero 7 segundos
#  When navego a la página de creación de tags
#  And creo un nuevo tag con el nombre "Tag Caracteres Especiales" y descripción "Descripción con caracteres especiales: !@#$%^&*()_+[]{}|;:,.<>?"
#  And espero 5 segundos
#  Then debería ver el tag titulado "Tag Caracteres Especiales" en la lista de tags
#  And cierro sesión en Ghost
#
