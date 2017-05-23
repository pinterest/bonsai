/*
 * @flow
 */

import stats from './__fixtures__/stats.json';

import getEntryHeirarchy from '../getEntryHeirarchy';

describe.skip('getEntryHeirarchy', () => {
  it('should list all the chunks', () => {
    const result = getEntryHeirarchy(stats);

    expect(result).toMatchSnapshot();
  });
});
