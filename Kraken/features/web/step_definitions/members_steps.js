const { When, Then } = require("@cucumber/cucumber");
const expect = require('chai').expect;

When("no existe ningún Member", async function () {
    const membersTable = await this.driver.$('div.gh-list-with-helpsection')
    const membersTableExist = await membersTable.isDisplayed()

    if (membersTableExist) {
        throw new Error(
            'Ya existen miembros creados'
        )
    }
});

When("me agrego a mi mismo como Member", async function () {
    const addYourselfButton = await this.driver.$('[data-test-button="add-yourself"]')
    await addYourselfButton.waitForEnabled()
    await addYourselfButton.click()
})

Then("veo mi usuario {kraken-string} en la lista de Members", async function (user) {
    const membersTable = await this.driver.$('[data-test-table="members"]')
    const memberItem = await membersTable.$('p.gh-members-list-email')
    const memberText = await memberItem.getText()
    await expect(memberText).to.have.string(user);
})

Then("cierro la notificacion", async function () {
    const closeNotification = await this.driver.$('[data-test-button="close-notification"]')
    await closeNotification.waitForEnabled()
    await closeNotification.click()
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

Then("hago clic en Save y aparece el error de {kraken-string}", async function(errorMsg){
    const saveBtn = await this.driver.$('[data-test-button="save"]')
    await saveBtn.waitForEnabled()
    await saveBtn.click()
    await this.driver.pause(1000);

    const formGroup = await this.driver.$('.form-group.max-width.error');
    const errorMessageElement = await formGroup.$('p.response');
    const errorMessage = await errorMessageElement.getText();
    await expect(errorMessage).to.have.string(errorMsg);
})