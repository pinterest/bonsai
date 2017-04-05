/*
 * @flow
 */

import type {RawStats, ExtendedModule} from '../types/Stats';

import getModulesByChunk from './getModulesByChunk';
import getParentChunkIds from './getParentChunkIds';

export type ExtendedModulesById = {[key: number]: ExtendedModule};

function addModuleSizes(modules: ExtendedModulesById): ExtendedModulesById {
  const doneKeys = [];

  function getSizeOf(eModule, visitedIds) {
    if (doneKeys.includes(eModule.id)) {
      return eModule.cumulativeSize;
    }

    let size = eModule.size;
    eModule.requirements.forEach((rModule) => {
      const reModule = modules[rModule.id];
      size += (getSizeOf(reModule) / reModule.requiredByCount);
    });

    doneKeys.push(eModule.id);
    eModule.cumulativeSize = size;

    return size;
  }

  Object.keys(modules).map(Number).forEach((id) => {
    getSizeOf(modules[Number(id)], [id]);
  });

  return modules;
}

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
      requiredBy: [],
      requiredByCount: 0,
      requirements: [],
      cumulativeSize: 0,
    };
  }).reduce((map, module) => {
    map[module.id] = module;
    return map;
  }, {});

  modules.forEach((module) => {
    module.reasons.forEach((reason) => {
      // this module was added becuase $reason.

      if (extendedModulesById[reason.moduleId]) {
        // record that this module is required by something within our selected chunk list
        extendedModulesById[module.id].requiredBy.push(reason);
        extendedModulesById[module.id].requiredByCount += 1;

        // record the reason as an import on $reason.moduleId
        extendedModulesById[reason.moduleId].requirements.push(module);
      }
    });
  });

  return addModuleSizes(extendedModulesById);
}


