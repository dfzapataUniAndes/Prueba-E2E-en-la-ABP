# Estudiantes proyecto

* David Esteban Escobar Castro - de.escobarc1@uniandes.edu.co
* Santiago Paeres Gonzalez - s.paeres10@uniandes.edu.co
* Daniel Felipe Zapata Parra - df.zapata@uniandes.edu.co
* Juan Sebastian Rodriguez - js.rodriguezm12345@uniandes.edu.co

## Instalación Ghost

1. asegurese de usar nodejs versión 14.17.0, la cual es estable para correr la versión base ghost:4.5, recomendamos usar nvm:
```bash
nvm install 14.17.0
nvm use 14.17.0
```

2. Una vez tenga instalado Ghost-cli, siga los siguientes pasos para instanciar ghost en su versión base y versión de referencia:

* Cree y entre a una nueva carpeta llamada ghost-base.
  ```bash
  mkdir ghost-base
  cd ghost-base
  ```
#### Puede instalar Ghost desde Docker con los siguientes comandos:
```bash
docker pull ghost:4.5
docker run -d --name some-ghost -e NODE_ENV=development -e url=http://localhost:3001 -p 3001:2368 ghost
 ```

#### o manualmente cómo se explica en los puntos a continuación:

* Desde una terminal en la carpeta ghost-base corra el siguiente comando  para instalar la version base.
  ```bash
  ghost install 4.5 --local --force
  ```

* Cree una nueva carpeta llamada ghost-rc
    ```bash
    mkdir ghost-rc
    ```

    * Desde una terminal en la carpeta ghost-rc corra el siguiente comando para instalar la versión de referencia.
    ```bash
    ghost install 5.96.0 --local
    ```

Una vez haya instalado ambas versiones debería poder ver dos versiones diferentes de Ghost corriendo en las siguientes urls:
```bash
Ghost-base = http://localhost:2369/ghost/

Ghost-rc = http://localhost:2368/ghost/
```

**Tenga en cuenta que para que las pruebas de VRT funcionen las diferentes versiones de Ghost deben verse en las url especificadas arriba.**

## **Antes de iniciar realice los siguientes pasos:**

1. Registrese en ambas versiones de Ghost (BASE y RC) **usando el mismo usuario y contraseña** si no lo ha hecho antes, una vez tenga su usuario y contraseña inicie sesión.
2. Complete el dashboard de introducción a Ghost.

# Pruebas en Kraken
[Kraken README](Kraken/README-kraken.md)

# Pruebas en Cypress
[Cypress README](Cypress/README-cypress.md)