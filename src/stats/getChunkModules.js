/*
 * @flow
 */

import type {RawStats, Module} from '../types/Stats';

import getModulesByChunk from './getModulesByChunk';
import getParentChunkIds from './getParentChunkIds';

export default function getChunkModules(
  stats: RawStats,
  selectedChunkId: number,
): ?Array<Module> {
  const parentChunkIds = getParentChunkIds(stats, selectedChunkId);
  if (!parentChunkIds) {
    return null;
  }

  const modulesByChunk = getModulesByChunk(stats);

  return parentChunkIds.reduce(
    (modules, chunkId) => modules.concat(modulesByChunk[chunkId].modules),
    [],
  );
}
