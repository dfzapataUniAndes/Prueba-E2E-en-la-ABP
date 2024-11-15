Feature: Registrar un usuario en Ghost

  @user1 @web
  Scenario: EP_09 Como primer usuario inicio sesión y creo un tag en Ghost
    Given navego a la página de creación de tags
    When creo un nuevo tag con el nombre "Tag de Prueba" y descripción "Este es un tag de prueba para Ghost."
    And espero 5 segundos
    Then debería ver el tag titulado "Tag de Prueba" en la lista de tags
    And cierro sesión
