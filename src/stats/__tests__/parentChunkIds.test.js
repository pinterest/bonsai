/*
 * @flow
 */

import stats from '../../../public/data/stats-2017-03-13.json';

import parentChunkIds from '../parentChunkIds';

describe('parentChunkIds', () => {
  it('should list some for a chunk in the middle', () => {
    const result = parentChunkIds(stats, 198);

    expect(result).toEqual([
      203,
      195,
      198,
    ]);
  });

  it('should dive down to the bottom chunkIds', () => {
    const result = parentChunkIds(stats, 199);

    expect(result).toEqual([
      203,
      195,
      198,
      196,
      194,
      199,
    ]);
  });

  it('should list just one for the top-level chunkId', () => {
    const result = parentChunkIds(stats, 203);

    expect(result).toEqual([
      203,
    ]);
  });

  it('should list nothing for a bad chunkId', () => {
    const result = parentChunkIds(stats, -100);

    expect(result).toEqual(null);
  });
});
