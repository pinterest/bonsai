/**
 * @flow
 */

import type {
  ExtendedModule,
} from '../types/Stats';
import type { ExtendedModulesById } from './getModulesById';

export default function getCollapsableParentOf(
  modulesById: ExtendedModulesById,
  module: ExtendedModule,
): ?ExtendedModule {
  const requiredByCount = module.requiredBy.length;
  if (requiredByCount === 0) {
    return null;
  } else if (requiredByCount === 1) {
    const eModule = modulesById[module.requiredBy[0].moduleId];
    return eModule
      ? getCollapsableParentOf(modulesById, eModule)
      : null;
  } else {
    const requirementCount = module.requirements.length;
    if (requirementCount === 0) {
      return null;
    } else {
      return module;
    }
  }
}
