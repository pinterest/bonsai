/**
 * @flow
 */

import type {RawStats} from './types/Stats';
import type {
  FilterableFields,
  FilterProps,
  SortProps,
} from './stats/filterModules';

export type State = {
  isLoading: boolean,
  dataPaths: Array<string>,
  selectedFilename: ?string,
  json: {[filename: string]: RawStats},
  sort: SortProps,
  filters: FilterProps,
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
  ;

export type Dispatch = (action: Action) => any;

export const INITIAL_STATE: State = {
  isLoading: false,
  dataPaths: [],
  selectedFilename: null,
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
    };
  } else if (action.type === 'loadingFailed') {
    return {
      ...state,
      selectedFilename: null,
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
  }

  return state
}
