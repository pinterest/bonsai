/*
 * @flow
 */

import type {
  ChunkID,
  ExtendedModule,
  ModuleID,
  RawStats,
} from '../types/Stats';

import type {Child} from './getEntryHierarchy';

import getChunkModules from './getChunkModules';
import getEntryHierarchy from './getEntryHierarchy';
import getExtendedModulesById, {calculateModuleSizes} from './getExtendedModulesById';
import getModulesById from './getModulesById';
import getParentChunks from './getParentChunks';
import splitUnreachableModules from './splitUnreachableModules';

export type FullModuleDataType = {
  moduleData: ?{
    included: Array<ExtendedModule>,
    removed: Array<ExtendedModule>,
  },
  extendedModules: Array<ExtendedModule>,
  chunksByParent: Array<Child>,
  parentChunks: ?Array<Child>,
};

export default function fullModuleData(
  stats: RawStats,
  selectedChunkId: ?ChunkID,
  blacklistedModuleIds: Array<ModuleID>,
): FullModuleDataType {
  const chunksByParent = getEntryHierarchy(stats);

  if (selectedChunkId === null || selectedChunkId === undefined) {
    return {
      moduleData: null,
      extendedModules: [],
      chunksByParent: chunksByParent.children,
      parentChunks: null,
    };
  }

  const parentChunks = getParentChunks(
    chunksByParent,
    selectedChunkId,
  );
  const modules = getChunkModules(
    stats,
    parentChunks,
  );

  if (!modules) {
    return {
      moduleData: null,
      extendedModules: [],
      chunksByParent: chunksByParent.children,
      parentChunks: parentChunks,
    };
  }

  const extendedModulesById = getExtendedModulesById(modules);

  if (!extendedModulesById) {
    return {
      moduleData: null,
      extendedModules: [],
      chunksByParent: chunksByParent.children,
      parentChunks: parentChunks,
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
    chunksByParent: chunksByParent.children,
    parentChunks: parentChunks,
  };
}
