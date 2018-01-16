/*
 * @flow
 */

import type {Asset, Chunk, RawStats} from '../types/Stats';

function getAssetsForChunk(
  stats: RawStats,
  chunk: Chunk,
): Array<Asset> {
  return chunk.files.map((fileName) =>
    (stats.assets || []).filter((asset) =>
      asset.name === fileName
    ).pop()
  );
}

function getAssetName(assets: Array<Asset>): string {
  return assets.slice(0, 1).pop().name;
}

export default function getEntryChunks(stats: RawStats) {
  return stats.chunks.map((chunk) => {
    const assets = getAssetsForChunk(stats, chunk);
    return {
      ...chunk,
      name: getAssetName(assets),
      assets: assets,
    };
  });
  // .filter(
  //   chunk => chunk.names.length
  // );
}
