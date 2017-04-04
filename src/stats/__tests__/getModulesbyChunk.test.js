/*
 * @flow
 */

import stats from '../../../public/data/stats-2017-03-13.json';

import getModulesByChunk from '../getModulesByChunk';

describe('getModulesByChunk', () => {
  it('should list all the chunks', () => {
    const result = getModulesByChunk(stats);

    // Snapshot formatting dies on the whole `result` object.
    expect(Object.keys(result)).toMatchSnapshot();
    expect(result["0"]).toMatchSnapshot();
  });
});
