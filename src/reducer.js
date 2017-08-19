/**
 * @flow
 */

import type {ChunkID, ModuleID, RawStats} from './types/Stats';
import type {
  FilterableFields,
  FilterProps,
  SortProps,
} from './stats/filterModules';

export type State = {
  dataPaths: Array<string>,
  selectedFilename: ?string,
  selectedChunkId: ?ChunkID,
  blacklistedModuleIds: Array<ModuleID>,
  json: {[filename: string]: RawStats},
  sort: SortProps,
  filters: FilterProps,
  expandedRecords: Set<ModuleID>,
};

export type Action =
  | {
    type: 'initDataPaths',
    paths: Array<string>,
  }
  | {
    type: 'pickedFile',
    filename: ?string,
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
    field: string,
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
  ;

export type Dispatch = (action: Action) => any;

export const INITIAL_STATE: State = {
  dataPaths: [],
  selectedFilename: null,
  selectedChunkId: null,
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
};

function concatItemToSet(list: Array<string>, item: string): Array<string> {
  return list.includes(item)
    ? list
    : list.concat(item);
}

export default function handleAction(
  state: State = INITIAL_STATE,
  action: Action,
): State {
  if (action.type === 'initDataPaths') {
    return {
      ...state,
      dataPaths: action.paths.reduce(concatItemToSet, state.dataPaths),
    };
  } else if (action.type === 'pickedFile') {
    return {
      ...state,
      selectedFilename: action.filename,
      selectedChunkId: null,
      blacklistedModuleIds: [],
      expandedRecords: new Set(),
    };
  } else if (action.type === 'loadingFailed') {
    return {
      ...state,
      selectedFilename: null,
      selectedChunkId: null,
      blacklistedModuleIds: [],
      expandedRecords: new Set(),
    };
  } else if (action.type === 'loadingFinished') {
    return {
      ...state,
      selectedFilename: action.filename,
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
      selectedChunkId: String(action.chunkId),
      blacklistedModuleIds: [],
      expandedRecords: new Set(),
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
      expandedRecords: state.expandedRecords.add(action.moduleID),
    };
  } else if (action.type === 'onCollapseRecords') {
    state.expandedRecords.delete(action.moduleID);
    return {
      ...state,
      expandedRecords: new Set(state.expandedRecords),
    };
  }

  return state;
}
