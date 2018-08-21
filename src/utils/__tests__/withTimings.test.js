/**
 * @flow
 */

import withTimings from '../withTimings';

/* eslint-disable no-console */

describe('withTimings', () => {
  beforeEach(() => {
    (console: any).timeStamp = jest.fn();
    (console: any).time = jest.fn();
    (console: any).timeEnd = jest.fn();
  });

  it('should proxy and call the method it wraps', () => {
    const mock = jest.fn();

    withTimings('scope', 'action')(mock, 'foo');

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('foo');
  });

  it('should call console.timeStamp around the method', () => {
    const mock = jest.fn();

    withTimings('Unittest', 'run')(mock, 'foo');

    expect(console.timeStamp).toHaveBeenCalledTimes(2);
    expect(console.timeStamp).toHaveBeenCalledWith('Unittest start: run');
    expect(console.timeStamp).toHaveBeenCalledWith('Unittest end: run');
  });

  it('should call console.time to get a labelled duration', () => {
    const mock = jest.fn();

    withTimings('Unittest', 'run')(mock, 'foo');

    expect(console.time).toHaveBeenCalledTimes(1);
    expect(console.timeEnd).toHaveBeenCalledTimes(1);
    expect(console.time).toHaveBeenCalledWith('Unittest: run');
    expect(console.timeEnd).toHaveBeenCalledWith('Unittest: run');
  });
});

/* eslint-enable no-console */
