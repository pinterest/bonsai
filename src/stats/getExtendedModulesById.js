/*
 * @flow
 */

import type {ModuleID, Module, ExtendedModule} from '../types/Stats';

export type ExtendedModulesById = {[key: ModuleID]: ExtendedModule};

export default function getExtendedModulesById(
  modules: Array<Module>,
): ExtendedModulesById {
  const extendedModulesById = modules.map((module) => {
    return {
      ...module,
      requiredBy: [],
      requiredByCount: 0,
      requirements: [],
      requirementsCount: 0,
      cumulativeSize: 0,
      loops: [],
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
        const prefix = importer.identifier.split('!').shift();
        if (prefix.indexOf('promise-loader') >= 0) {
          // This is the thing that was promise-loaded. Skip it.
          return;
        }

        // record that this module is required by something within our selected chunk list
        extendedModulesById[module.id].requiredBy.push(reason);
        extendedModulesById[module.id].requiredByCount += 1;

        // record the reason as an import on $reason.moduleId
        importer.requirements.push(module);
        importer.requirementsCount += 1;
      }
    });
  });

  return extendedModulesById;
}

export function calculateModuleSizes(
  modules: ExtendedModulesById,
): ExtendedModulesById {
  const doneKeys = [];

  function getSizeOf(eModule: ExtendedModule, visitedIds: Array<ModuleID>) {
    if (doneKeys.includes(eModule.id)) {
      return eModule.cumulativeSize;
    }

    let size = eModule.size;
    eModule.requirements.forEach((rModule) => {
      if (!modules[rModule.id]) {
        // this module was removed via blacklist
        return;
      }
      if (!visitedIds.includes(rModule.id)) {
        const reModule = modules[rModule.id];
        const sizeOf = getSizeOf(reModule, visitedIds.concat(rModule.id));
        size += (sizeOf / reModule.requiredByCount);
      } else {
        eModule.loops.push(visitedIds.map((id) => modules[id]));
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
