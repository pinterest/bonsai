/**
 * @flow
 */

import type {RawStats} from './types/Stats';

export type State = {
  isLoading: boolean,
  dataPaths: Array<string>,
  selectedFilename: ?string,
  json: {[filename: string]: RawStats},
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
  ;

export type Dispatch = (action: Action) => void;

const initialState = {
  isLoading: false,
  dataPaths: [],
  selectedFilename: null,
  json: {},
};

function concatItemToSet(list: Array<string>, item: string): Array<string> {
  return list.includes(item)
    ? list
    : list.concat(item);
}

export default function handleAction(
  state: State = initialState,
  action: Action,
) {
  if (action.type === 'initDataPaths') {
    return {
      ...state,
      dataPaths: [
        ...state.dataPaths,
        ...action.paths,
      ],
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
  }

  return state
}
