/*
 * @flow
 */

import type {RawStats, ExtendedModule} from '../types/Stats';

import getModulesByChunk from './getModulesByChunk';
import getParentChunkIds from './getParentChunkIds';

export type ExtendedModulesById = {[key: number]: ExtendedModule};

export default function getExtendedModulesById(
  stats: RawStats,
  selectedChunkId: number,
): ?ExtendedModulesById {
  const parentChunkIds = getParentChunkIds(
    stats,
    selectedChunkId
  );
  if (!parentChunkIds) {
    return null;
  }

  const modulesByChunk = getModulesByChunk(stats);

  const modules = parentChunkIds.reduce((modules, chunkId) => {
    return modules.concat(modulesByChunk[chunkId].modules);
  }, []);

  const extendedModulesById = modules.map((module) => {
    return {
      ...module,
      requirements: [],
    };
  }).reduce((map, module) => {
    map[module.id] = module;
    return map;
  }, {});

  modules.forEach((module) => {
    module.reasons.forEach((reason) => {
      // this module was added becuase $reason.
      // record the reason as an import on $reason.moduleId
      if (extendedModulesById[reason.moduleId]) {
        extendedModulesById[reason.moduleId].requirements.push(module);
      }
    });
  });

  return extendedModulesById;
}


