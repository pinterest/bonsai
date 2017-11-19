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

// import chunkSizes from './stats/chunkSizes';
// import chunkSizesDiff from './stats/chunkSizesDiff';
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
    position: 'A' | 'B',
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
  expandMode: 'manual' | 'expand-all' | 'collapse-all',
  expandedRecords: Set<ModuleID>,
  currentlyFocusedElementID: ?string,
  calculatedFullModuleData: ?FullModuleDataType,
  calculatedFullModuleDataA: ?FullModuleDataType,
  calculatedFullModuleDataB: ?FullModuleDataType,
  // calculatedDiffData: ?Object,
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
  expandMode: 'collapse-all',
  expandedRecords: new Set(),
  currentlyFocusedElementID: null,
  calculatedFullModuleData: null,
  calculatedFullModuleDataA: null,
  calculatedFullModuleDataB: null,
  // calculatedDiffData: null,
};

function concatItemToSet(list: Array<string>, item: string): Array<string> {
  return list.includes(item)
    ? list
    : list.concat(item);
}

function selectedFileKeyFromState(state: State) {
  if (state.selectedFilenameB !== null) {
    return 'selectedFilenameB';
  } else {
    return 'selectedFilenameA';
  }
}

function selectedNextFileKeyFromState(state: State) {
  if (state.selectedFilenameA === null) {
    return 'selectedFilenameA';
  } else if (state.selectedFilenameB === null && state.appMode === 'diff') {
    return 'selectedFilenameB';
  } else {
    return null;
  }
}

function selectedChunkKeyFromState(state: State) {
  return state.appMode === 'diff'
    ? 'selectedChunkIdB'
    : 'selectedChunkIdA';
}

function selectedFileKeyFromPosition(position: 'A' | 'B') {
  return position === 'B'
    ? 'selectedFilenameB'
    : 'selectedFilenameA';
}

function selectedChunkKeyFromPosition(position: 'A' | 'B') {
  return position === 'B'
    ? 'selectedChunkIdB'
    : 'selectedChunkIdA';
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
      [selectedFileKeyFromPosition(action.position)]: action.filename,
      [selectedChunkKeyFromPosition(action.position)]: null,
      blacklistedModuleIds: [],
      expandMode: 'collapse-all',
      expandedRecords: new Set(),
      currentlyFocusedElementID: null,
    };
  } else if (action.type === 'loadingFailed') {
    const key = selectedFileKeyFromState(state);

    return {
      ...state,
      ...(key ? {[key]: null} : null),
      [selectedChunkKeyFromState(state)]: null,
      blacklistedModuleIds: [],
      expandMode: 'collapse-all',
      expandedRecords: new Set(),
      currentlyFocusedElementID: null,
    };
  } else if (action.type === 'loadingFinished') {
    const key = selectedNextFileKeyFromState(state);

    return {
      ...state,
      ...(key ? {[key]: action.filename} : null),
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
      [selectedChunkKeyFromPosition(action.position)]: String(action.chunkId),
      blacklistedModuleIds: [],
      expandMode: 'collapse-all',
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
  } else if (action.type === 'changeExpandRecordsMode') {
    return {
      ...state,
      expandMode: action.mode,
    };
  } else if (action.type === 'onExpandRecords') {
    return {
      ...state,
      expandMode: 'manual',
      expandedRecords: new Set(state.expandedRecords.add(action.moduleID)),
    };
  } else if (action.type === 'onCollapseRecords') {
    state.expandedRecords.delete(action.moduleID);
    return {
      ...state,
      expandMode: state.expandedRecords.size === 0
        ? 'collapse-all'
        : 'manual',
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

  return state;
}

function calculateFullModuleData(
  fileKey: string,
  chunkKey: string,
  oldState: State,
  newState: State,
): ?FullModuleDataType {
  if (
    !newState.json ||
    !newState[fileKey] ||
    !newState.json[newState[fileKey]]
  ) {
    return null;
  }

  if (
    oldState.json === newState.json &&
    oldState[fileKey] === newState[fileKey] &&
    oldState[chunkKey] === newState[chunkKey] &&
    oldState.blacklistedModuleIds === newState.blacklistedModuleIds
  ) {
    return null;
  }

  return fullModuleData(
    newState.json[newState[fileKey]],
    newState[chunkKey],
    newState.blacklistedModuleIds,
  );
}

// function calculateDiffData(state: State): ?Object {
//   if (!state.selectedFilenameA || !state.selectedFilenameB) {
//     return null;
//   }
//
//   const jsonA = state.json[state.selectedFilenameA];
//   const jsonB = state.json[state.selectedFilenameB];
//
//   if (!jsonA || !jsonB) {
//     return null;
//   }
//
//   const fileA = {[state.selectedFilenameA]: jsonA};
//   const fileB = {[state.selectedFilenameB]: jsonB};
//
//   return chunkSizesDiff(
//     chunkSizes(fileA),
//     chunkSizes(fileB),
//   );
// }

export default function reducer(
  state: State = INITIAL_STATE,
  action: Action,
): State {
  const newState = handleAction(state, action);

  switch(state.appMode) {
    case 'single':
      return {
        ...newState,
        calculatedFullModuleData: calculateFullModuleData(
          'selectedFilename',
          'selectedChunkId',
          state,
          newState
        )
      };

    case 'diff':
      const calculatedFullModuleDataA = calculateFullModuleData(
        'selectedFilenameA',
        'selectedChunkIdA',
        state,
        newState,
      );

      const calculatedFullModuleDataB = calculateFullModuleData(
        'selectedFilenameB',
        'selectedChunkIdB',
        state,
        newState,
      );

      // const
      // getExtendedModulesByName
      return {
        ...newState,
        calculatedFullModuleData: calculatedFullModuleDataA,
        calculatedFullModuleDataA,
        calculatedFullModuleDataB,
        // calculatedDiffData: calculateDiffData(newState)
      };

    default:
      return newState;
  }
}
