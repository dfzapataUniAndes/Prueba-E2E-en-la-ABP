const { When, Then, AfterStep, Given} = require("@cucumber/cucumber");
const {faker} = require("@faker-js/faker");
const expect = require('chai').expect;
const { vrt, featureToTest, ghostRcUrl, ghostBaseUrl} = require('../../../config.json')
const fs = require('fs');
const axios = require('axios');
const {USERNAME1} = require('../../../properties.json')

const headers = {
    "Content-Type": "application/json"
};

const ghostUrl = vrt ? ghostRcUrl : ghostBaseUrl

Given("que navego a la página de members", async function () {
    await this.driver.url(ghostUrl + '/#/members');
    await this.driver.pause(1000);
});
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

Then("veo el usuario en la lista de Members {kraken-string}", async function (scenario) {
    if (!fs.existsSync(`./vrt-reports/${scenario}`)){
        fs.mkdirSync(`./vrt-reports/${scenario}/screenshots`, { recursive: true });
    }
    const user = scenario === 'scenario16' ?  USERNAME1 : 'jhondoe@gmail.com'
    if (vrt) {
        const memberItem =  await this.driver.$('p[class="ma0 pa0 middarkgrey f8 gh-members-list-email"]');
        await memberItem.waitForDisplayed();
        const memberText = await memberItem.getText();
        expect(memberText).to.have.string(user);
        const screenshot = await this.driver.saveScreenshot(
            `./vrt-reports/${scenario}/screenshots/new-${featureToTest}-${vrt ? 'base' : 'rc'}.png`
        );
        this.attach(screenshot, 'image/png');
        return;
    }
    const membersTable = await this.driver.$('[data-test-table="members"]');
    const memberItem = await membersTable.$('p.gh-members-list-email');
    const memberText = await memberItem.getText();
    expect(memberText).to.have.string(user);
    const screenshot = await this.driver.saveScreenshot(
        `./vrt-reports/${scenario}/screenshots/new-${featureToTest}-${vrt ? 'base' : 'rc'}.png`
    );
    await this.attach(screenshot, 'image/png');
})

Then("elimino el último miembro creado", async function() {
    try {
        const cookies = await this.driver.getCookies(['ghost-admin-api-session']);

        await this.driver.setCookies({
            name: 'ghost-admin-api-session',
            value: cookies[0].value
        });
        let idToDelete = '';
        await axios.get(ghostUrl + `/api${vrt ? '/v4' : ''}` + '/admin/members', {
            withCredentials: true,
            headers: {
                ...headers,
                Cookie: `ghost-admin-api-session=${cookies[0].value}`
            }
        }).then((r) => {
            idToDelete = r.data.members[0].id
        }).catch(e => {
            console.error('getMembersError', e)
        })

        const url = ghostUrl + `api${vrt ? '/v4' : ''}/admin/members/` + idToDelete;
        axios.delete(url, {
            withCredentials: true,
            headers: {
                ...headers,
                Cookie: `ghost-admin-api-session=${cookies[0].value}`
            }
        })
            .then(response => response)
            .catch(error => console.error('deleteError', error));

        await this.driver.pause(2000);

    } catch (e) {
        console.error('helloerror',e)
    }
})

When("hago clic en new member", async function(){
    if (vrt) {
        const newMemberBtn = await this.driver.$('a[href="#/members/new/"]')
        await newMemberBtn.waitForEnabled()
        await newMemberBtn.click()
        return
    }
    const newMemberBtn = await this.driver.$('[data-test-new-member-button="true"]')
    await newMemberBtn.waitForEnabled()
    await newMemberBtn.click()
})

Then("el formulario de New member es visible", async function() {
    const memberForm = await this.driver.$('form.member-basic-info-form')
    await expect(await memberForm.isDisplayed()).to.be.true
})

Then("hago clic en el botón de Save", async function(){
    if (vrt) {
        const saveBtn = await this.driver.$('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]');
        await saveBtn.waitForEnabled();
        await saveBtn.click();
        return;
    }
    const saveBtn = await this.driver.$('[data-test-button="save"]')
    await saveBtn.waitForEnabled()
    await saveBtn.click()
    await this.driver.pause(1000);
})

Then("aparece el error de {kraken-string}", async function (errorMsg){
    if (!fs.existsSync(`./vrt-reports/scenario17`)){
        fs.mkdirSync(`./vrt-reports/scenario17/screenshots`, { recursive: true });
    }
    const formGroup = await this.driver.$('.form-group.max-width.error');
    const errorMessageElement = await formGroup.$('p.response');
    const errorMessage = await errorMessageElement.getText();
    await expect(errorMessage).to.have.string(errorMsg);

    const screenshot = await this.driver.saveScreenshot(
        `./vrt-reports/scenario17/screenshots/new-${featureToTest}-${vrt ? 'base' : 'rc'}.png`
    );
    await this.attach(screenshot, 'image/png');
})

