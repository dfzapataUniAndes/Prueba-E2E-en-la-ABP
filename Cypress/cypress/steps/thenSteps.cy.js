export function thenCreateNewPage() {
    cy.get('a[href="#/editor/page/"]').first().click();
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
    cy.wait(5000);
}

export function thenCloseWindowPagePublished() {
    cy.get('button[data-test-button="close-publish-flow"]').first().click();
    cy.wait(5000);
}

export function thenViewCreatedPage(title) {
    cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
        const text = $el.text();
        if(text.indexOf(title) > -1) {
            expect(text).to.contain(title);
        }
    });
    cy.wait(2000);
}

export function thenCloseSession() {
    cy.visit('http://localhost:2368/ghost/#/signout');
}

export function thenSelecteCoverImage() {
    cy.get('button[class="gh-editor-feature-image-unsplash"]').first().click();
    cy.wait(3000); // Espera a que se carguen las imágenes
    cy.get('a[class="gh-unsplash-button"]').first().click();
    cy.wait(3000);
}

export function thenViewCreatedPageWithImage(title) {
    cy.get("h3[class='gh-content-entry-title']").each(($el, index, $list) => {
        const text = $el.text();
        if(text.indexOf(title) > -1) {
            $el.click();
        }
    });
    cy.wait(2000);
}

export function thenValidatePageWithImage() {
    cy.get("img[role='presentation']").should('have.length.above', 0);
    cy.wait(2000);
}