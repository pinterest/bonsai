/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import getEntryHeirarchy from './getEntryHeirarchy';

function findChunk(root, targetID, history = []) {
  if (targetID === null) {
    return null;
  }

  if (root.id === targetID) {
    return history.concat(targetID);
  } else {
    for (let i = 0; i < root.children.length; i++) {
      const nextHistory = root.id !== null ? history.concat(root.id) : history;
      const found = findChunk(root.children[i], targetID, nextHistory);
      if (found) {
          return found;
      }
    }
  }
  return null;
}

export default function getParentChunkIds(
  stats: RawStats,
  chunkId: number,
): ?Array<number> {
  return findChunk(getEntryHeirarchy(stats), chunkId);
}
