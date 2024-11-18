Feature: Agregar Members en Ghost
#  @user1 @web
#  Scenario: EP_16 Como primer usuario cuando no hay Members me agrego a mi mismo.
#    Given que navego a la página "#/members"
#    And no existe ningún Member
#    When me agrego a mi mismo como Member
#    Then veo el usuario en la lista de Members "scenario16"
#    And espero 2 segundos
#    And elimino el ultimo miembro creado
#    And espero 2 segundos
#
#  @user2 @web
#  Scenario: EP_17 Como segundo usuario no puedo crear un nuevo member sin haber completado el campo de Email.
#    Given que navego a la página "#/members"
#    When hago clic en new member
#    And el formulario de New member es visible
#    And hago clic en el botón de Save
#    Then aparece el error de "Please enter an email"
#
#  @user3 @web
#  Scenario: EP_18 Como tercer usuario puedo completar todos los campos de la sección ENGAGEMENT del formulario de nuevo miembro y crear un nuevo miembro.
#    Given que navego a la página "#/members"
#    And hago clic en new member
#    And el formulario de New member es visible
#    And completo los campos de la sección New member cómo Name, Email, Labels, Note
#    When hago clic en el botón de Save
#    And que navego a la página "#/members"
#    And espero 2 segundos
#    Then veo el usuario en la lista de Members "scenario18"
#    And espero 2 segundos
#    And elimino el ultimo miembro creado

  @user4 @web
  Scenario: EP_19 Como cuarto usuario al crear un nuevo miembro con un email que ya existe aparece un error indicando que el usuario ya existe.
    Given que navego a la página "#/members"
    And hago clic en new member
    And el formulario de New member es visible
    And completo los campos de la sección New member cómo Name, Email, Labels, Note
    And hago clic en el botón de Save
    And que navego a la página "#/members"
    When hago clic en new member
    And el formulario de New member es visible
    And completo los campos de la sección New member cómo Name, Email, Labels, Note
    And hago clic en el botón de Save
    Then veo el mensaje de error indicando que el mismo Member ya se encuentra creado
    And espero 2 segundos
    And elimino el último miembro creado

#  @user5 @web
#  Scenario: EP_20 Como quinto usuario puedo crear 5 usuarios y ver el numero total de usuarios creados en la opción de Member en el sidebar
#    Given que navego a la página "http://localhost:2368/ghost/#/members"
#    And hago clic en new member
#    And el formulario de New member es visible
#    And completo los campos de la sección New member cómo Name, Email, Labels, Note
#    When desactivo el checkbox de Newsletter
#    Then hago clic en el botón de Save
#    Then que navego a la página "http://localhost:2368/ghost/#/members"


#    Then veo el nuevo usuario creado en la lista de members
