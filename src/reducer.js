/**
 * @flow
 */

import type {RawStats} from './types/Stats';

export type State = {
  isLoading: boolean,
  selectedFilename: ?string,
  json: {[filename: string]: RawStats},
};

export type Action =
  | {
    type: 'startLoading',
  }
  | {
    type: 'finishedLoading',
    filename: ?string,
    stats: ?RawStats,
  }
  | {
    type: 'pickedFile',
    filename: ?string,
  }
  ;

export type Dispatch = (action: Action) => void;

const initialState = {
  isLoading: false,
  selectedFilename: null,
  json: {},
};

export default function handleAction(
  state: State = initialState,
  action: Action,
) {
  if (action.type === 'startLoading') {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === 'finishedLoading') {
    const nextJson = (action.filename && action.stats)
      ? {
          ...state.json,
          [action.filename]: action.stats,
        }
      : state.json;
    return {
      ...state,
      isLoading: false,
      json: nextJson,
    };
  } else if (action.type === 'pickedFile') {
    return {
      ...state,
      selectedFilename: action.filename,
    };
  }

  return state
}
