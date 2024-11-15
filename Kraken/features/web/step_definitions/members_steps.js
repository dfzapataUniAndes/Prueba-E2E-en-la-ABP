const { When, Then, AfterStep } = require("@cucumber/cucumber");
const {faker} = require("@faker-js/faker");
const expect = require('chai').expect;
const { vrt } = require('../../../config.json')

When("no existe ningún Member", async function () {
    const memberListSelector = vrt ? 'ol[class="members-list gh-list"]' : 'div.gh-list-with-helpsection'
    const membersTable = await this.driver.$(memberListSelector)
    const membersTableExist = await membersTable.isExisting()
    if (membersTableExist) {
        throw new Error(
            'Ya existen miembros creados'
        )
    }
});

When("me agrego a mi mismo como Member", async function () {
    let selector = vrt ? '[class="gh-btn gh-btn-green"]' : '[data-test-button="add-yourself"]';
    const addYourselfButton = await this.driver.$(selector);
    await addYourselfButton.waitForExist();
    await addYourselfButton.click();
})

Then("veo mi usuario {kraken-string} en la lista de Members", async function (user) {
    if (vrt) {
        const memberItem =  await this.driver.$('[class="ma0 pa0 middarkgrey f8 gh-members-list-email"]');
        const memberText = await memberItem.getText();
        expect(memberText).to.have.string(user);
        const screenshot = await this.driver.saveScreenshot(
            `./newreports/members/screenshots/new-member-self-${vrt ? 'base' : 'rc'}.png`
        );
        this.attach(screenshot, 'image/png');
        return;
    }

    const membersTable = await this.driver.$('[data-test-table="members"]');
    const memberItem = await membersTable.$('p.gh-members-list-email');
    const memberText = await memberItem.getText();
    expect(memberText).to.have.string(user);
    const screenshot = await this.driver.saveScreenshot(
        `./newreports/members/screenshots/new-member-self-${vrt ? 'base' : 'rc'}.png`
    );
    await this.attach(screenshot, 'image/png');
})

When("hago clic en new member", async function(){
    const newMemberBtn = await this.driver.$('[data-test-new-member-button="true"]')
    await newMemberBtn.waitForEnabled()
    await newMemberBtn.click()
})

Then("el formulario de New member es visible", async function() {
    const memberForm = await this.driver.$('form.member-basic-info-form')
    await expect(await memberForm.isDisplayed()).to.be.true
})

Then("hago clic en el botón de Save", async function(){
    const saveBtn = await this.driver.$('[data-test-button="save"]')
    await saveBtn.waitForEnabled()
    await saveBtn.click()
    await this.driver.pause(1000);
})

Then("aparece el error de {kraken-string}", async function (errorMsg){
    const formGroup = await this.driver.$('.form-group.max-width.error');
    const errorMessageElement = await formGroup.$('p.response');
    const errorMessage = await errorMessageElement.getText();
    await expect(errorMessage).to.have.string(errorMsg);
})

Then("completo los campos de la sección New member cómo Name, Email, Labels, Note", async function (){
    try {
        const fakeMemberName = faker.person.fullName();
        const fakeEmail = faker.internet.email();
        const fakeNote = faker.lorem.sentence(10);

        const nameField = await this.driver.$('input#member-name');
        await nameField.waitForExist({ timeout: 5000 });
        await nameField.setValue(fakeMemberName);

        const emailField = await this.driver.$('input#member-email');
        await emailField.waitForExist({ timeout: 5000 });
        await emailField.setValue(fakeEmail);

        const noteField = await this.driver.$('textarea#member-note');
        await noteField.waitForExist({ timeout: 5000 });
        await noteField.setValue(fakeNote);

    } catch (e) {
        return e
    }
})

// AfterStep(async function (world) {
//     try {
//         console.log(this)
//         let screenshot = await this.driver.saveScreenshot(
//             `./reports/${this.testScenarioId}/screenshots/${Math.round(+new Date() / 1000)}.png`
//         );
//         this.attach(screenshot, 'image/png');
//     } catch {
//         console.log("KRAKEN: Could not take screenshot");
//     }
// })

// Then("desactivo el checkbox de Newsletter", async function () {
    // const checkbox = await browser.$('input[type="checkbox"][name="subscribed"]');
    // // Wait for the checkbox to be present in the DOM
    // await checkbox.waitForExist({ timeout: 5000 });
    // // Check if the checkbox is already enabled (checked)
    // const isChecked = await checkbox.isSelected();
    // if (!isChecked) { // Click the checkbox to enable it
    //     await checkbox.click();
    //     console.log('Checkbox enabled successfully');
    // } else {
    //  console.log('Checkbox is already enabled');
    // }
// })

// Then("veo el nuevo usuario creado en la lista de members", await function () {
//
// })