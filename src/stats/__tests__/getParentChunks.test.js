/*
 * @flow
 */

import getEntryHierarchy from '../getEntryHierarchy';
import getParentChunks from '../getParentChunks';
import {defaultChunk} from '../../__test_helpers__/defaults';

const stats = {
  chunks: [
    defaultChunk({
      id: 0,
      names: ['chunk-zero'],
    }),
    defaultChunk({
      id: 1,
      names: ['chunk-one'],
      parents: [0],
    }),
    defaultChunk({
      id: 2,
      names: ['chunk-two'],
      parents: [0, 1],
    }),
    defaultChunk({
      id: 3,
      names: ['chunk-three'],
      parents: [],
    }),
    defaultChunk({
      id: 4,
      names: ['chunk-four'],
      parents: [0, 1, 3],
    }),
    defaultChunk({
      id: 5,
      names: ['chunk-five'],
      parents: [4],
    }),
  ],
  modules: [],
};

const chunksByParent = getEntryHierarchy(stats);

describe('getParentChunks', () => {
  it('should list some for a chunk in the middle', () => {
    const result = getParentChunks(chunksByParent, 1);

    expect(result).toEqual([
      expect.objectContaining({id: 0}),
      expect.objectContaining({id: 1}),
    ]);
  });

  it('should dive down to the bottom chunkIds', () => {
    const result = getParentChunks(chunksByParent, 5);

    expect(result).toEqual([
      expect.objectContaining({id: 0}),
      expect.objectContaining({id: 1}),
      expect.objectContaining({id: 4}),
      expect.objectContaining({id: 5}),
    ]);
  });

  it('should list just one for the top-level chunkId', () => {
    expect(getParentChunks(chunksByParent, 0)).toEqual([
      expect.objectContaining({id: 0}),
    ]);

    expect(getParentChunks(chunksByParent, 3)).toEqual([
      expect.objectContaining({id: 3}),
    ]);
  });

  it('should list nothing for a bad chunkId', () => {
    const result = getParentChunks(chunksByParent, -100);

    expect(result).toEqual(null);
  });
});
