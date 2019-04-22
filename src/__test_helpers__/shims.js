/**
 * @flow
 */

import values from 'object.values';
import includes from 'array-includes';
import 'raf/polyfill';
import 'console-shim';

(console: any).timeStart = jest.fn(); // eslint-disable-line no-console
(console: any).timeEnd = jest.fn(); // eslint-disable-line no-console

window.alert = jest.fn();

if (!Object.values) {
  values.shim();
}

if (!Array.prototype.includes) {
  includes.shim();
}
