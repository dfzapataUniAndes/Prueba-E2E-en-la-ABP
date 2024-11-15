# Estudiantes proyecto

* David Esteban Escobar Castro - de.escobarc1@uniandes.edu.co
* Santiago Paeres Gonzalez - s.paeres10@uniandes.edu.co
* Daniel Felipe Zapata Parra - df.zapata@uniandes.edu.co
* Juan Sebastian Rodriguez - js.rodriguezm12345@uniandes.edu.co

# KRAKEN
## Instalación

1. asegurese de usar nodejs versión 14.16.1, la cual es estable para correr la versión base ghost:4.5, recomendamos usar nvm:
```bash
nvm install 14.17.0
nvm use 14.17.0
```

2. Una vez tenga instalado Ghost-cli, siga los siguientes pasos para instanciar ghost en su versión base y versión de referencia:


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

**Tenga en cuenta que para que las pruebas de VRT funcionen las diferentes versiones de Ghost deben verse en las url especificadas arriba.**

## Carpeta notest
Hemos agregado una nueva carpeta llamada /Kraken/notest en la cual se encuentran las diferentes funcionalidades, para probar cada una debe mover las funcionalidades manualmente a la carpeta /Kraken/features
## Pruebas E2E

1. En el archivo config.json hemos agregado una nueva propiedad llamada "vrt", asegurese de que esta se encuentra en "false" para correr pruebas E2E, y en "true" para hacer Pruebas de Regresión Visual. 
2. Puede usar el siguiente comando para generar pruebas E2E de la versión RC.
```bash
npm kraken-run
```

## Pruebas VRT
1. Para generar los screenshots necesarios para las pruebas de regresión visual, cambie la propiedad "vrt" a "true" y desde la carpeta de /Kraken corra nuevamente el comando
```bash
npm kraken-run
```
2. Una vez se han generado los screenshots en la carpeta de /newreports puede usar el siguiente comando para generar el reporte de VRT:
```bash
npm test-vrt
```

