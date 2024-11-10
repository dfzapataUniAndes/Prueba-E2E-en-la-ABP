const { Given, When, Then } = require("@cucumber/cucumber");
const expect = require('chai').expect;

Given("que inicio sesion como administrador", async function () {
    await this.driver.url("http://localhost:2368/ghost/#/signin");
});

When("navego a la página de crear páginas", async function () {
    await this.driver.url("http://localhost:2368/ghost/#/pages");
});

Then("hago clic en crear nueva página", async function () {
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

Then("cierro sesión", async function () {
    const userMenuButton = await this.driver.$(".gh-user-avatar");
    await userMenuButton.click();
});