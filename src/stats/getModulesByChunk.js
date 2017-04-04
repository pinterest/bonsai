/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

export default function getModulesByChunk(stats: RawStats) {
  const map = {};

  stats.chunks.forEach((chunk) => {
    map[chunk.id] = {
      id: chunk.id,
      length: 0,
      modules: [],
    };
  });

  stats.modules.forEach((module) => {
    module.chunks.forEach((chunk) => {
      map[chunk].modules = map[chunk].modules.concat(module);
    });
  });

  Object.keys(map).forEach((key) => {
    map[key].length = map[key].modules.length;

    if (map[key].length === 0) {
      delete map[key];
    }
  });

  return map;
}
