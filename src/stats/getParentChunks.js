/*
 * @flow
 */

import type {ChunkID, RawStats} from '../types/Stats';

import type {Child} from './getEntryHeirarchy';

import getEntryHeirarchy, {ROOT_ID} from './getEntryHeirarchy';

function findChunk(
  root: Child,
  targetID: ChunkID,
  history: Array<Child> = [],
): ?Array<Child> {
  if (targetID === null) {
    return null;
  }

  if (root.id === targetID) {
    return history.concat(root);
  } else {
    for (let i = 0; i < root.children.length; i++) {
      const nextHistory = root.id !== ROOT_ID ? history.concat(root) : history;
      const found = findChunk(root.children[i], targetID, nextHistory);
      if (found) {
          return found;
      }
    }
  }
  return null;
}

export default function getParentChunks(
  stats: RawStats,
  chunkId: ChunkID,
): ?Array<Child> {
  return findChunk(getEntryHeirarchy(stats), chunkId);
}
