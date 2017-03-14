/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import getEntryChunks from './getEntryChunks';
import getEntryHeirarchy from './getEntryHeirarchy';

function findChunk(root, targetID, history = []) {
  if (root.id == targetID) {
    return history.concat(targetID);
  } else {
    for (var i = 0; i < root.children.length; i++) {
      const nextHistory = root.id !== null ? history.concat(root.id) : history;
      var found = findChunk(root.children[i], targetID, nextHistory);
      if (found) {
          return found;
      }
    }
  }
  return null;
}

export default function parentChunkIds(stats: RawStats, chunkId: number): ?Array<number> {
  return findChunk(getEntryHeirarchy(stats), chunkId);
}
