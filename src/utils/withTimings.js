/*
 * @flow
 */

/* eslint-disable no-console */

export default function withTimings(scope: string, action: string) {
  return (fn: Function, ...args: Array<any>) => {
    console.timeStamp(`${scope} start: ${action}`);
    console.time(`${scope}: ${action}`);
    const result = fn(...args);
    console.timeEnd(`${scope}: ${action}`);
    console.timeStamp(`${scope} end: ${action}`);
    return result;
  };
}

/* eslint-enable no-console */
