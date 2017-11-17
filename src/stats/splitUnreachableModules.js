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

  const stringyModuleIds = modules.map((module) => String(module.id));
  const stringyBlackListedIds = blacklistedModuleIds.map(String);

  const _relevantReasons = (reason) =>
    stringyModuleIds.includes(String(reason.moduleId));

  const reachableModuleIds = modules
    .filter((module) =>
      !stringyBlackListedIds.includes(String(module.id)) &&
      module.reasons.filter(_relevantReasons).length === 0
    )
    .map((module) => module.id);

  const _includableModule = (module) =>
    !stringyBlackListedIds.includes(String(module.id));

  const push = (module) => {
    if (reachableModuleIds.includes(module.id)) {
      return;
    }
    reachableModuleIds.push(module.id);
  };

  let i = 0;
  while (i < reachableModuleIds.length) {
    const moduleId = reachableModuleIds[i];
    const module = extendedModulesById[moduleId];

    module.requirements
      .filter(_includableModule)
      .map(push);

    i += 1;
  }

  return {
    included: modules.filter((module) => reachableModuleIds.includes(module.id)),
    removed: modules.filter((module) => !reachableModuleIds.includes(module.id)),
  };
}
