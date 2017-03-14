/*
 * @flow
 */

import stats from '../../../public/data/stats-2017-03-13.json';

import getModulesByChunk from '../getModulesByChunk';

describe('getModulesByChunk', () => {
  it('should list all the chunks', () => {
    stats.modules = stats.modules.slice(0, 100);
    const result = getModulesByChunk(stats);

    expect(result).toMatchSnapshot();
  });
});
