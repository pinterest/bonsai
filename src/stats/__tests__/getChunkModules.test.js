/*
 * @flow
 */

import {defaultChunk, defaultExtendedModule} from '../../__test_helpers__/defaults';
import getChunkModules from '../getChunkModules';

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
    defaultExtendedModule({
      id: 2,
      chunks: [1],
    }),
  ],
};

describe('getChunkModules', () => {
  it('should extend all the modules', () => {
    const modules = getChunkModules(
      stats,
      [
        {
          id: 1,
          ids: [1],
          name: '',
          names: [],
          children: [],
        },
      ],
    );

    expect(modules).not.toBeNull();
    expect(modules).toHaveLength(2);
    expect(modules).toMatchSnapshot();
  });
});
