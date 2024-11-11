Feature: Agregar Members en Ghost
#  @user1 @web
#  Scenario: Como primer usuario cuando no hay Members me agrego a mi mismo.
#    Given que navego a la página "http://localhost:2368/ghost/#/members"
#    And no existe ningún Member
#    When me agrego a mi mismo como Member
#    Then veo mi usuario "<USERNAME1>" en la lista de Members
#    And cierro la notificacion
#
#  @user2 @web
#  Scenario: Como segundo usuario no puedo crear un nuevo member sin haber completado el campo de Email.
#    Given que navego a la página "http://localhost:2368/ghost/#/members"
#    When hago clic en new member
#    And el formulario de New member es visible
#    Then hago clic en el botón de Save
#    And aparece el error de "Please enter an email"
#
#  @user3 @web
#  Scenario: Como tercer usuario puedo completar todos los campos de la sección ENGAGEMENT del formulario de nuevo miembro.
#    Given que navego a la página "http://localhost:2368/ghost/#/members"
#    When hago clic en new member
#    And el formulario de New member es visible
#    Then completo los campos de la sección New member cómo Name, Email, Labels, Note
#    And hago clic en el botón de Save
#    Then que navego a la página "http://localhost:2368/ghost/#/members"

  @user4 @web
  Scenario: Como cuarto usuario puedo crear un usuario desactivando la opción de Newsletter
    Given que navego a la página "http://localhost:2368/ghost/#/members"
    And hago clic en new member
    And el formulario de New member es visible
    And completo los campos de la sección New member cómo Name, Email, Labels, Note
    When desactivo el checkbox de Newsletter
    Then hago clic en el botón de Save
    Then que navego a la página "http://localhost:2368/ghost/#/members"



#    Then veo el nuevo usuario creado en la lista de members
