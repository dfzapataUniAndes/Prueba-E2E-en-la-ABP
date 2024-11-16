# Cypress

## Instalación

### Paso 1: Configuración del entorno

Antes de instalar asegúrate de tener Node.js y npm instalados en tu sistema. Puedes verificar su instalación ejecutando los siguientes comandos en tu terminal:

```bash
node -v
npm -v
```

Además debe tener instanciado Ghost corriendo en la url  http://localhost:2368/ghost/

```bash
ghost start
```

También debe tener un usuario registrado como administrador en ghost

### Paso 2: Entrar a la carpeta Cypress

```bash
cd Cypress
```

### Paso 3: Instalar dependencias

```bash
npm install dotenv
```

## Ejecución Tests

### Paso 1: Configuración de credenciales

Dentro de la carpeta de Cypress hay un archivo llamado .env debe reemplazar los campos CYPRESS_EMAIL_TEST1 y CYPRESS_EMAIL_TEST2 por el correo del usuario administrador creado y CYPRESS_PASSWORD_TEST1 y CYPRESS_PASSWORD_TEST2 por la respectiva clave de cada usuario, puede ser el mismo usuario o diferente.

### Paso 2: Ejecutar los escenarios de pruebas

* Ejecutar el siguiente comando
```bash
cypress run --headed --browser chrome
```
* Se puede observar que se generan los resultados en la terminal y vídeos en la carpeta videos/pages.cy.js.mp4, videos/posts.cy.js.mp4, videos/tags.cy.js.mp4