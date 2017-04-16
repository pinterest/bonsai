#!/usr/bin/env node
// @flow

const fs = require('fs');
const path = require('path');

const dataFolder = path.resolve(`${__dirname}/../public/data/`);
const indexFile = path.resolve(`${dataFolder}/index.json`);
const webDataFolderPrefix = '/data/';

console.log('Reading from', dataFolder);

const files = fs.readdirSync(dataFolder)
  .filter((file) => file !== 'index.json')
  .filter((file) => file.endsWith('.json'))
  .map((file) => webDataFolderPrefix + file);

console.log('Found data files', files);

fs.writeFileSync(indexFile, JSON.stringify({
  files: files,
}, null, '\t'));

console.log('Recorded into ', indexFile);
