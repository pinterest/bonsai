/**
 * @flow
 */

import values from 'object.values';
import includes from 'array-includes';
import 'raf/polyfill';

if (!Object.values) {
  values.shim();
}

if (!Array.prototype.includes) {
  includes.shim();
}
