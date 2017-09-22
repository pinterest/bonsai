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

type DiffMap = {[name: string]: ChunkDiff};

function signedInt(n: number, showNumber: boolean = true): string {
  if (n < 0) {
    return '-' + (showNumber ? String(Math.abs(n)) : '');
  } else {
    return '+' + (showNumber ? String(n) : '');
  }
}

function signedPercent(n: number): string {
  if (Math.abs(n) < 0.001) {
    return '~0.000%';
  } else {
    return signedInt(n, false) + String(Math.abs(n).toPrecision(3)) + '%';
  }
}

function filterChunkMapForChanges(diffMap: DiffMap): DiffMap {
  const changedDiffMap = {};
  const chunkCount = Object.keys(diffMap).length;
  const chunksWithChange = Object.keys(diffMap).filter(
    (chunkName) => {
      if (chunkName.startsWith('locale-')) {
        return false;
      }
      const chunk = diffMap[chunkName];
      return chunk.diff
        ? chunk.diff.sizeCount > 2000
        : false;
    }
  ).forEach((changedChunkName) => {
    changedDiffMap[changedChunkName] = diffMap[changedChunkName];
  });

  return changedDiffMap;
}

function printRemarkupSentences(
  totalChunkCount: number,
  diffMap: DiffMap,
): string {
  const chunksWithChange = Object.keys(diffMap);
  const changedMessages = chunksWithChange.map((chunkName) => {
    const chunk = diffMap[chunkName];
    const diff = chunk.diff ? chunk.diff : null;
    if (!diff) {
      return null;
    }

    return [
      '',
      chunkName,
      signedInt(diff.moduleCount),
      signedPercent(diff.modulePercent * 100),
      signedInt(diff.sizeCount),
      signedPercent(diff.sizePercent * 100),
    ].join('|');
  });

  return [
    `${totalChunkCount} chunks compared`,
    `${totalChunkCount - chunksWithChange.length} chunks without significant change`,
    `${chunksWithChange.length} changed chunks`,
    chunksWithChange.length ? '| | **Modules** | **%** | **Bytes** | **%**' : '',
    changedMessages.join("\n"),
  ].join("\n");
}

function printHTMLSentences(
  totalChunkCount: number,
  diffMap: DiffMap,
): string {
  const chunksWithChange = Object.keys(diffMap);
  const changedMessages = chunksWithChange.map((chunkName) => {
    const chunk = diffMap[chunkName];
    const diff = chunk.diff ? chunk.diff : null;
    if (!diff) {
      return null;
    }

    return '<tr><td>' + [
      chunkName,
      signedInt(diff.moduleCount),
      signedPercent(diff.modulePercent * 100),
      signedInt(diff.sizeCount),
      signedPercent(diff.sizePercent * 100),
    ].join('</td><td>') + '</td></tr>';
  });

  return [
    `<p>${totalChunkCount} chunks compared<p>`,
    `<p>${totalChunkCount - chunksWithChange.length} chunks without significant change</p>`,
    `<p>${chunksWithChange.length} changed chunks</p>`,
    chunksWithChange.length
      ? [
        '<table border="1">',
        '<tr><th></th><th>Modules</th><th>% change</th><th>Bytes</th><th>% change</th></tr>',
        changedMessages.join("\n"),
        '</table>'
      ].join("\n")
      : '',
  ].join("\n");
}

function printPlainTextSentences(
  totalChunkCount: number,
  diffMap: DiffMap,
): string {
  const chunksWithChange = Object.keys(diffMap);
  const changedMessages = chunksWithChange.map((chunkName) => {
    const chunk = diffMap[chunkName];
    const diff = chunk.diff ? chunk.diff : null;
    if (!diff) {
      return null;
    }

    return [
      chunkName,
      signedInt(diff.moduleCount),
      signedPercent(diff.modulePercent * 100),
      signedInt(diff.sizeCount),
      signedPercent(diff.sizePercent * 100),
    ].join("\t");
  });

  return [
    `${totalChunkCount} chunks compared`,
    `${totalChunkCount - chunksWithChange.length} chunks without significant change`,
    `${chunksWithChange.length} changed chunks`,
    chunksWithChange.length
      ? [
        "Module Name\t# Modules\t% change\t# Bytes\t% change",
        changedMessages.join("\n")
      ].join("\n")
      : '',
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
        const a = diffMap[chunkSize.name].a;
        if (a) {
          a.moduleCount += chunkSize.moduleCount;
          a.totalSize += chunkSize.totalSize;
        }
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

  const totalChunkCount = Object.keys(diffMap).length;
  return printHTMLSentences(
    totalChunkCount,
    filterChunkMapForChanges(diffMap),
  );
}
