'use strict';

const cp = require('child_process');
const path = require('path');
const fs = require('fs');

const targetArgs = global.NO_TARGET_ARGS ? '' : ' ./example.js -o js/output.js';
cp.exec(
  `node ${path.resolve(__dirname, '../bin/webpack.js')} --mode production --output-public-path "js/" --json ${targetArgs}`,
  {maxBuffer: Infinity},
  function(error, stdout, stderr) {
    if (stderr) {
      console.error(stderr); // eslint-disable-line no-console
    }
    if (error !== null) {
      console.error(error); // eslint-disable-line no-console
    }

    const exampleName = path.basename(process.cwd());
    fs.writeFileSync(`stats-${exampleName}.json`, stdout, 'utf-8');
  }
);
