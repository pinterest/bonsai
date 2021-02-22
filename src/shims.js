/**
 * @flow
 */

import values from 'object.values';
import includes from 'array-includes';
import 'raf/polyfill';

console.timeStamp = function() {};

if (!Object.values) {
  values.shim();
}

if (!Array.prototype.includes) {
  includes.shim();
}
