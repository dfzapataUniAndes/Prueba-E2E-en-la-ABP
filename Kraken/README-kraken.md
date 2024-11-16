# KRAKEN

## Carpeta notest
Hemos agregado una nueva carpeta llamada /Kraken/notest en la cual se encuentran las diferentes funcionalidades, para probar cada una debe mover las funcionalidades manualmente desde /Kraken/notest a la carpeta /Kraken/features.

En la carpeta actual /Kraken, corra el comando
```bash
npm install
```

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
2. Los comandos anteriores generan una nueva carpeta por cada escenario de prueba dentro de la carpeta /vrt-reports.
3. Una vez se han generado los screenshots en la carpeta de /vrt-reports/scenario# puede usar el siguiente comando para generar el reporte de VRT:
```bash
npm test-vrt
```
4. Por cada carpeta /scenario que se encuentre dentro de /vrt-reports se creará un nuevo reporte .html
