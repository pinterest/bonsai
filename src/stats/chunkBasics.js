/**
 * @flow
 */

import type {Chunk, RawStats} from '../types/Stats';

function not(pred) {
  return function(x) {
    return !pred(x);
  };
}

function isEntry(chunk: Chunk) {
  return chunk.entry;
}

function endsWithJs(str) {
  str.endsWith('.js');
}

export default function chunkBasics(filename: string, stat: RawStats) {
  const entry = stat.chunks.filter(isEntry).map((chunk) => {
    const {
      id,
      rendered, // always true?
      initial, // always true?
      entry, // grouped by this
      extraAsync, // no example of this?
      size,
      name, // always empty?
      names,
      files,
      hash, // not interesting
      parents,
      modules,
      filteredModules,
      origins,
    } = chunk;
    return {
      id,
      size,
      name: name || names[0] || null,
      jsFile: files.filter(not(endsWithJs))[0] || null,
      filesCount: files.length,
      // parents,
      // origins,
    };
  });
  const notEntry = stat.chunks.filter(not(isEntry)).map((chunk) => {
    const {
      id,
      rendered, // always true?
      initial, // always true?
      entry, // grouped by this
      extraAsync, // no example of this?
      size,
      name, // empty?
      names,
      files,
      hash, // not interesting
      parents,
      modules,
      filteredModules,
      origins,
    } = chunk;
    return {
      id,
      size,
      name: name || names[0] || null,
      jsFile: files.filter(not(endsWithJs))[0] || null,
      parentsCount: parents.length,
      modulesCount: modules.length,
      filteredModulesCount: filteredModules.length,
      originsCount: origins.length,
      // parents,
      // modules,
      // filteredModules,
      // origins,

    };
  });

  return {
    filename,
    config: {
      hash: stat.hash,
      time: stat.time,
      builtAt: stat.builtAt,
      publicPath: stat.publicPath,
      outputPath: stat.outputPath,
    },
    entryChunkCount: entry.length,
    chunkCount: notEntry.length,
    entryChunks: entry,
    chunks: notEntry,
  };
}