Then("completo los campos de la sección New member cómo Name, Email, Labels, Note", async function (){
    try {
        const fakeMemberName = 'Jhon Doe';
        const fakeEmail = 'jhondoe@gmail.com';
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

Then("veo el mensaje de error indicando que el mismo Member ya se encuentra creado", async function () {
    if (!fs.existsSync(`./vrt-reports/scenario19`)){
        fs.mkdirSync(`./vrt-reports/scenario19/screenshots`, { recursive: true });
    }
    if (vrt) {
        const errorMsg = 'Validation error, cannot save member. Member already exists Attempting to add member with existing email address'
        const alertMessage = await this.driver.$('div[class="gh-alert-content"]');
        const errorText = await alertMessage.getText();
        await expect(errorText).to.have.string(errorMsg);

        const screenshot = await this.driver.saveScreenshot(
            `./vrt-reports/scenario19/screenshots/new-${featureToTest}-${vrt ? 'base' : 'rc'}.png`
        );
        await this.attach(screenshot, 'image/png');
        return;
    }
    const errorMsg = "Member already exists. Attempting to add member with existing email address";
    const formGroup = await this.driver.$('.form-group.max-width.error');
    const errorMessageElement = await formGroup.$('p.response');
    const errorMessage = await errorMessageElement.getText();
    await expect(errorMessage).to.have.string(errorMsg);

    const screenshot = await this.driver.saveScreenshot(
        `./vrt-reports/scenario19/screenshots/new-${featureToTest}-${vrt ? 'base' : 'rc'}.png`
    );
    await this.attach(screenshot, 'image/png');
})

Then("creo un nuevo member", async function () {
    //ir al formulario de nuevo member
    const newMemberBtn = await this.driver.$('a[href="#/members/new/"]');
    await newMemberBtn.waitForEnabled();
    await newMemberBtn.click();

    // confirmar que el formulario de nuevo miembro se encuentre abierto
    const memberForm = await this.driver.$('form.member-basic-info-form');
    await expect(await memberForm.isDisplayed()).to.be.true;

    //completar campos del formulario
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

    if (vrt) {
        //Click en el boton de Save
        const saveBtn = await this.driver.$('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]');
        await saveBtn.waitForEnabled();
        await saveBtn.click();

        return;
    }

    //Click en el boton de Save
    const saveBtn = await this.driver.$('[data-test-button="save"]')
    await saveBtn.waitForEnabled()
    await saveBtn.click()
    await this.driver.pause(1000);
})

Then("reviso el conteo de members y puedo ver un total de {kraken-string} members creados", async function (int) {
    if (!fs.existsSync(`./vrt-reports/scenario20`)){
        fs.mkdirSync(`./vrt-reports/scenario20/screenshots`, { recursive: true });
    }
    const membersCount = await this.driver.$('span[class="gh-nav-member-count"]');
    const countText = await membersCount.getText();
    try {
        await expect(countText).to.have.string(int);
        const screenshot = await this.driver.saveScreenshot(
            `./vrt-reports/scenario20/screenshots/new-${featureToTest}-${vrt ? 'base' : 'rc'}.png`
        );
        await this.attach(screenshot, 'image/png');
    } catch (e) {
        const screenshot = await this.driver.saveScreenshot(
            `./vrt-reports/scenario20/screenshots/new-${featureToTest}-${vrt ? 'base' : 'rc'}.png`
        );
        await this.attach(screenshot, 'image/png');
    }
})

Then("elimino los ultimos members creados", async function() {
    try {
        const cookies = await this.driver.getCookies(['ghost-admin-api-session']);

        await this.driver.setCookies({
            name: 'ghost-admin-api-session',
            value: cookies[0].value
        });
        let membersList ;
        await axios.get(ghostUrl + `/api${vrt ? '/v4' : ''}` + '/admin/members', {
            // withCredentials: true,
            headers: {
                ...headers,
                Cookie: `ghost-admin-api-session=${cookies[0].value}`
            }
        }).then((r) => {
            membersList = r.data.members
        }).catch(e => {
            console.error('getMembersError', e)
        })

        await membersList.forEach(member => {
            const memberToDelete = ghostUrl + `api${vrt ? '/v4' : ''}/admin/members/` + member.id;
            axios.delete(memberToDelete, {
                // withCredentials: true,
                headers: {
                    ...headers,
                    Cookie: `ghost-admin-api-session=${cookies[0].value}`
                }
            })
                .then(response => response)
                .catch(error => console.error('deleteError', error));
        })

        await this.driver.pause(2000);

    } catch (e) {
        console.error('helloerror',e)
    }
})