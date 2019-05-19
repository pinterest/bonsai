/**
 * @flow
 */

import type {RawStats} from '../types/Stats';

function jsAsset(asset) {
  return asset.name.endsWith('.js');
}

function withChunks(asset) {
  return asset.chunks.length > 0;
}

export default function assetBasics(filename: string, stat: RawStats) {
  const chunksById = stat.chunks.reduce((byId, chunk) => {
    byId[chunk.id] = chunk;
    return byId;
  }, {});

  return {
    filename,
    config: {
      hash: stat.hash,
      time: stat.time,
      builtAt: stat.builtAt,
      publicPath: stat.publicPath,
      outputPath: stat.outputPath,
    },
    assets: stat.assets.filter(jsAsset).filter(withChunks).map((asset) => {
      const chunkIds = [];
      const chunkSiblings = new Set();
      const chunkParents = new Set();
      const chunkChildren = new Set();
      let moduleCount = 0;
      let uncompressedSize = 0;
      let compressedSize = asset.size;

      asset.chunks.forEach((chunkId) => {
        const chunk = chunksById[chunkId];
        chunkIds.push(chunk.id);
        (chunk.siblings || []).forEach((sibling) => {
          chunkSiblings.add(sibling);
        });
        (chunk.parents || []).forEach((parent) => {
          chunkParents.add(parent);
        });
        (chunk.children || []).forEach((child) => {
          chunkChildren.add(child);
        });

        moduleCount += chunk.modules.length;
        uncompressedSize += chunk.modules.reduce((sum, module) => sum + module.size, 0);
      });

      const compression = moduleCount
        ? compressedSize / uncompressedSize
        : 0;

      return {
        name: asset.name,
        chunkCount: asset.chunks.length,
        chunkName: asset.chunkNames[0] || null,
        chunkIds,
        chunkParents,
        chunkSiblings,
        chunkChildren,
        moduleCount,
        compressedSize,
        uncompressedSize,
        compression,
      };
    })
  };
}
