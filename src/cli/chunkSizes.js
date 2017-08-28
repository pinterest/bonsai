/**
 * @flow
 */

import type { ChunkID } from '../types/Stats';

import fs from 'fs';
import getChunkModules from '../stats/getChunkModules';
import getChunkName from '../stats/getChunkName';
import getChunkNamesFromImportedModules from '../stats/getChunkNamesFromImportedModules';
import getEntryHeirarchy from '../stats/getEntryHeirarchy';
import getParentChunks from '../stats/getParentChunks';
import getRawStats from '../types/getRawStatsFiles';
import invariant from 'invariant';

export type ChunkSize = {
  id: ChunkID,
  name: string,
  moduleCount: number,
  totalSize: number,
};

export default function chunkSizes(
  statsFilePath: string,
): Array<Array<ChunkSize>> {
  const data = JSON.parse(
    fs.readFileSync(statsFilePath, {encoding: 'utf8'})
  );

  const rawStats = getRawStats(statsFilePath, data);
  return Object.keys(rawStats).map((filename) => {
    const stats = rawStats[filename];

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
