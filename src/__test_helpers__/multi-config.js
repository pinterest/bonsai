/*
 * @flow
 */

var config = require('../../node_modules/react-scripts/config/webpack.config.prod.js');
module.exports = [
  Object.assign({}, config, {
    target: 'web',
    output: Object.assign({}, config.output, {
      filename: 'web.js',
    }),
  }),
  Object.assign({}, config, {
    target: 'node',
    output: Object.assign({}, config.output, {
      filename: 'node.js',
    }),
  }),
];
