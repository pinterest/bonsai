/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

export default function getModulesByChunk(stats: RawStats) {
  return stats.modules.reduce(
    (map, module) => {
      module.chunks.forEach(
        (chunk) => {
          map[chunk] = (map[chunk] || {
            id: chunk,
            length: 0,
            modules: [],
          });
          map[chunk].modules.push(module);
          map[chunk].length = map[chunk].modules.length;
        }
      );
      return map;
    },
    {}
  );
}
