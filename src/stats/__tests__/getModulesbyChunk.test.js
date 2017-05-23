/*
 * @flow
 */

import stats from './__fixtures__/stats.json';

import getModulesByChunk from '../getModulesByChunk';

describe.skip('getModulesByChunk', () => {
  it('should list all the chunks', () => {
    const result = getModulesByChunk(
      stats,
      stats.chunks.map((chunk) => chunk.id),
    );

    // Snapshot formatting dies on the whole `result` object.
    expect(Object.keys(result)).toMatchSnapshot();
    expect(result["0"]).toMatchSnapshot();
  });
});
