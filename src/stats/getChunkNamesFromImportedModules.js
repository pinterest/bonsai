/*
 * @flow
 */

import type {
  ChunkID,
  RawStats,
  Module,
  Reason,
} from '../types/Stats';

export type ChunkNamesById = {
  [chunkId: ChunkID]: string,
};

function isImportType(reason: Reason): boolean {
  return reason.type === 'import()';
}

function wasImported(module: Module): boolean {
  return module.reasons.filter(isImportType).length > 0;
}

export default function getChunkNamesFromImportedModules(
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
