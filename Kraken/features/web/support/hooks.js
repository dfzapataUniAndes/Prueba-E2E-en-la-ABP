const { After, Before } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');
const { ghostBaseUrl, ghostRcUrl, vrt } = require('../../../config.json')
const {USERNAME1, PASSWORD1} = require('../../../properties.json')

const url = vrt ? ghostRcUrl : ghostBaseUrl

Before(async function() {
    this.deviceClient = new WebClient('chrome', {}, this.userId);
    this.driver = await this.deviceClient.startKrakenForUserId(this.userId);

    await this.driver.url(url + "#/signin");
    await this.driver.pause(2000);

    const emailInput = await this.driver.$('input[name="identification"]');
    await emailInput.waitForExist({ timeout: 10000 });
    await emailInput.setValue(USERNAME1);

    const passwordInput = await this.driver.$('input[name="password"]');
    await passwordInput.waitForExist();
    await passwordInput.setValue(PASSWORD1);

    const loginButton = await this.driver.$('button[type="submit"]');
    await loginButton.click();
    await this.driver.pause(3000);
})

After(async function() {
    await this.driver.url("http://localhost:2368/ghost/#/signout");
    await this.deviceClient.stopKrakenForUserId(this.userId);
});
