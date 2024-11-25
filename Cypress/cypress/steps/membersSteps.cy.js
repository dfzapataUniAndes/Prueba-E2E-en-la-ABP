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
}

export function saveBtnContainsMessage(msg) {
    cy.get('[data-test-button="save"]').contains(msg)
}


export function thenMemberShouldBeVisible(memberEmail) {
    cy.get('[data-test-table="members"]').should('be.visible')
    cy.get('.gh-members-list-name-container').contains(memberEmail)
}

export function itCreatesNewMemberWithEmail (email) {
    whenClickOnNewMemberButton();
    andInsertMemberEmail(email);
    andClickOnSaveBtn();
    saveBtnContainsMessage('Saved');
    andNavigateToMembersPage();
    thenMemberShouldBeVisible(email);
}

export function itCreatesNewMemberWithEmailAndName(email, name) {
    whenClickOnNewMemberButton();
    andInsertMemberEmail(email);
    andInsertMemberName(name);
    andClickOnSaveBtn();
    saveBtnContainsMessage('Saved');
    andNavigateToMembersPage();
    thenMemberShouldBeVisible(email);
}

export function itCreatesNewMemberWithEmailNameAndLabels(email, name, labels) {
    whenClickOnNewMemberButton();
    andInsertMemberEmail(email);
    andInsertMemberName(name);
    andInsertMemberLabels(labels);
    andClickOnSaveBtn();
    saveBtnContainsMessage('Saved');
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
    saveBtnContainsMessage('Saved');
    andNavigateToMembersPage();
    thenMemberShouldBeVisible(email);
}

export function itCreatesNewMemberWithInvalidName(name, errorMessage) {
    whenClickOnNewMemberButton();
    andInsertMemberName(name);
    andClickOnSaveBtn();
    saveBtnContainsMessage('Retry');
    cy.contains(errorMessage).should('be.visible');
}

export function itCreatesNewMemberWithInvalidEmail(email, errorMessage) {
    whenClickOnNewMemberButton();
    andInsertMemberEmail(email);
    andClickOnSaveBtn();
    saveBtnContainsMessage('Retry');
    cy.contains(errorMessage).should('be.visible');
}

export function itCreatesNewMemberWithInvalidLabel(member, errorMessage) {
    whenClickOnNewMemberButton();
    andInsertMemberLabels(member.labels);
    andInsertMemberEmail(member.email);
    andClickOnSaveBtn();
    saveBtnContainsMessage('Retry');
    cy.contains(errorMessage).should('be.visible');
}
export function itCreatesNewMemberWithInvalidNote(member, errorMessage) {
    whenClickOnNewMemberButton();
    andInsertMemberNote(member.note);
    andInsertMemberEmail(member.email);
    andClickOnSaveBtn();
    saveBtnContainsMessage('Retry');
    cy.contains(errorMessage).should('be.visible');
}