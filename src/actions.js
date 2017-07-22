/**
 * @flow
 */

import type {Dispatch} from './reducer';
import type {RawStats} from './types/Stats';
import type {FilterableFields} from './stats/filterModules';

import getRawStatsFiles from './types/getRawStatsFiles';

export function InitDataPaths(dispatch: Dispatch) {
  return (paths: Array<string>) => dispatch({
      type: 'initDataPaths',
      paths,
  });
}

export function PickedFile(dispatch: Dispatch) {
  return (filename: ?string) => dispatch({
    type: 'pickedFile',
    filename: filename,
  });
}

export function DroppedFile(dispatch: Dispatch) {
  return (filename: string, fileText: string) => {
    let json;
    let files;
    try {
      json = JSON.parse(fileText);
    } catch (error) {
      alert(`JSON parse error. Unable to load stats file.\n\n${String(error)}\n\nCheck the console for full details.`);
      console.error(error);
      LoadingFailed(dispatch)();
      return;
    }

    try {
      files = getRawStatsFiles(filename, json);
    } catch (error) {
      alert(`Invalid stats file.\n\n${String(error)}\n\nCheck the console for full details.`);
      console.error(error);
      LoadingFailed(dispatch)();
      return;
    }

    const firstKey = Object.keys(files)[0];
    const firstJson = files[firstKey];
    LoadingFinished(dispatch)(firstKey, firstJson);
  };
}

export function LoadingFailed(dispatch: Dispatch) {
  return () => dispatch({
    type: 'loadingFailed',
  });
}

export function LoadingFinished(dispatch: Dispatch) {
  return (filename: string, stats: RawStats) => dispatch({
    type: 'loadingFinished',
    filename,
    stats,
  });
}

export function SortedTable(dispatch: Dispatch) {
  return (field: string) => dispatch({
    type: 'onSorted',
    field,
  });
}

export function FilteredTable(dispatch: Dispatch) {
  return (changes: {[key: FilterableFields]: string}) => dispatch({
    type: 'onFiltered',
    changes,
  });
}
