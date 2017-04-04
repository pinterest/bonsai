/*
 * @flow
 */

import stats from '../../../public/data/stats-2017-03-13.json';

import getExtendedModulesById from '../getExtendedModulesById';

describe('getExtendedModulesById', () => {
  it('should extend all the modules', () => {
    const selectedChunkId = 195;
    const result = getExtendedModulesById(stats, selectedChunkId);

    expect(Object.keys(result)).toHaveLength(21);
    expect(result).toMatchSnapshot();
  });
});
