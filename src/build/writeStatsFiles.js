#!/usr/bin/env node

const fs = require('fs');
const path = require('path');



const dataFolder = path.resolve(`${__dirname}/../../public/data/`);
const indexFile = path.resolve(`${dataFolder}/index.json`);
console.log('Reading from', dataFolder);

const prefix = '/data/';

const files = fs.readdirSync(dataFolder)
    .filter((file) => file !== 'index.json')
    .map((file) => prefix + file);

console.log('Found data files', files);

fs.writeFileSync(indexFile, JSON.stringify({
    files: files,
}, null, '\t'));
console.log('Recorded into ', indexFile);
