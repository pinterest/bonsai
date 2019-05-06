/*
 * @flow
 */

var config = require('../../node_modules/react-scripts/config/webpack.config.js');

module.exports = [
  Object.assign({}, config(process.env.NODE_ENV), {
    target: 'web',
    output: Object.assign({}, config.output, {
      filename: 'web.js',
    }),
    stats: { source: false },
  }),
  Object.assign({}, config(process.env.NODE_ENV), {
    target: 'node',
    output: Object.assign({}, config.output, {
      filename: 'node.js',
    }),
    stats: { source: false },
  }),
];
