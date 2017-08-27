/**
 * @flow
 */

import fs from 'fs';
import getChunkModules from '../stats/getChunkModules';
import getChunkName from '../stats/getChunkName';
import getChunkNamesFromImportedModules from '../stats/getChunkNamesFromImportedModules';
import getEntryHeirarchy from '../stats/getEntryHeirarchy';
import getParentChunks from '../stats/getParentChunks';
import invariant from 'invariant';

export default function chunkSize(statsFilePath: string): void {
  const stats = JSON.parse(
    fs.readFileSync(statsFilePath, {encoding: 'utf8'})
  );

  const chunksByParent = getEntryHeirarchy(stats);
  const importedChunkNames = getChunkNamesFromImportedModules(stats);

  const chunkSizes = stats.chunks.map((chunk) => {
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
      modules: modules.length,
      size: size,
    };
  });

  console.log(chunkSizes); // eslint-disable-line no-console
}
