const { Given, When, Then } = require("@cucumber/cucumber");
const expect = require('chai').expect;

Given("que inicio sesion como administrador", async function () {
    await this.driver.url("http://localhost:2368/ghost/#/signin");
});

When("navego a la página de crear páginas", async function () {
    await this.driver.url("http://localhost:2368/ghost/#/pages");
    await this.driver.pause(5000);
});

When("creo una nueva página con titulo {string} y contenido {string}", async function (titulo, contenido) {
    // hago clic en crear nueva página
    const newPageButton = await this.driver.$('a[href="#/editor/page/"]');
    await newPageButton.click();
    await this.driver.pause(5000);

    // ingreso el título de la página
    const titleTextArea = await this.driver.$('textarea[placeholder="Page title"]');
    await titleTextArea.setValue(titulo);
    await this.driver.pause(2000);

    // ingreso el contenido de la página
    const contentTextArea = await this.driver.$(".kg-prose");
    await contentTextArea.setValue(contenido);
    await this.driver.pause(2000);

    // hago clic en Publish
    const publishButton = await this.driver.$('button[data-test-button="publish-flow"]');
    await publishButton.click();
    await this.driver.pause(2000);

    // hago clic en finalizar revisión
    const continueButton = await this.driver.$('button[data-test-button="continue"]');
    await continueButton.click();
    await this.driver.pause(2000);

    // hago clic en Publish page
    const publishPageButton = await this.driver.$('button[data-test-button="confirm-publish"]');
    await publishPageButton.click();
    await this.driver.pause(2000);

    // cierro la ventana de página publicada
    const closeButton = await this.driver.$('button[data-test-button="close-publish-flow"]');
    await closeButton.click();
    await this.driver.pause(2000);
});

When("creo una nueva página con una imagen de portada, titulo {string} y contenido {string}", async function (titulo, contenido) {
    // hago clic en crear nueva página
    const newPageButton = await this.driver.$('a[href="#/editor/page/"]');
    await newPageButton.click();
    await this.driver.pause(5000);

    // selecciono una imagen de portada
    const addFeatureImageButton = await this.driver.$('button[class="gh-editor-feature-image-unsplash"]');
    await addFeatureImageButton.click();
    await this.driver.pause(2000); // Espera a que se carguen las imágenes
    const insertImageButton = await this.driver.$('a[class="gh-unsplash-button"]');
    await insertImageButton.click();
    await this.driver.pause(2000)

    // ingreso el título de la página
    const titleTextArea = await this.driver.$('textarea[placeholder="Page title"]');
    await titleTextArea.setValue(titulo);
    await this.driver.pause(2000);

    // ingreso el contenido de la página
    const contentTextArea = await this.driver.$(".kg-prose");
    await contentTextArea.setValue(contenido);
    await this.driver.pause(2000);

    // hago clic en Publish
    const publishButton = await this.driver.$('button[data-test-button="publish-flow"]');
    await publishButton.click();
    await this.driver.pause(2000);

    // hago clic en finalizar revisión
    const continueButton = await this.driver.$('button[data-test-button="continue"]');
    await continueButton.click();
    await this.driver.pause(2000);

    // hago clic en Publish page
    const publishPageButton = await this.driver.$('button[data-test-button="confirm-publish"]');
    await publishPageButton.click();
    await this.driver.pause(2000);

    // cierro la ventana de página publicada
    const closeButton = await this.driver.$('button[data-test-button="close-publish-flow"]');
    await closeButton.click();
    await this.driver.pause(2000);
});

When("creo una página como draft con titulo {string} y contenido {string}", async function (titulo, contenido) {
    // hago clic en crear nueva página
    const newPageButton = await this.driver.$('a[href="#/editor/page/"]');
    await newPageButton.click();
    await this.driver.pause(5000);

    // ingreso el título de la página
    const titleTextArea = await this.driver.$('textarea[placeholder="Page title"]');
    await titleTextArea.setValue(titulo);
    await this.driver.pause(2000);

    // ingreso el contenido de la página
    const contentTextArea = await this.driver.$(".kg-prose");
    await contentTextArea.setValue(contenido);
    await this.driver.pause(2000);

    // navego a la página de crear páginas
    await this.driver.url("http://localhost:2368/ghost/#/pages");
    await this.driver.pause(2000);
});

