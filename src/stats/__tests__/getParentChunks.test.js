/*
 * @flow
 */

import stats from './fixtures/stats-2017-03-13.json';

import getParentChunks from '../getParentChunks';

describe('getParentChunks', () => {
  it('should list some for a chunk in the middle', () => {
    const result = getParentChunks(stats, 198);

    expect(result).toEqual([
      expect.objectContaining({id: 203}),
      expect.objectContaining({id: 195}),
      expect.objectContaining({id: 198}),
    ]);
  });

  it('should dive down to the bottom chunkIds', () => {
    const result = getParentChunks(stats, 199);

    expect(result).toEqual([
      expect.objectContaining({id: 203}),
      expect.objectContaining({id: 195}),
      expect.objectContaining({id: 198}),
      expect.objectContaining({id: 196}),
      expect.objectContaining({id: 194}),
      expect.objectContaining({id: 199}),
    ]);
  });

  it('should list just one for the top-level chunkId', () => {
    const result = getParentChunks(stats, 203);

    expect(result).toEqual([
      expect.objectContaining({id: 203}),
    ]);
  });

  it('should list nothing for a bad chunkId', () => {
    const result = getParentChunks(stats, -100);

    expect(result).toEqual(null);
  });
});
