/*
 * @flow
 */

import type {ChunkID} from '../types/Stats';
import type {Child} from './getEntryHeirarchy';

import {isSameChunk} from '../types/Stats';
import {ROOT_ID} from './getEntryHeirarchy';

function findChunk(
  root: Child,
  targetID: ChunkID,
  history: Array<Child> = [],
): ?Array<Child> {
  if (targetID === null) {
    return null;
  }

  if (isSameChunk(root.id, targetID)) {
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
  root: Child,
  chunkId: ChunkID,
): ?Array<Child> {
  return findChunk(root, chunkId);
}
