/*
 * @flow
 */

import {defaultChunk} from '../../__test_helpers__/defaults';
import {defaultExtendedModule} from '../../__test_helpers__/defaults';
import getEntryHeirarchy from '../getEntryHeirarchy';

const stats = {
  chunks: [
    defaultChunk({
      id: 0,
      names: ['chunk-zero'],
    }),
    defaultChunk({
      id: 1,
      names: ['chunk-one'],
      parents: [0, 1],
    }),
    defaultChunk({
      id: 2,
      names: ['chunk-two'],
    }),
  ],
};

describe('getEntryHeirarchy', () => {
  it('should list all the chunks', () => {
    const result = getEntryHeirarchy(stats);

    expect(result).toMatchSnapshot();
  });
});
