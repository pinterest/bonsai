/*
 * @flow
 */

import type {ModuleID, Module} from '../types/Stats';

export type ModulesById = {[key: ModuleID]: Module};

export default function getModulesById(modules: Array<Module>): ModulesById {
  const modulesById = {};
  modules.forEach((module) => {
    modulesById[module.id] = module;
  });
  return modulesById;
}
