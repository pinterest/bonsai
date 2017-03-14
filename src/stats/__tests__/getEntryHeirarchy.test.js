/*
 * @flow
 */

import stats from '../../../public/data/stats-2017-03-13.json';

import getEntryHeirarchy from '../getEntryHeirarchy';

describe('getEntryHeirarchy', () => {
  it('should list all the chunks', () => {
    const result = getEntryHeirarchy(stats);

    expect(result).toMatchSnapshot();
  });
});
