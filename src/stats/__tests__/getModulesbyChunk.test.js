/*
 * @flow
 */

import {defaultChunk, defaultExtendedModule} from '../../__test_helpers__/defaults';
import getModulesByChunk from '../getModulesByChunk';

const stats = {
  chunks: [
    defaultChunk({id: 0}),
    defaultChunk({id: 1}),
  ],
  modules: [
    defaultExtendedModule({
      id: 1,
      chunks: [0],
    }),
    defaultExtendedModule({
      id: 2,
      chunks: [0, 1],
    }),
  ],
};

describe('getModulesByChunk', () => {
  it('should list all the chunks', () => {
    const result = getModulesByChunk(
      stats,
      stats.chunks.map((chunk) => chunk.id),
    );

    // Snapshot formatting dies on the whole `result` object.
    expect(Object.keys(result)).toMatchSnapshot();
    expect(result).toMatchSnapshot();
  });
});
