
export function givenNavigateToTheSite() {
    cy.visit('http://localhost:2368/ghost/#/signin');
    cy.wait(5000)
}

export function givenUserIsLogin() {
    cy.get('input[name="identification"]').type('davids_8899@hotmail.com');
    cy.wait(2000);
    cy.get('input[name="password"]').type('39443950dE*');
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
}