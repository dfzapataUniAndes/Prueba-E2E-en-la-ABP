const { Given, When, Then } = require("@cucumber/cucumber");
const expect = require('chai').expect;

Given("que inicio sesion como administrador", async function () {
    await this.driver.url("http://localhost:2368/ghost/#/signin");
});

When("navego a la página de crear páginas", async function () {
    await this.driver.url("http://localhost:2368/ghost/#/pages");
});

When("hago clic en crear nueva página", async function () {
    const newPageButton = await this.driver.$('a[href="#/editor/page/"]');
    await newPageButton.click();
});

Then("ingreso el título de la página {string}", async function (titulo) {
    const titleTextArea = await this.driver.$('textarea[placeholder="Page title"]');
    await titleTextArea.setValue(titulo);
});

Then("ingreso el contenido de la página {string}", async function (contenido) {
    const contentTextArea = await this.driver.$(".kg-prose");
    await contentTextArea.setValue(contenido);
});

Then("hago clic en Publish", async function () {
    const publishButton = await this.driver.$('button[data-test-button="publish-flow"]');
    await publishButton.click();
});

Then("hago clic en finalizar revisión", async function () {
    const continueButton = await this.driver.$('button[data-test-button="continue"]');
    await continueButton.click();
});

Then("hago clic en Publish page", async function () {
    const publishPageButton = await this.driver.$('button[data-test-button="confirm-publish"]');
    await publishPageButton.click();
});

Then("cierro la ventana de página publicada", async function () {
    const closeButton = await this.driver.$('button[data-test-button="close-publish-flow"]');
    await closeButton.click();
});

Then("veo en el listado de páginas la página con el titulo {string}", async function (titulo) {
    let elements = await this.driver.$$("h3[class='gh-content-entry-title']");
    let elementsFound = false;
    elements.forEach(async function (element) {
        let text = await element.getText();
        if (text === titulo) {
            elementsFound = true;
            expect(elementsFound).to.equal(true);
        }
    });     
});

Then("selecciono una imagen de portada", async function () {
    const addFeatureImageButton = await this.driver.$('button[class="gh-editor-feature-image-unsplash"]');
    await addFeatureImageButton.click();
    await this.driver.pause(2000); // Espera a que se carguen las imágenes
    const insertImageButton = await this.driver.$('a[class="gh-unsplash-button"]');
    await insertImageButton.click();
});

Then("abro en el listado de páginas la página con el titulo {string}", async function (titulo) {
    let elements = await this.driver.$$("h3[class='gh-content-entry-title']");
    elements.forEach(async function (element) {
        let text = await element.getText();
        if (text === titulo) {
            await element.parentElement().click();
        }
    });     
});

When("cierro sesión", async function () {
    await this.driver.url("http://localhost:2368/ghost/#/signout");
});

Then("valido que la página tenga una imagen", async function () {
    let elements = await this.driver.$$("img[role='presentation']");
    let elementsFound = elements.length > 0;
    expect(elementsFound).to.equal(true);   
});

Then("veo en el listado de páginas la página con el titulo {string} y la etiqueta draft", async function (titulo) {
    let elements = await this.driver.$$("h3[class='gh-content-entry-title']");
    let elementsFound = null;
    elements.forEach(async function (element) {
        let text = await element.getText();
        if (text === titulo) {
            elementsFound = await element.parentElement().$('p span.draft');
            expect(elementsFound).to.not.equal(null);
        }
    });     
});

Then("hago clic en Preview", async function () {
    const previewButton = await this.driver.$('button[data-test-button="publish-preview"]');
    await previewButton.click();
});

Then("hago clic en Editor", async function () {
    const editorButton = await this.driver.$('button[class="gh-btn-editor gh-editor-back-button"]');
    await editorButton.click();
});

Then("hago clic en Update", async function () {
    const updateButton = await this.driver.$('button[data-test-button="publish-save"]');
    await updateButton.click();
});
