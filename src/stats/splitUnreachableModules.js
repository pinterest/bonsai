/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../types/Stats';
import type {ExtendedModulesById} from './getExtendedModulesById';

export default function splitUnreachableModules(
  extendedModulesById: ExtendedModulesById,
  blacklistedModuleIds: Array<ModuleID>,
): {
  included: Array<ExtendedModule>,
  removed: Array<ExtendedModule>,
} {
  // $FlowFixMe: flow thinks `values` returns `Array<mixed>`
  const modules: Array<ExtendedModule> = Object.values(extendedModulesById);

  if (blacklistedModuleIds.length === 0) {
    return {
      included: modules,
      removed: [],
    };
  }

  const moduleIds = modules.map((module) => String(module.id));
  const _relevantReasons = (reason) => moduleIds.includes(String(reason.moduleId));

  const topLevelModules = modules.filter((module) => {
    return module.reasons.filter(_relevantReasons).length === 0;
  });

  const reachableModuleIds: Set<ModuleID> = new Set();
  const recordChildModules = (modules: Array<ExtendedModule>) => {
    modules.forEach((module) => {
      if (reachableModuleIds.has(String(module.id))) {
        return;
      }

      reachableModuleIds.add(module.id);
      recordChildModules(
        module.requirements
          .filter(
            (module) => !blacklistedModuleIds
              .map(String)
              .includes(String(module.id))
          )
          .map((module) => extendedModulesById[module.id])
      );
    });
  };

  recordChildModules(topLevelModules);

  return {
    included: modules.filter((module) => reachableModuleIds.has(module.id)),
    removed: modules.filter((module) => !reachableModuleIds.has(module.id)),
  };
}
