/**
 * @flow
 */

import type { ChunkID, RawStats } from '../types/Stats';

import getChunkModules from './getChunkModules';
import getChunkName from './getChunkName';
import getChunkNamesFromImportedModules from './getChunkNamesFromImportedModules';
import getEntryHeirarchy from './getEntryHeirarchy';
import getParentChunks from './getParentChunks';
import invariant from 'invariant';

export type ChunkSize = {
  id: ChunkID,
  name: string,
  moduleCount: number,
  totalSize: number,
};

export default function chunkSizes(
  rawStats: Array<RawStats>,
): Array<Array<ChunkSize>> {
  return rawStats.map((stats) => {
    const chunksByParent = getEntryHeirarchy(stats);
    const importedChunkNames = getChunkNamesFromImportedModules(stats);

    return stats.chunks.map((chunk) => {
      const parentChunks = getParentChunks(
        chunksByParent,
        chunk.id,
      );

      const modules = getChunkModules(
        stats,
        parentChunks,
      );

      invariant(modules, 'for flow');

      const size = modules.reduce((sum, module) => {
        return sum + module.size;
      }, 0);

      return {
        id: chunk.id,
        name: getChunkName(chunk, importedChunkNames),
        moduleCount: modules.length,
        totalSize: size,
      };
    });
  });
}
