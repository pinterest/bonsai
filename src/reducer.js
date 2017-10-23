/**
 * @flow
 */

import type {ChunkID, ModuleID, RawStats} from './types/Stats';
import type {FullModuleDataType} from './stats/fullModuleData';
import type {
  FilterableFields,
  FilterProps,
} from './stats/filterModules';
import type { SortableFields, SortProps } from './stats/sortModules';

import fullModuleData from './stats/fullModuleData';
import getCollapsableParentOf from './stats/getCollapsableParentOf';
import getModulesById from './stats/getModulesById';

export type ModeType = 'single' | 'diff';

export type Action =
  | {
    type: 'onChangedMode',
    appMode: ModeType,
  }
  | {
    type: 'initDataPaths',
    paths: Array<string>,
  }
  | {
    type: 'pickedFile',
    filename: ?string,
    position: 'A' | 'B',
  }
  | {
    type: 'loadingFailed',
  }
  | {
    type: 'loadingFinished',
    filename: string,
    stats: RawStats,
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

export type State = {
  appMode: ModeType,
  dataPaths: Array<string>,
  selectedFilenameA: ?string,
  selectedChunkIdA: ?ChunkID,
  selectedFilenameB: ?string,
  selectedChunkIdB: ?ChunkID,
  blacklistedModuleIds: Array<ModuleID>,
  json: {[filename: string]: RawStats},
  sort: SortProps,
  filters: FilterProps,
  expandedRecords: Set<ModuleID>,
  currentlyFocusedElementID: ?string,
  calculatedFullModuleData: ?FullModuleDataType,
};

export type Dispatch = (action: Action) => any;

export const INITIAL_STATE: State = {
  appMode: 'single',
  dataPaths: [],
  selectedFilenameA: null,
  selectedChunkIdA: null,
  selectedFilenameB: null,
  selectedChunkIdB: null,
  blacklistedModuleIds: [],
  json: {},
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
  expandedRecords: new Set(),
  currentlyFocusedElementID: null,
  calculatedFullModuleData: null,
};

function concatItemToSet(list: Array<string>, item: string): Array<string> {
  return list.includes(item)
    ? list
    : list.concat(item);
}

function handleAction(
  state: State,
  action: Action,
): State {
  if (action.type === 'onChangedMode') {
    return {
      ...state,
      appMode: action.appMode,
    };
  } else if (action.type === 'initDataPaths') {
    return {
      ...state,
      dataPaths: action.paths.reduce(concatItemToSet, state.dataPaths),
    };
  } else if (action.type === 'pickedFile') {
    return {
      ...state,
      selectedFilenameA: action.filename,
      selectedChunkIdA: null,
      blacklistedModuleIds: [],
      expandedRecords: new Set(),
      currentlyFocusedElementID: null,
    };
  } else if (action.type === 'loadingFailed') {
    return {
      ...state,
      selectedFilenameA: null,
      selectedChunkIdA: null,
      blacklistedModuleIds: [],
      expandedRecords: new Set(),
      currentlyFocusedElementID: null,
    };
  } else if (action.type === 'loadingFinished') {
    return {
      ...state,
      selectedFilenameA: action.filename,
      dataPaths: concatItemToSet(state.dataPaths, action.filename),
      json: {
        ...state.json,
        [action.filename]: action.stats,
      },
    };
  } else if (action.type === 'onSorted') {
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
  } else if (action.type === 'onFiltered') {
    return {
      ...state,
      filters: {
        ...state.filters,
        ...action.changes,
      },
    };
  } else if (action.type === 'onPickedChunk') {
    return {
      ...state,
      selectedChunkIdA: String(action.chunkId),
      blacklistedModuleIds: [],
      expandedRecords: new Set(),
      currentlyFocusedElementID: null,
    };
  } else if (action.type === 'onRemoveModule') {
    return {
      ...state,
      blacklistedModuleIds: [
        ...state.blacklistedModuleIds,
        action.moduleID,
      ],
    };
  } else if (action.type === 'onIncludeModule') {
    const moduleID = action.moduleID;
    return {
      ...state,
      blacklistedModuleIds: state.blacklistedModuleIds.filter(
        (id) => String(id) !== String(moduleID),
      ),
    };
  } else if (action.type === 'onExpandRecords') {
    return {
      ...state,
      expandedRecords: new Set(state.expandedRecords.add(action.moduleID)),
    };
  } else if (action.type === 'onCollapseRecords') {
    state.expandedRecords.delete(action.moduleID);
    return {
      ...state,
      expandedRecords: new Set(state.expandedRecords),
    };
  } else if (action.type === 'onFocusChanged') {
    if (
      action.elementID &&
      state.calculatedFullModuleData &&
      state.calculatedFullModuleData.extendedModules
    ) {
      const moduleId = action.elementID;
      const modulesById = getModulesById(state.calculatedFullModuleData.extendedModules);
      const collapseableParent = getCollapsableParentOf(
        modulesById,
        modulesById[moduleId],
      );
      return {
        ...state,
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

  return state;
}

function calculateFullModuleData(
  oldState: State,
  newState: State,
): State {
  if (
    !newState.json ||
    !newState.selectedFilenameA ||
    !newState.json[newState.selectedFilenameA]
  ) {
    return {
      ...newState,
      calculatedFullModuleData: null,
    };
  }

  if (
    oldState.json === newState.json &&
    oldState.selectedFilenameA === newState.selectedFilenameA &&
    oldState.selectedChunkIdA === newState.selectedChunkIdA &&
    oldState.blacklistedModuleIds === newState.blacklistedModuleIds
  ) {
    return newState;
  }

  return {
    ...newState,
    calculatedFullModuleData: fullModuleData(
      newState.json[newState.selectedFilenameA],
      newState.selectedChunkIdA,
      newState.blacklistedModuleIds,
    ),
  };
}

export default function reducer(
  state: State = INITIAL_STATE,
  action: Action,
): State {
  return calculateFullModuleData(
    state,
    handleAction(state, action)
  );
}