When("hago preview de una nueva página con titulo {string}", async function (titulo) {
    // hago clic en crear nueva página
    const newPageButton = await this.driver.$('a[href="#/editor/page/"]');
    await newPageButton.click();
    await this.driver.pause(5000);

    // selecciono una imagen de portada
    const addFeatureImageButton = await this.driver.$('button[class="gh-editor-feature-image-unsplash"]');
    await addFeatureImageButton.click();
    await this.driver.pause(2000); // Espera a que se carguen las imágenes
    const insertImageButton = await this.driver.$('a[class="gh-unsplash-button"]');
    await insertImageButton.click();
    await this.driver.pause(2000)

    // ingreso el título de la página
    const titleTextArea = await this.driver.$('textarea[placeholder="Page title"]');
    await titleTextArea.setValue(titulo);
    await this.driver.pause(5000);

    // hago clic en preview
    const previewButton = await this.driver.$('button[data-test-button="publish-preview"]');
    await previewButton.click();
    await this.driver.pause(3000);

    // hago clic en Editor
    const editorButton = await this.driver.$('button[class="gh-btn-editor gh-editor-back-button"]');
    await editorButton.click();
    await this.driver.pause(3000);

    // navego a la página de crear páginas
    await this.driver.url("http://localhost:2368/ghost/#/pages");
    await this.driver.pause(5000);
});

When("creo una página con título {string} contenido {string} y la edito con titulo {string}", async function (titulo, contenido, tituloEditado) {
    // hago clic en crear nueva página
    const newPageButton = await this.driver.$('a[href="#/editor/page/"]');
    await newPageButton.click();
    await this.driver.pause(3000);

    // ingreso el título de la página
    const titleTextArea = await this.driver.$('textarea[placeholder="Page title"]');
    await titleTextArea.setValue(titulo);
    await this.driver.pause(2000);

    // ingreso el contenido de la página
    const contentTextArea = await this.driver.$(".kg-prose");
    await contentTextArea.setValue(contenido);
    await this.driver.pause(2000);

    // hago clic en Publish
    const publishButton = await this.driver.$('button[data-test-button="publish-flow"]');
    await publishButton.click();
    await this.driver.pause(2000);

    // hago clic en finalizar revisión
    const continueButton = await this.driver.$('button[data-test-button="continue"]');
    await continueButton.click();
    await this.driver.pause(2000);

    // hago clic en Publish page
    const publishPageButton = await this.driver.$('button[data-test-button="confirm-publish"]');
    await publishPageButton.click();
    await this.driver.pause(2000);

    // cierro la ventana de página publicada
    const closeButton = await this.driver.$('button[data-test-button="close-publish-flow"]');
    await closeButton.click();
    await this.driver.pause(2000);

    // abro en el listado de páginas la página con el titulo
    let elements = await this.driver.$$("h3[class='gh-content-entry-title']");
    elements.forEach(async function (element) {
        let text = await element.getText();
        if (text === titulo) {
            await element.parentElement().click();
        }
    });  

    // ingreso el título editado de la página
    const titleEditTextArea = await this.driver.$('textarea[placeholder="Page title"]');
    await this.driver.pause(2000);
    await titleEditTextArea.setValue("");
    await this.driver.pause(2000);
    await titleEditTextArea.setValue(tituloEditado);
    await this.driver.pause(2000);

    // hago clic en Update
    const updateButton = await this.driver.$('button[data-test-button="publish-save"]');
    await updateButton.waitForEnabled();
    await updateButton.click();
    await this.driver.pause(2000);

    // navego a la página de crear páginas
    await this.driver.url("http://localhost:2368/ghost/#/pages");
    await this.driver.pause(2000);
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
    await this.driver.pause(2000);   
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

Then("valido que la página con el titulo {string} tenga una imagen", async function (titulo) {
    let elements = await this.driver.$$("h3[class='gh-content-entry-title']");
    elements.forEach(async function (element) {
        let text = await element.getText();
        if (text === titulo) {
            await element.parentElement().click();
        }
    }); 
    await this.driver.pause(2000);
    elements = await this.driver.$$("img[role='presentation']");
    let elementsFound = elements.length > 0;
    expect(elementsFound).to.equal(true);   
    await this.driver.pause(2000);
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
