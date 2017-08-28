/**
 * @flow
 */

import type { ChunkSize } from './chunkSizes';

import invariant from 'invariant';

type ChunkDiff = {
  name: string,
  a: ?ChunkSize,
  b: ?ChunkSize,
  diff: ?{
    moduleCount: number,
    modulePercent: number,
    sizeCount: number,
    sizePercent: number,
  },
};

export default function chunkSizesDiff(
  a: Array<Array<ChunkSize>>,
  b: Array<Array<ChunkSize>>,
) {
  const diffMap: {[name: string]: ChunkDiff} = {};

  a.forEach((file) => {
    file.forEach((chunkSize) => {
      if (!diffMap[chunkSize.name]) {
        diffMap[chunkSize.name] = {
          name: chunkSize.name,
          a: chunkSize,
          b: null,
          diff: null,
        };
      } else {
        invariant('we have the same chunk twice?');
      }
    });
  });

  b.forEach((file) => {
    file.forEach((chunkSize) => {
      if (!diffMap[chunkSize.name]) {
        diffMap[chunkSize.name] = {
          name: chunkSize.name,
          a: null,
          b: null,
          diff: null,
        };
      } else {
        diffMap[chunkSize.name].b = chunkSize;
      }
    });
  });

  Object.keys(diffMap).forEach((name) => {
    const chunkDiff = diffMap[name];
    const a = chunkDiff.a || { moduleCount: 0, totalSize: 0 };
    const b = chunkDiff.b || { moduleCount: 0, totalSize: 0 };

    chunkDiff.diff = {
      moduleCount: b.moduleCount - a.moduleCount,
      modulePercent: (b.moduleCount - a.moduleCount) / a.moduleCount,
      sizeCount: b.totalSize - a.totalSize,
      sizePercent: (b.totalSize - a.totalSize) / a.totalSize,
    };
  });

  return diffMap;

}
