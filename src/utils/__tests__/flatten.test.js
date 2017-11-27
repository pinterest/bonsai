/**
 * @flow
 */

import flatten from '../flatten';

describe('flatten', () => {
  it('should take an array of arrays and return a single array', () => {
    const value = [[1], [2], [3]];

    expect(flatten(value)).toEqual([1, 2, 3]);
  });

  it('should take doubly-nested arrays and flatten one level deep', () => {
    const value = [[1], [2, [3], 4], [5]];

    expect(flatten(value)).toEqual([1, 2, [3], 4, 5]);
  });

  it('should flatten all types together', () => {
    const value = [[1], ['foo'], [null], [undefined], [{}]];

    expect(flatten(value)).toEqual([1, 'foo', null, undefined, {}]);
  });

  it('should skip empty inner arrays', () => {
    const value = [[], [], []];

    expect(flatten(value)).toEqual([]);
  });
});
