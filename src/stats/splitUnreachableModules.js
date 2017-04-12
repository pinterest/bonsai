/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../types/Stats';
import type {ExtendedModulesById} from './getExtendedModulesById';

import getModulesById from './getModulesById';

export default function splitUnreachableModules(
  extendedModulesById: ExtendedModulesById,
  blacklistedModuleIds: Array<ModuleID>,
): {
  included: ExtendedModulesById,
  removed: ExtendedModulesById,
} {
  if (blacklistedModuleIds.length === 0) {
    return {
      included: extendedModulesById,
      removed: {},
    };
  }

  // $FlowFixMe: flow thinks `values` returns `Array<mixed>`
  const modules: Array<ExtendedModule> = Object.values(extendedModulesById);
  const moduleIds = modules.map((module) => module.id);
  const _relevantReasons = (reason) => moduleIds.includes(reason.moduleId);

  const topLevelModules = modules.filter((module) => {
    return module.reasons.filter(_relevantReasons).length === 0;
  });

  const reachableModuleIds: Set<ModuleID> = new Set();
  const recordChildModules = (modules: Array<ExtendedModule>) => {
    modules.forEach((module) => {
      if (reachableModuleIds.has(module.id)) {
        return;
      }

      reachableModuleIds.add(module.id);
      recordChildModules(
        module.requirements
          .filter((module) => !blacklistedModuleIds.includes(module.id))
          .map((module) => extendedModulesById[module.id])
      );
    });
  };

  recordChildModules(topLevelModules);

  return {
    included: getModulesById(
      modules.filter((module) => reachableModuleIds.has(module.id))
    ),
    removed: getModulesById(
      modules.filter((module) => !reachableModuleIds.has(module.id))
    ),
  };
}
