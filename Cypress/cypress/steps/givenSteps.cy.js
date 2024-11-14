export function givenNavigateToTheSite() {
  cy.visit("http://localhost:2368/ghost/#/signin");
  cy.wait(5000);
  cy.screenshot("pagina_inicio_sesion");
}

export function givenUserIsLogin(username, password) {
  cy.get('input[name="identification"]').type(username);
  cy.wait(2000);
  cy.get('input[name="password"]').type(password);
  cy.wait(2000);
  cy.get('button[type="submit"]').click();
  cy.wait(5000);
  cy.screenshot("inicio_sesion");
}
