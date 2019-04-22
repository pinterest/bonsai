/*
 * @flow
 */

var config = require('../../node_modules/react-scripts/config/webpack.config.js');

module.exports = Object.assign(
  {},
  config(process.env.NODE_ENV),
  { stats: { source: false } }
);
