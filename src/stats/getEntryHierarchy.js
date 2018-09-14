/*
 * @flow
 */

import type { ChunkID, RawStats } from '../types/Stats';

import getChunkName from './getChunkName';
import getChunkNamesFromImportedModules from './getChunkNamesFromImportedModules';
import getEntryChunks from './getEntryChunks';

export type Child = {
  id: ChunkID,
  ids: Array<ChunkID>,
  name: string,
  names: Array<string>,
  children: Array<Child>,
};

export type FlatChunk = {
  id: ChunkID,
  name: string,
  indent: number,
};

function getChildrenForChunk(
  stats,
  importedChunkNames,
  parentChunk,
  existingParents: Array<ChunkID>,
): Array<Child> {
  return getEntryChunks(stats)
    .filter((chunk) =>
      chunk.parents.includes(parentChunk.id) &&
      !existingParents.includes(chunk.id)
    )
    .map((chunk) => ({
      id: chunk.id,
      ids: [chunk.id],
      name: getChunkName(chunk, importedChunkNames),
      names: chunk.names,
      children: getChildrenForChunk(
        stats,
        importedChunkNames,
        chunk,
        existingParents.concat(chunk.id),
      ),
    }));
}

export const ROOT_ID = Number.MIN_SAFE_INTEGER;

export default function getEntryHierarchy(
  stats: RawStats,
): Child {
  const importedChunkNames = getChunkNamesFromImportedModules(stats);

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
        name: getChunkName(chunk, importedChunkNames),
        names: chunk.names,
        children: getChildrenForChunk(
          stats,
          importedChunkNames,
          chunk,
          [chunk.id],
        ),
      })),
  };
}

export function flattenChunksByParent(
  chunksByParent: Array<Child>,
): Array<FlatChunk> {
  const flatChunks = [];
  const visitedChunks = {};

  function appendChildren(children: Array<Child>, indent: number) {
    children.forEach((child) => {
      if (!visitedChunks[child.id]) {
        flatChunks.push({
          id: child.id,
          name: child.name,
          indent: indent,
        });
        visitedChunks[child.id] = true;
      }

      appendChildren(child.children, indent + 1);
    });
  }

  appendChildren(chunksByParent, 0);

  return flatChunks;
}
