/*
 * @flow
 */

import type {ChunkID, RawStats, Module} from '../types/Stats';

import getModulesByChunk from './getModulesByChunk';
import getParentChunks from './getParentChunks';

export default function getChunkModules(
  stats: RawStats,
  selectedChunkId: ChunkID,
): ?Array<Module> {
  const parentChunks = getParentChunks(stats, selectedChunkId);
  if (!parentChunks) {
    return null;
  }

  const modulesByChunk = getModulesByChunk(
    stats,
    parentChunks.map((chunk) => chunk.id),
  );

  return parentChunks.reduce(
    (modules, chunk) => modules.concat(modulesByChunk[chunk.id].modules),
    [],
  );
}
