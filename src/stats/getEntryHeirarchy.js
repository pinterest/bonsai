/*
 * @flow
 */

import type { Asset, Chunk, ChunkID, RawStats } from '../types/Stats';

import getChunkName from './getChunkName';
import getChunkNamesFromImportedModules from './getChunkNamesFromImportedModules';
import getEntryChunks from './getEntryChunks';

export type Child = {
  id: ChunkID,
  ids: Array<ChunkID>,
  name: string,
  names: Array<string>,
  size: number,
  assets: Array<Asset>,
  children: Array<Child>,
};

export type FlatChunk = {
  id: ChunkID,
  name: string,
  indent: number,
  size: number,
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
      name: chunk.name, // getChunkName(chunk, importedChunkNames),
      names: chunk.names,
      size: chunk.size,
      assets: chunk.assets,
      children: getChildrenForChunk(
        stats,
        importedChunkNames,
        chunk,
        existingParents.concat(chunk.id),
      ),
    }));
}

export const ROOT_ID = Number.MIN_SAFE_INTEGER;

export default function getEntryHeirarchy(
  stats: RawStats,
): Child {
  const importedChunkNames = getChunkNamesFromImportedModules(stats);

  return {
    id: ROOT_ID,
    ids: [],
    name: '',
    names: [],
    size: 0,
    assets: [],
    children: getEntryChunks(stats)
      .filter((chunk) => chunk.parents.length === 0)
      .map((chunk) => ({
        id: chunk.id,
        ids: [chunk.id],
        name: chunk.name, // getChunkName(chunk, importedChunkNames),
        names: chunk.names,
        size: chunk.size,
        assets: chunk.assets,
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
          size: child.size,
        });
        visitedChunks[child.id] = true;
      }

      appendChildren(child.children, indent + 1);
    });
  }

  appendChildren(chunksByParent, 0);

  return flatChunks;
}
