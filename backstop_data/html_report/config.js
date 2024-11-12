report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Inicio_0_document_0_default.png",
        "test": "../bitmaps_test/20241112-004015/backstop_default_Inicio_0_document_0_default.png",
        "selector": "document",
        "fileName": "backstop_default_Inicio_0_document_0_default.png",
        "label": "Inicio",
        "requireSameDimensions": true,
        "misMatchThreshold": 8,
        "url": "http://localhost:2369/ghost/#/setup",
        "referenceUrl": "http://localhost:2368/ghost/#/setup/two",
        "expect": 0,
        "viewportLabel": "default",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 11.987916666666667,
          "misMatchPercentage": "11.99",
          "analysisTime": 52
        },
        "diffImage": "../bitmaps_test/20241112-004015/failed_diff_backstop_default_Inicio_0_document_0_default.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Registro_0_document_0_default.png",
        "test": "../bitmaps_test/20241112-004015/backstop_default_Registro_0_document_0_default.png",
        "selector": "document",
        "fileName": "backstop_default_Registro_0_document_0_default.png",
        "label": "Registro",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:2369/ghost/#/setup",
        "referenceUrl": "http://localhost:2368/ghost/#/setup/two",
        "expect": 0,
        "viewportLabel": "default",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 11.995416666666667,
          "misMatchPercentage": "12.00",
          "analysisTime": 52
        },
        "diffImage": "../bitmaps_test/20241112-004015/failed_diff_backstop_default_Registro_0_document_0_default.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});