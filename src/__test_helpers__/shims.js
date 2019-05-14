/**
 * @flow
 */

(console: any).timeStart = jest.fn(); // eslint-disable-line no-console
(console: any).timeEnd = jest.fn(); // eslint-disable-line no-console

window.alert = jest.fn();
