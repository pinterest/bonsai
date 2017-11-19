/*
 * @flow
 */

import {defaultChunk} from '../../__test_helpers__/defaults';
import getEntryHeirarchy, {
  flattenChunksByParent,
} from '../getEntryHeirarchy';

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
    }),
  ],
  modules: [],
};

describe('getEntryHeirarchy', () => {
  it('should list all the chunks', () => {
    const result = getEntryHeirarchy(stats);

    expect(result).toMatchSnapshot();
  });

  it('should flatten the list of all chunks', () => {
    const result = flattenChunksByParent(getEntryHeirarchy(stats).children);

    expect(result).toEqual([
      {id: 0, name: 'chunk-zero', indent: 0},
      {id: 1, name: 'chunk-one', indent: 1},
      {id: 2, name: 'chunk-two', indent: 0},
    ]);
  });
});
