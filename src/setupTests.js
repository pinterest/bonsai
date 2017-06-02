import values from 'object.values';
import includes from 'array-includes';

if (!Object.values) {
  values.shim();
}

if (!Array.prototype.includes) {
  includes.shim();
}
