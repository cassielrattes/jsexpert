'use strict';

const pdf = require("pdf-parse");
const { readFile } = require('fs/promises');
const { join } = require('path');

; (async () => {
    const dataBuffer = await readFile(join(__dirname, './../../../docs/contrato.pdf'));
    const data = await pdf(dataBuffer);
    console.log("data", data.text);
})();