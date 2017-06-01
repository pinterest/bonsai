/*
 * @flow
 */

import type {ChunkID, RawStats, Module, Reason} from '../types/Stats';

import getEntryChunks from './getEntryChunks';

export type Child = {
  id: ChunkID,
  ids: Array<ChunkID>,
  name: string,
  names: Array<string>,
  children: Array<Child>,
};

function isImportType(reason: Reason): boolean {
  return reason.type === 'import()';
}

function wasImported(module: Module): boolean {
  return module.reasons.filter(isImportType).length > 0;
}

function getChunkNamesFromImportedModules(
  stats: RawStats,
): {
  [chunkId: ChunkID]: string,
} {
  const chunksById = stats.chunks.reduce((map, chunk) => {
    map[chunk.id] = chunk;
    return map;
  }, {});

  return stats.modules
    .filter(wasImported)
    .reduce((namesByChunks, module) => {
      module.reasons
        .filter(isImportType)
        .forEach((reason) => {
          const chunk = module.chunks
            .map((chunkId) => chunksById[chunkId])
            .filter((chunk) =>
              chunk.origins.length >= 1 &&
              chunk.origins[0].loc === reason.loc
            )
            .shift();

          if (chunk) {
            namesByChunks[chunk.id] = module.name;
          }
        });
      return namesByChunks;
    }, {});
}

function getChunkName(chunk, importedChunkNames) {
  return (
    chunk.names.join(', ') ||
    [
      chunk.origins.map((origin) => origin.moduleName).join(', '),
      importedChunkNames[chunk.id]
    ].join('!')
  );
}

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

export default function getEntryHeirarchy(
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
