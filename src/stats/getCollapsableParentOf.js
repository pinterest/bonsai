/**
 * @flow
 */

import type {
  ModuleID,
  ExtendedModule,
} from '../types/Stats';
import type { ExtendedModulesById } from './getExtendedModulesById';

export default function getCollapsableParentOf(
  modulesById: ExtendedModulesById,
  moduleId: ModuleID,
): ?ExtendedModule {
  const module = modulesById[moduleId];
  if (!module) {
    return null;
  }
  const requiredByCount = module.requiredBy.length;
  if (requiredByCount === 0) {
    return null;
  } else if (requiredByCount === 1) {
    return getCollapsableParentOf(modulesById, module.requiredBy[0].moduleId);
  } else {
    const requirementCount = module.requirements.length;
    if (requirementCount === 0) {
      return null;
    } else {
      return module;
    }
  }
}
