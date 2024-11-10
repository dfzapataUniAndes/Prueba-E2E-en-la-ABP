export function thenCreateNewPage() {
    cy.get('a[href="#/editor/page/"]').click();
    cy.wait(5000);
}

export function thenInsertTitlePage(title) {
    cy.get('textarea[placeholder="Page title"]').type(title);
    cy.wait(2000);
}

export function thenInsertContentPage(content) {
    cy.get('.kg-prose').first().type(content);
    cy.wait(2000);
}

export function thenClicInPublish() {
    cy.get('button[data-test-button="publish-flow"]').first().click();
    cy.wait(2000);
}

export function thenClicInFinishReview() {
    cy.get('button[data-test-button="continue"]').first().click();
    cy.wait(2000);
}

export function thenClicInPublishPage() {
    cy.get('button[data-test-button="confirm-publish"]').first().click();
    cy.wait(2000);
}

export function thenCloseWindowPagePublished() {
    cy.get('button[data-test-button="close-publish-flow"]').first().click();
    cy.wait(2000);
}

export function thenViewCreatedPage(title) {
    var elementsFound = false;
    cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
        const text = $el.innerText;
        if (text === title) {
            elementsFound = true;
            expect(elementsFound).to.equal(true);
        }
    });
    cy.wait(2000);
}

export function thenCloseSession() {
    cy.visit('http://localhost:2368/ghost/#/signout');
}
