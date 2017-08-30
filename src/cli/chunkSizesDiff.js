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

function signedInt(n: number, showNumber: boolean = true): string {
  if (n < 0) {
    return '-' + (showNumber ? String(Math.abs(n)) : '');
  } else {
    return '+' + (showNumber ? String(n) : '');
  }
}

function signedPercent(n: number): string {
  if (n < 0.001) {
    return '~0.000%';
  } else {
    return signedInt(n, false) + String(Math.abs(n).toPrecision(3)) + '%';
  }
}

function printSentences(diffMap: {[name: string]: ChunkDiff}): string {
  const chunkCount = Object.keys(diffMap).length;
  const chunksWithChange = Object.keys(diffMap).filter(
    (chunkName) => {
      const chunk = diffMap[chunkName];
      return chunk.diff
        ? chunk.diff.moduleCount || (chunk.diff.sizePercent * 100) >= 0.001
        : false;
    }
  );

  const changedMessages = chunksWithChange.map((chunkName) => {
    const chunk = diffMap[chunkName];
    const diff = chunk.diff ? chunk.diff : null;
    if (!diff) {
      return null;
    }

    const modules = [
      'Module Count',
      signedInt(diff.moduleCount),
      `(${signedPercent(diff.modulePercent * 100)})`
    ].join("\t");
    const size = [
      'Raw Filesize',
      signedInt(diff.sizeCount),
      `(${signedPercent(diff.sizePercent * 100)})`,
    ].join("\t");

    return `**${chunkName}**\n    ${modules}\n    ${size}`;
  });

  return [
    `${chunkCount} chunks compared`,
    `${chunkCount - chunksWithChange.length} chunks without significant change`,
    `${chunksWithChange.length} changed chunks`,
    changedMessages.join("\n"),
  ].join("\n");
}

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

  return printSentences(diffMap);
}
