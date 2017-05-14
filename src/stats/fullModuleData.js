/*
 * @flow
 */

import type {
  ExtendedModule,
  ModuleID,
  RawStats,
} from '../types/Stats';

import getChunkModules from './getChunkModules';
import getExtendedModulesById, {calculateModuleSizes} from './getExtendedModulesById';
import getModulesById from './getModulesById';
import splitUnreachableModules from './splitUnreachableModules';

export default function fullModuleData(
  stats: RawStats,
  selectedChunkId: ?number,
  blacklistedModuleIds: Array<ModuleID>,
): {
  moduleData: ?{
    included: Array<ExtendedModule>,
    removed: Array<ExtendedModule>,
  },
  extendedModules: Array<ExtendedModule>,
} {
  if (selectedChunkId === null || selectedChunkId === undefined) {
    return {
      moduleData: null,
      extendedModules: [],
    };
  }

  const modules = getChunkModules(
    stats,
    selectedChunkId,
  );

  if (!modules) {
    return {
      moduleData: null,
      extendedModules: [],
    };
  }

  const extendedModulesById = getExtendedModulesById(modules);

  if (!extendedModulesById) {
    return {
      moduleData: null,
      extendedModules: [],
    };
  }

  const splitModules = splitUnreachableModules(
    extendedModulesById,
    blacklistedModuleIds,
  );

  // $FlowFixMe: flow thinks `values()` returns an `Array<mixed>` here
  const extendedModules: Array<ExtendedModule> = splitModules
    ? Object.values(calculateModuleSizes(getModulesById(splitModules.included)))
    : [];

  return {
    moduleData: splitModules,
    extendedModules: extendedModules,
  };
}
