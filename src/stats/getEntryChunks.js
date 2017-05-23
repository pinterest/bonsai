/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

export default function getEntryChunks(stats: RawStats) {
  return stats.chunks;
  // .filter(
  //   chunk => chunk.names.length
  // );
}
