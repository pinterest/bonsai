/*
 * @flow
 */

import type { ChunkNamesById } from './getChunkNamesFromImportedModules';
import type { Chunk } from '../types/Stats';

export default function getChunkName(
  chunk: Chunk,
  importedChunkNames: ChunkNamesById,
) {
  return (
    chunk.names.join(', ') ||
    (importedChunkNames[chunk.id]
      ? `import('${importedChunkNames[chunk.id]}')`
      : null) ||
    chunk.origins.map((origin) => origin.moduleName).join(', ')
  );
}
