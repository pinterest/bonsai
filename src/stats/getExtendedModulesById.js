/*
 * @flow
 */

import type {ModuleID, RawStats, ExtendedModule} from '../types/Stats';

import getModulesByChunk from './getModulesByChunk';
import getParentChunkIds from './getParentChunkIds';

export type ExtendedModulesById = {[key: ModuleID]: ExtendedModule};

function addModuleSizes(modules: ExtendedModulesById): ExtendedModulesById {
  const doneKeys = [];

  function getSizeOf(eModule, visitedIds) {
    if (doneKeys.includes(eModule.id)) {
      return eModule.cumulativeSize;
    }

    let size = eModule.size;
    eModule.requirements.forEach((rModule) => {
      if (visitedIds.includes(rModule.id)) {
        console.log(
          'circular dependency on',
          rModule.id,
          visitedIds.map((id) => modules[id])
        );
      } else {
        const reModule = modules[rModule.id];
        const sizeOf = getSizeOf(reModule, visitedIds.concat(rModule.id));
        size += (sizeOf / reModule.requiredByCount);
      }
    });

    doneKeys.push(eModule.id);
    eModule.cumulativeSize = size;

    return size;
  }

  Object.keys(modules).forEach((id) => {
    getSizeOf(modules[id], [id]);
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
      // this module was added becuase `reason`.

      const importer = extendedModulesById[reason.moduleId];
      if (importer) {
        if (importer.identifier.split('!').shift().indexOf('promise-loader') >= 0) {
          // this is required by a promise-loaded thing. This is probably the thing that was loaded. Skip it.
          return;
        }

        // record that this module is required by something within our selected chunk list
        extendedModulesById[module.id].requiredBy.push(reason);
        extendedModulesById[module.id].requiredByCount += 1;

        // record the reason as an import on $reason.moduleId
        importer.requirements.push(module);
      }
    });
  });

  return addModuleSizes(extendedModulesById);
}


