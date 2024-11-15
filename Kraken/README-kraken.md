# KRAKEN

## Carpeta notest
Hemos agregado una nueva carpeta llamada /Kraken/notest en la cual se encuentran las diferentes funcionalidades, para probar cada una debe mover las funcionalidades manualmente desde /Kraken/notest a la carpeta /Kraken/features.

Antes de iniciar realice los siguientes pasos:

1. Registrese en ambas versiones de Ghost (BASE y RC) si no lo ha hecho antes, una vez tenga su usuario y contraseña inicie sesión.
2. Complete el dashboard de introducción a Ghost.
3. En la carpeta actual /Kraken, corra el comando "npm install"

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

