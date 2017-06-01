/*
 * @flow
 */

import type {RawStats, Module} from '../types/Stats';

import type {Child} from './getEntryHeirarchy';

import getModulesByChunk from './getModulesByChunk';

export default function getChunkModules(
  stats: RawStats,
  parentChunks: ?Array<Child>,
): ?Array<Module> {
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
