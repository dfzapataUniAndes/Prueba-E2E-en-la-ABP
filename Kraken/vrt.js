const compareImages = require("resemblejs/compareImages")
const fs = require('fs');
const path = require('path');
const { browsers, options, featureToTest, ghostBaseUrl } = require("./config.json");

const rootFolder = path.join(__dirname, 'vrt-reports');
const runScriptForFolders = () => {
    fs.readdir(rootFolder, (err, scenarioDir) => {
        if (err) {
            return console.error('Unable to scan directory:', err);
        }

        scenarioDir.forEach(scenario => {
            const filePath = path.join(rootFolder, scenario);
            fs.stat(filePath, async (err, stats) => {
                if (err) {
                    return console.error('Unable to read file stats:', err);
                }
                if (stats.isDirectory()) {
                    await executeTest(scenario)
                    console.log(`Running script for folder: ${filePath}`);
                }
            });
        });
    });
};

(async ()=> runScriptForFolders())();

async function executeTest(scenarioDir){
    if(browsers.length === 0){
        return;
    }
    let resultInfo = {};
    let datetime = new Date().toISOString().replace(/:/g,".");
    for(b of browsers){
        if(!b in ['chromium', 'webkit', 'firefox']){
            return;
        }

        const filePath = path.join(rootFolder, scenarioDir);
        const data = await compareImages(
            fs.readFileSync(`${filePath}/screenshots/new-${featureToTest}-rc.png`),
            fs.readFileSync(`${filePath}/screenshots/new-${featureToTest}-base.png`),
            options
        );
        resultInfo[b] = {
            isSameDimensions: data.isSameDimensions,
            dimensionDifference: data.dimensionDifference,
            rawMisMatchPercentage: data.rawMisMatchPercentage,
            misMatchPercentage: data.misMatchPercentage,
            diffBounds: data.diffBounds,
            analysisTime: data.analysisTime
        }
        fs.writeFileSync(`./vrt-reports/${scenarioDir}/compare-${b}.png`, data.getBuffer());
    }

    fs.writeFileSync(`./vrt-reports/${scenarioDir}/report.html`, createReport(datetime, resultInfo));
    fs.copyFileSync('./index.css', `./vrt-reports/${scenarioDir}/index.css`);

    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return resultInfo;
}

function browser(b, info){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="before-${b}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="after-${b}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${ghostBaseUrl}"> ${ghostBaseUrl}</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${browsers.map(b=>browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`
}