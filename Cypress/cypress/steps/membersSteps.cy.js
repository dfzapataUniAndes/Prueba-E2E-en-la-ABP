export function andNavigateToMembersPage() {
    cy.visit("http://localhost:2368/ghost/#/members");
    cy.location('href').should('eq', 'http://localhost:2368/ghost/#/members')
}
export function whenClickOnNewMemberButton() {
    cy.get('[data-test-new-member-button="true"]').click()
    cy.get('.member-basic-info-form').contains('New member').should('be.visible')
}

export function andInsertMemberEmail(memberEmail) {
    cy.get('input#member-email').type(memberEmail)
}

export function andInsertMemberName(memberName) {
    cy.get('input#member-name').type(memberName);
}

export function andInsertMemberLabels(labels) {
    if (typeof labels === 'string') {
        labels.split(' ').forEach(label => {
            cy.get('input.ember-power-select-trigger-multiple-input').type(`${label}{enter}`);
        });
        cy.get('.gh-member-details-identity').click();
        return;
    }
    labels.forEach(label => {
        cy.get('input.ember-power-select-trigger-multiple-input').type(`${label}{enter}`);
    });
    cy.get('.gh-member-details-identity').click()
}

export function andInsertMemberNote(note) {
    cy.get('textarea#member-note').type(note);
}

export function andClickOnSaveBtn() {
    cy.get('[data-test-button="save"]').click()
    cy.get('[data-test-button="save"]').contains('Saved')
}


export function thenMemberShouldBeVisible(memberEmail) {
    cy.get('[data-test-table="members"]').should('be.visible')
    cy.get('.gh-members-list-name-container').contains(memberEmail)
}

export function itCreatesNewMemberWithEmail (email) {
    whenClickOnNewMemberButton();
    andInsertMemberEmail(email);
    andClickOnSaveBtn();
    andNavigateToMembersPage();
    thenMemberShouldBeVisible(email);
}

export function itCreatesNewMemberWithEmailAndName(email, name) {
    whenClickOnNewMemberButton();
    andInsertMemberEmail(email);
    andInsertMemberName(name);
    andClickOnSaveBtn();
    andNavigateToMembersPage();
    thenMemberShouldBeVisible(email);
}

export function itCreatesNewMemberWithEmailNameAndLabels(email, name, labels) {
    whenClickOnNewMemberButton();
    andInsertMemberEmail(email);
    andInsertMemberName(name);
    andInsertMemberLabels(labels);
    andClickOnSaveBtn();
    andNavigateToMembersPage();
    thenMemberShouldBeVisible(email);
}

export function itCreatesNewMemberWithEmailNameLabelsAndNote(email, name, labels, note) {
    whenClickOnNewMemberButton();
    andInsertMemberEmail(email);
    andInsertMemberName(name);
    andInsertMemberLabels(labels);
    andInsertMemberNote(note);
    andClickOnSaveBtn();
    andNavigateToMembersPage();
    thenMemberShouldBeVisible(email);
}

export function itCreatesNewMemberWithInvalidName(name, errorMessage) {
    whenClickOnNewMemberButton();
    andInsertMemberName(name);
    andClickOnSaveBtn();
    cy.contains(errorMessage).should('be.visible');
}

export function itCreatesNewMemberWithInvalidEmail(email, errorMessage) {
    whenClickOnNewMemberButton();
    andInsertMemberEmail(email);
    andClickOnSaveBtn();
    cy.contains(errorMessage).should('be.visible');
}

export function itCreatesNewMemberWithInvalidLabel(label, errorMessage) {
    whenClickOnNewMemberButton();
    andInsertMemberLabels([label]);
    andClickOnSaveBtn();
    cy.contains(errorMessage).should('be.visible');
}

export function itCreatesNewMemberWithInvalidNote(note, errorMessage) {
    whenClickOnNewMemberButton();
    andInsertMemberNote(note);
    andClickOnSaveBtn();
    cy.contains(errorMessage).should('be.visible');
}