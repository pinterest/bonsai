/*
 * @flow
 */

import stats from './fixtures/stats-2017-03-13.json';

import getEntryChunks from '../getEntryChunks';

describe('getEntryChunks', () => {
  it('should list all the chunks', () => {
    const result = getEntryChunks(stats);

    expect(result).toHaveLength(46);
    expect(result).toMatchSnapshot();
  });
});
