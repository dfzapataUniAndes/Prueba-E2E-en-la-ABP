# Estudiantes proyecto

* David Esteban Escobar Castro de.escobarc1@uniandes.edu.co
* Santiago Paeres Gonzalez s.paeres10@uniandes.edu.co
* Daniel Felipe Zapata Parra df.zapata@uniandes.edu.co
* Juan Sebastian Rodriguez js.rodriguezm12345@uniandes.edu.co

# Kraken

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

### Paso 2: Entrar a la carpeta kraken

```bash
cd Kraken
```

### Paso 3: Instalar dependencias

```bash
npm install
```

## Ejecución Tests

### Paso 1: Configuración de credenciales

Dentro de la carpeta de Kraken hay un archivo llamado properties.json debe reemplazar los campos USERNAME1 y PASSWORD1 por el usuario administrador que tenga registrado en ghost

### Paso 2: Ejecutar los escenarios de pruebas

Los features se ejecutan en paralelo por lo que se recomienda ejecutarlos de manera individual

#### Crear pages

* Mover a otra carpeta los archivos features/posts.feature y features/tags.feature
* Ejecutar el siguiente comando 
```bash
npx kraken-node run
```
* Se puede observar que se generan los resultados en la carpeta reportes/uuid(aleatorio)

#### Crear posts

* Mover a otra carpeta los archivos features/pages.feature y features/tags.feature
* Ejecutar el siguiente comando 
```bash
npx kraken-node run
```
* Se puede observar que se generan los resultados en la carpeta reportes/uuid(aleatorio)

#### Crear tags

* Mover a otra carpeta los archivos features/pages.feature y features/posts.feature
* Ejecutar el siguiente comando 
```bash
npx kraken-node run
```
* Se puede observar que se generan los resultados en la carpeta reportes/uuid(aleatorio)



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

### Paso 2: Entrar a la carpeta kraken

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

