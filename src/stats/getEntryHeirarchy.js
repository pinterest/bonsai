/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import getEntryChunks from './getEntryChunks';

function getChildrenForChunk(stats, parentChunk) {
  return getEntryChunks(stats).filter(
    (chunk) => chunk.parents.includes(parentChunk.id)
  ).map(
    (chunk) => ({
      id: chunk.id,
      names: chunk.names,
      children: getChildrenForChunk(stats, chunk),
    })
  );
}

export default function getEntryHeirarchy(stats: RawStats) {
  return {
    id: null,
    children: getEntryChunks(stats)
      .filter((chunk) => chunk.parents.length === 0)
      .map((chunk) => ({
        id: chunk.id,
        names: chunk.names,
        children: getChildrenForChunk(stats, chunk),
      })),
  };
}
