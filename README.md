# Estudiantes proyecto

* David Esteban Escobar Castro - de.escobarc1@uniandes.edu.co
* Santiago Paeres Gonzalez - s.paeres10@uniandes.edu.co
* Daniel Felipe Zapata Parra - df.zapata@uniandes.edu.co
* Juan Sebastian Rodriguez - js.rodriguezm12345@uniandes.edu.co

# Ejecución escenarios de prueba entrega final
Todos fueron realizados en cypress

## Configuración Cypress 

### Paso 1: Configuración del entorno

Antes de instalar asegúrate de tener Node.js y npm instalados en tu sistema. Puedes verificar su instalación ejecutando los siguientes comandos en tu terminal:

```bash
node -v
npm -v
```

Instalar cypress global 

```bash
npm install -g cypress
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
npm install
```

## Ejecución Tests

### Paso 1: Configuración de credenciales

Dentro de la carpeta de Cypress hay un archivo llamado .env debe reemplazar los campos CYPRESS_EMAIL_TEST1, CYPRESS_EMAIL_TEST2, CYPRESS_EMAIL_TEST3, CYPRESS_EMAIL_TEST4 por el correo del usuario administrador creado y CYPRESS_PASSWORD_TEST1, CYPRESS_PASSWORD_TEST2, CYPRESS_PASSWORD_TEST3, CYPRESS_PASSWORD_TEST4 por la respectiva clave de cada usuario, puede ser el mismo usuario o diferente.

### Paso 2: Ejecutar los escenarios de pruebas

* Ejecutar el siguiente comando 
```bash
cypress run --headed --browser chrome
```
* Se puede observar que se generan los resultados en la terminal y vídeos en la carpeta videos/{nombre_funcionalidad}.cy.js.mp4