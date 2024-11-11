Feature: Agregar Members en Ghost
  @user1 @web
  Scenario: Como primer usuario cuando no hay Members me agrego a mi mismo.
    Given que navego a la página "http://localhost:2368/ghost/#/members"
    And no existe ningún Member
    When me agrego a mi mismo como Member
    Then veo mi usuario "<USERNAME1>" en la lista de Members
    And cierro la notificacion

  @user2 @web
  Scenario: Como segundo usuario no puedo crear un nuevo member sin haber completado el campo de Email.
    Given que navego a la página "http://localhost:2368/ghost/#/members"
    When hago clic en new member
    And el formulario de New member es visible
    Then hago clic en Save y aparece el error de "Please enter an email"