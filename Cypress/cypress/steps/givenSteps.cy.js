export function givenNavigateToTheSite() {
  cy.visit("http://localhost:2368/ghost/#/signin");
  // cy.wait(5000);
}

export function givenUserIsLogin(username, password) {
  cy.get('input[name="identification"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.wait(2000);
}

export function givenNavigateToTheSiteUrl(site) {
  cy.visit(site);
  cy.wait(5000);
}

export function givenNavigateToThePages(scenarioNo, featureToTest) {
  cy.visit("http://localhost:2368/ghost/#/pages");
  cy.wait(5000);
  cy.screenshot( "actual/"+featureToTest+"/" +scenarioNo+ "/" + new Date().toISOString());
}