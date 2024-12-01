import {
    andClickOnSaveBtn,
    andInsertMemberEmail,
    andInsertMemberNote,
    andNavigateToMembersPage,
    saveBtnContainsMessage,
    thenMemberShouldBeVisible,
    whenClickOnNewMemberButton
} from "../membersSteps.cy";

export function andClickOnExistingMember(email){
    cy.get('tr[data-test-list="members-list-item"]').contains(email).click();
}
export function itEditsExistingMemberEmail(modifiedEmail) {
    andClickOnExistingMember(modifiedEmail);
    andInsertMemberEmail(modifiedEmail);
    // cy.get(`a[href="mailto:${modifiedEmail}"]`)
    //     .contains(modifiedEmail)
    //     .should('be.visible')
    andClickOnSaveBtn();
}

export function itCreatesNewMemberWithEmailAndNotes(email, note) {
    whenClickOnNewMemberButton();
    andInsertMemberEmail(email);
    andInsertMemberNote(note);
    andClickOnSaveBtn();
    saveBtnContainsMessage('Saved');
    andNavigateToMembersPage();
    thenMemberShouldBeVisible({email});
}
