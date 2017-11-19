/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../types/Stats';

export default function getModulesById(
  modules: Array<ExtendedModule>,
): {[key: ModuleID]: ExtendedModule} {
  const modulesById = {};
  modules.forEach((module) => {
    modulesById[module.id] = module;
  });
  return modulesById;
}
