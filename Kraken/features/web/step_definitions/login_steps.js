const {Given, Then} = require("@cucumber/cucumber");
Given("que inicio sesion", async function () {
    await this.driver.pause(5000);
    await this.driver.url("http://localhost:2368/ghost/#/signin");
    await this.driver.pause(3000);

    const emailInput = await this.driver.$('input[name="identification"]');
    await emailInput.setValue("js.rodriguezm12345@uniandes.edu.co");
    await this.driver.pause(1000);

    const passwordInput = await this.driver.$('input[name="password"]');
    await passwordInput.setValue('39443950dE*');
    await this.driver.pause(1000);

    const loginButton = await this.driver.$('button[type="submit"]');
    await loginButton.click();
    await this.driver.pause(2000);
})


Then("cierro sesión en Ghost", async function () {
    // await this.driver.url('http://localhost:2368/ghost/#/dashboard')
    // Esperar que el avatar de usuario esté presente en el DOM antes de interactuar
    const userMenuButton = await this.driver.$(".gh-user-avatar");
    await userMenuButton.waitForEnabled()

    // Hacer clic en el avatar de usuario para abrir el menú
    await userMenuButton.click();

    // Esperar a que la opción de cerrar sesión sea visible y hacer clic en ella
    const logoutButton = await this.driver.$('a[href="#/signout/"]');
    await this.driver.waitUntil(async () => await logoutButton.isDisplayed(), {
        timeout: 5000,
        timeoutMsg: "El botón de cerrar sesión no se mostró en el tiempo esperado",
    });
    await logoutButton.click();

    // Pausar para asegurar que el proceso de cierre de sesión se complete
    await this.driver.pause(2000);
});