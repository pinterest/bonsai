/**
 * @flow
 */

import type {ChunkID, ModuleID, RawStats} from '../types/Stats';
import type {FullModuleDataType} from '../stats/fullModuleData';
import type {
  FilterableFields,
  FilterProps,
} from '../stats/filterModules';
import type { SortableFields, SortProps } from '../stats/sortModules';

import getEntryChunks from '../stats/getEntryChunks';
import fullModuleData from '../stats/fullModuleData';
import getCollapsableParentOf from '../stats/getCollapsableParentOf';
import getModulesById from '../stats/getModulesById';
import withTimings from './withTimings';

export type Action =
  | {
    type: 'discoveredDataPaths',
    paths: Array<string>,
  }
  | {
    type: 'pickDataPath',
    path: string,
  }
  | {
    type: 'requestedDataAtPath',
    path: string,
  }
  | {
    type: 'loadedStatsAtPath',
    path: string,
    children: Array<RawStats>,
  }
  | {
    type: 'erroredAtPath',
    path: string,
    error: Error | string,
  }
  | {
    type: 'onSorted',
    field: SortableFields,
  }
  | {
    type: 'onFiltered',
    changes: {[key: FilterableFields]: string},
  }
  | {
    type: 'onPickedChild',
    childIndex: number,
  }
  | {
    type: 'onPickedChunk',
    chunkId: ChunkID,
  }
  | {
    type: 'onRemoveModule',
    moduleID: ModuleID,
  }
  | {
    type: 'onIncludeModule',
    moduleID: ModuleID,
  }
  | {
    type: 'changeExpandRecordsMode',
    mode: 'manual' | 'expand-all' | 'collapse-all',
  }
  | {
    type: 'onExpandRecords',
    moduleID: ModuleID,
  }
  | {
    type: 'onCollapseRecords',
    moduleID: ModuleID,
  }
  | {
    type: 'onFocusChanged',
    elementID: ?string,
  }
  ;

type DataPathState = 'unknown' | 'loading' | 'error' | 'ready';
export type State = {
  dataPaths: {[path: string]: DataPathState},
  selectedFilename: ?string,
  selectedChildIndex: ?number,
  selectedChunkId: ?ChunkID,
  blacklistedModuleIds: Array<ModuleID>,
  jsonChildren: {[filename: string]: Array<RawStats>},
  sort: SortProps,
  filters: FilterProps,
  expandMode: 'manual' | 'expand-all' | 'collapse-all',
  expandedRecords: Set<ModuleID>,
  currentlyFocusedElementID: ?string,
  calculatedFullModuleData: ?FullModuleDataType,
};

export type Dispatch = (action: Action) => any;

export const INITIAL_STATE: State = {
  dataPaths: {},
  selectedFilename: null,
  selectedChildIndex: null,
  selectedChunkId: null,
  blacklistedModuleIds: [],
  jsonChildren: {},
  sort: {
    field: 'cumulativeSize',
    direction: 'DESC',
  },
  filters: {
    moduleName: '',
    cumulativeSizeMin: '',
    cumulativeSizeMax: '',
    requiredByCountMin: '',
    requiredByCountMax: '',
    requirementsCountMin: '',
    requirementsCountMax: '',
  },
  expandMode: 'collapse-all',
  expandedRecords: new Set(),
  currentlyFocusedElementID: null,
  calculatedFullModuleData: null,
};

function getDefaultChildIndex(children: Array<RawStats>): ?number {
  return children.length === 1
    ? 0
    : null;
}

function getDefaultChunkId(
  children: Array<RawStats>,
  childIndex: ?number,
): ?ChunkID {
  if (
    childIndex === null || childIndex === undefined ||
    !children[childIndex]
  ) {
    return null;
  }
  const entryChunks = getEntryChunks(children[childIndex]);
  return entryChunks.length === 1
    ? entryChunks[0].id
    : null;
}

