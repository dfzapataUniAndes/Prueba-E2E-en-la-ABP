export function whenNavigateToThePages() {
  cy.visit("http://localhost:2368/ghost/#/pages");
  cy.wait(5000);
  cy.screenshot("navegacion_a_paginas");
}

export function whenNavigateToThePosts() {
  cy.visit("http://localhost:2368/ghost/#/posts");
  cy.wait(5000);
  cy.screenshot("navegacion_a_posts");
}

export function whenNavigateToTheTags() {
  cy.visit("http://localhost:2368/ghost/#/tags");
  cy.wait(5000);
  cy.screenshot("navegacion_a_tags");
}
