/*
 * @flow
 */

var config = require('../../node_modules/react-scripts/config/webpack.config.prod.js');

// use Object.assign so flow has something to analyze
module.exports = Object.assign({}, config);
