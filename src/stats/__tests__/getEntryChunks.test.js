/*
 * @flow
 */

import {defaultChunk} from '../../__test_helpers__/defaults';
import getEntryChunks from '../getEntryChunks';

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

describe('getEntryChunks', () => {
  it('should list all the chunks', () => {
    const result = getEntryChunks(stats);

    expect(result).toHaveLength(3);
    expect(result).toMatchSnapshot();
  });
});
