/*
 * @flow
 */

import type {
  ExtendedModule,
  ModuleID,
  RawStats,
} from '../types/Stats';

import type {Child} from './getEntryHeirarchy';

import getChunkModules from './getChunkModules';
import getEntryHeirarchy from './getEntryHeirarchy';
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
  chunksByParent: Array<Child>,
} {
  if (selectedChunkId === null || selectedChunkId === undefined) {
    return {
      moduleData: null,
      extendedModules: [],
      chunksByParent: [],
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
      chunksByParent: [],
    };
  }

  const extendedModulesById = getExtendedModulesById(modules);

  if (!extendedModulesById) {
    return {
      moduleData: null,
      extendedModules: [],
      chunksByParent: [],
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
    chunksByParent: getEntryHeirarchy(stats).children,
  };
}
