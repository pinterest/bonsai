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

export const ROOT_ID = Number.MIN_SAFE_INTEGER;

function getSyncName(name: string): string {
  if (name.indexOf('./node_modules/promise-loader?') === 0) {
    return name.replace('./node_modules/promise-loader?', '');
  } else {
    const match = name.match(/import\('([\w\S]+)'\)/);
    if (match) {
      return match[1];
    } else {
      return name;
    }
  }
}

export default function getEntryHierarchy(
  stats: RawStats,
): Child {
  console.time('getChunkNamesFromImportedModules');
  const importedChunkNames = getChunkNamesFromImportedModules(stats);
  console.timeEnd('getChunkNamesFromImportedModules');
  console.time('getEntryChunks');
  const entryChunks = getEntryChunks(stats);
  console.timeEnd('getEntryChunks');

  const rootChunks = [];
  const chunksById = {};
  const asyncChunksById = {};
  entryChunks.forEach((chunk) => {
    const name = getChunkName(chunk, importedChunkNames);
    chunksById[chunk.id] = {
      id: chunk.id,
      ids: [chunk.id],
      name: name,
      names: chunk.names,
      children: [],
    };

    const syncName = getSyncName(name);
    if (syncName !== name) {
      asyncChunksById[chunk.id] = {
        id: chunk.id,
        ids: [chunk.id],
        name: getChunkName(chunk, importedChunkNames),
        names: chunk.names,
        children: [],
      };
    }
  });

  entryChunks.forEach((chunk) => {
    const id = chunk.id;
    const child = chunksById[id];
    if (chunk.parents.length === 0) {
      rootChunks.push(child);
    } else {
      chunk.parents.forEach((parentId) => {
        const parent = chunksById[parentId];
        const asyncParent = asyncChunksById[parentId];

        if (asyncParent) {
          asyncParent.children.push(child);
        } else {
          parent.children.push(child);
        }
      });
    }
  });

  return {
    id: ROOT_ID,
    ids: [],
    name: '',
    names: [],
    // $FlowFixMe: Object.values has an Array<mixed> here
    children: rootChunks.concat(Object.values(asyncChunksById)),
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
