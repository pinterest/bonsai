/*
 * @flow
 */

import stats from './__fixtures__/stats.json';

import getEntryChunks from '../getEntryChunks';

describe.skip('getEntryChunks', () => {
  it('should list all the chunks', () => {
    const result = getEntryChunks(stats);

    expect(result).toHaveLength(46);
    expect(result).toMatchSnapshot();
  });
});