function handleAction(
  state: State,
  action: Action,
): State {
  switch(action.type) {
    case 'discoveredDataPaths':
      return {
        ...state,
        dataPaths: {
          ...action.paths.reduce((map, path) => {
            map[path] = map[path] || 'unknown';
            return map;
          }, {}),
          ...state.dataPaths,
        },
      };
    case 'pickDataPath': {
      const childIndex = getDefaultChildIndex(state.jsonChildren[action.path] || []);
      return {
        ...state,
        dataPaths: {
          [action.path]: state.dataPaths[action.path] || 'unknown',
          ...state.dataPaths,
        },
        selectedFilename: action.path,
        selectedChildIndex: childIndex,
        selectedChunkId: getDefaultChunkId(
          state.jsonChildren[action.path] || [],
          childIndex,
        ),
        blacklistedModuleIds: [],
        expandMode: 'collapse-all',
        expandedRecords: new Set(),
        currentlyFocusedElementID: null,
      };
    }
    case 'requestedDataAtPath':
      return {
        ...state,
        dataPaths: {
          ...state.dataPaths,
          [action.path]: state.dataPaths[action.path] === 'ready'
            ? 'ready'
            : 'loading',
        },
      };
    case 'loadedStatsAtPath': {
      const childIndex = getDefaultChildIndex(action.children);
      return {
        ...state,
        dataPaths: {
          ...state.dataPaths,
          [action.path]: 'ready',
        },
        jsonChildren: {
          ...state.jsonChildren,
          [action.path]: action.children,
        },
        selectedChildIndex: childIndex,
        selectedChunkId: getDefaultChunkId(action.children, childIndex),
      };
    }
    case 'erroredAtPath':
      return {
        ...state,
        dataPaths: {
          ...state.dataPaths,
          [action.path]: 'error',
        },
      };
    case 'onSorted': {
      const isSameField = state.sort.field === action.field;
      const invertedDir = state.sort.direction === 'ASC' ? 'DESC': 'ASC';
      const nextDirection = isSameField ? invertedDir : 'DESC';
      return {
        ...state,
        sort: {
          field: action.field,
          direction: nextDirection,
        },
      };
    }
    case 'onFiltered':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.changes,
        },
      };
    case 'onPickedChild':
      return {
        ...state,
        selectedChildIndex: action.childIndex,
        selectedChunkId: getDefaultChunkId(
          (state.jsonChildren && state.jsonChildren[String(state.selectedFilename)]) || [],
          action.childIndex
        ),
        blacklistedModuleIds: [],
        expandMode: 'collapse-all',
        expandedRecords: new Set(),
        currentlyFocusedElementID: null,
      };
    case 'onPickedChunk':
      return {
        ...state,
        selectedChunkId: String(action.chunkId),
        blacklistedModuleIds: [],
        expandMode: 'collapse-all',
        expandedRecords: new Set(),
        currentlyFocusedElementID: null,
      };
    case 'onRemoveModule':
      return {
        ...state,
        blacklistedModuleIds: [
          ...state.blacklistedModuleIds,
          action.moduleID,
        ],
      };
    case 'onIncludeModule': {
      const moduleID = action.moduleID;
      return {
        ...state,
        blacklistedModuleIds: state.blacklistedModuleIds.filter(
          (id) => String(id) !== String(moduleID),
        ),
      };
    }
    case 'changeExpandRecordsMode':
      return {
        ...state,
        expandMode: action.mode,
      };
    case 'onExpandRecords':
      return {
        ...state,
        expandMode: 'manual',
        expandedRecords: new Set(state.expandedRecords.add(action.moduleID)),
      };
    case 'onCollapseRecords': {
      const expandedRecords = new Set(state.expandedRecords);
      expandedRecords.delete(action.moduleID);
      return {
        ...state,
        expandMode: state.expandedRecords.size === 0
          ? 'collapse-all'
          : 'manual',
        expandedRecords: expandedRecords,
      };
    }
    case 'onFocusChanged': {
      if (
        action.elementID &&
        state.calculatedFullModuleData &&
        state.calculatedFullModuleData.extendedModules
      ) {
        const moduleId = action.elementID;
        const modulesById = getModulesById(state.calculatedFullModuleData.extendedModules);
        const collapseableParent = getCollapsableParentOf(
          modulesById,
          moduleId,
        );
        return {
          ...state,
          expandMode: collapseableParent
            ? 'manual'
            : state.expandMode,
          expandedRecords: collapseableParent
            ? new Set(state.expandedRecords.add(collapseableParent.id))
            : state.expandedRecords,
          currentlyFocusedElementID: action.elementID,
        };
      } else {
        return {
          ...state,
          currentlyFocusedElementID: action.elementID,
        };
      }
    }
    default:
      return state;
  }
}

function calculateFullModuleData(
  oldState: State,
  newState: State,
): State {
  if (
    !newState.jsonChildren ||
    !newState.selectedFilename ||
    newState.selectedChildIndex === null || newState.selectedChildIndex === undefined ||
    !newState.jsonChildren[newState.selectedFilename] ||
    !newState.jsonChildren[newState.selectedFilename][newState.selectedChildIndex]
  ) {
    return {
      ...newState,
      calculatedFullModuleData: null,
    };
  }

  if (
    oldState.jsonChildren === newState.jsonChildren &&
    oldState.selectedFilename === newState.selectedFilename &&
    oldState.selectedChildIndex === newState.selectedChildIndex &&
    oldState.selectedChunkId === newState.selectedChunkId &&
    oldState.blacklistedModuleIds === newState.blacklistedModuleIds
  ) {
    return newState;
  }

  return {
    ...newState,
    calculatedFullModuleData: fullModuleData(
      newState.jsonChildren[newState.selectedFilename][newState.selectedChildIndex],
      newState.selectedChunkId,
      newState.blacklistedModuleIds,
    ),
  };
}

export default function reducer(
  state: State = INITIAL_STATE,
  action: Action,
): State {
  return withTimings('Reducer', action.type)(() =>
    calculateFullModuleData(
      state,
      handleAction(state, action)
    )
  );
}
