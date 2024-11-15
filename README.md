# Estudiantes proyecto

* David Esteban Escobar Castro - de.escobarc1@uniandes.edu.co
* Santiago Paeres Gonzalez - s.paeres10@uniandes.edu.co
* Daniel Felipe Zapata Parra - df.zapata@uniandes.edu.co
* Juan Sebastian Rodriguez - js.rodriguezm12345@uniandes.edu.co

# Pruebas VRT en Kraken
## Instalación

1. asegurese de usar nodejs versión 14.16.1, la cual es estable para correr la versión base ghost:4.5, recomendamos usar nvm:
```bash
nvm install 14.17.0
nvm use 14.17.0
```

2. Una vez tenga instalado Ghost-cli, siga los siguientes pasos para crear la versión base y la versión de referencia:


  a. Cree una nueva carpeta llamada ghost-base.
```bash
mkdir ghost-base
```
   b. dede una terminal en la carpeta ghost-base corra el siguiente comando  para instalar la version base.
```bash
ghost install 4.5 --local --force
```
   c. Cree una nueva carpeta llamada ghost-rc
```bash
mkdir ghost-rc
```
   d. desde una terminal en la carpeta ghost-rc corra el siguiente comando para instalar la versión de referencia.
```bash
ghost install 5.96.0 --local
```
   e. debería poder ver dos versiones diferentes de Ghost corriendo en las siguientes urls:
   
#### Ghost base
http://localhost:2369/ghost/

#### Ghost rc
http://localhost:2368/ghost/


3. Una vez ambas versiones esten corriendo en sus respectivas urls,  en una terminal y corra el comando
```bash
npm kraken-run
```

- En el archivo .env que se encuentra en la raiz del proyecto Kraken ingrese su usuario, contraseña, url de ghost y alguna de las funcionalidades que quiere probar, las sigguientes son válidas:
  - members
  - posts
  - tags
