const fs = require('fs');
const path = require('path');
const notestFolder = path.join(__dirname, 'notest');
const featuresFolder = path.join(__dirname, 'features');
const { featureToTest } = require("./config.json");
const specificFile = `${featureToTest}.feature`;

const moveSpecificFile = () => {
    const notestPath = path.join(notestFolder, specificFile);
    const featuresPath = path.join(featuresFolder, specificFile);

    // Check if the file exists in the notest folder
    fs.access(notestPath, fs.constants.F_OK, (err) => {
        if (err) {
            return //console.error(`File ${specificFile} does not exist in the notest folder`);
        }

        // Move the file from notest to features
        fs.rename(notestPath, featuresPath, (err) => {
            if (err) {
                return console.error('Error moving file from notest to features:', err);
            }
            console.log(`Moved ${specificFile} from /notest to /features`);
        });
    });

    // Move file from features to notest
    fs.readdir(featuresFolder, (err, featureFiles) => {
        if (err) {
            return console.error('Unable to scan directory:', err);
        }

        featureFiles.forEach(file => {
            const featureFile = file.endsWith('.feature') && !file.includes(featureToTest);
            if (featureFile) {
                const oldPath = path.join(featuresFolder, file);
                const newPath = path.join(notestFolder, file);
                fs.rename(oldPath, newPath, err => {
                    if (err) {
                        return console.error('Error moving file from notest to features:', err);
                    }
                    console.log(`Moved ${file} from /features to /notest`);
                });
            }
        })
    })
};

// Execute the function
moveSpecificFile();

// Execute the function
// moveFiles();