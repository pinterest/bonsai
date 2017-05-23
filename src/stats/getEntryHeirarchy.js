/*
 * @flow
 */

import type {ChunkID, RawStats} from '../types/Stats';

import getEntryChunks from './getEntryChunks';

export type Child = {
  id: ChunkID,
  ids: Array<ChunkID>,
  name: string,
  names: Array<string>,
  children: Array<Child>,
};

function getChunkName(chunk) {
  return (
    chunk.names.join(', ') ||
    chunk.origins.map((origin) => origin.moduleName).join(', ')
  );
}

function getChildrenForChunk(stats, parentChunk, existingParents: Array<ChunkID>): Array<Child> {
  return getEntryChunks(stats)
    .filter((chunk) =>
      chunk.parents.includes(parentChunk.id) &&
      !existingParents.includes(chunk.id)
    )
    .map((chunk) => ({
      id: chunk.id,
      ids: [chunk.id],
      name: getChunkName(chunk),
      names: chunk.names,
      children: getChildrenForChunk(stats, chunk, existingParents.concat(chunk.id)),
    }));
}

export const ROOT_ID = Number.MIN_SAFE_INTEGER;

export default function getEntryHeirarchy(
  stats: RawStats,
): Child {
  return {
    id: ROOT_ID,
    ids: [],
    name: '',
    names: [],
    children: getEntryChunks(stats)
      .filter((chunk) => chunk.parents.length === 0)
      .map((chunk) => ({
        id: chunk.id,
        ids: [chunk.id],
        name: getChunkName(chunk),
        names: chunk.names,
        children: getChildrenForChunk(stats, chunk, [chunk.id]),
      })),
  };
}
