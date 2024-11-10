Para correr las pruebas E2E de la aplicación Ghost por favor siga los siguientes pasos:

1. Antes de correr las pruebas debe haber instanciado Ghost por medio del comando Ghost Start.
2. Una vez tenga acceso a Ghost en la URL http://localhost:2368/ghost/, siga al siguiente paso
3. Registrese si no lo ha hecho antes, una vez tenga su usuario y contraseña inicie sesion
4. Complete el dashboard de introducción a Ghost.
5. En la carpeta actual /Kraken, corra el comando "npm install"
6. En el archivo "properties.json" que se encuentra en la carpeta actual ingrese su usuario y contraseña.
7. Después de haber hecho estos paso ya puede correr las pruebas con el comando "npx kraken-node run"
8. Al correr multiples escenarios al mismo tiempo se generan algunos errores, por lo tanto recomendamos comentar los que no vaya a probar y testear uno por uno.