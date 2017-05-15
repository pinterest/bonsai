/*
 * @flow
 */

import type {RawStats, Module} from '../types/Stats';

import getModulesByChunk from './getModulesByChunk';
import getParentChunks from './getParentChunks';

export default function getChunkModules(
  stats: RawStats,
  selectedChunkId: number,
): ?Array<Module> {
  const parentChunks = getParentChunks(stats, selectedChunkId);
  if (!parentChunks) {
    return null;
  }

  const modulesByChunk = getModulesByChunk(stats);

  return parentChunks.reduce(
    (modules, chunk) => modules.concat(modulesByChunk[chunk.id].modules),
    [],
  );
}
