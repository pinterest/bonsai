/**
 * @flow
 */

import type {ChunkID, ModuleID, RawStats} from './types/Stats';
import type {Dispatch, ModeType} from './reducer';
import type {FilterableFields} from './stats/filterModules';
import type {SortableFields} from './stats/sortModules';

import getRawStats from './types/getRawStats';
import { fetchApiFileEndpoint } from './fetchJSON';

export function ChangedMode(dispatch: Dispatch) {
  return (appMode: ModeType) => dispatch({
    type: 'onChangedMode',
    appMode,
  });
}

export function InitDataPaths(dispatch: Dispatch) {
  return (paths: Array<string>) => dispatch({
    type: 'initDataPaths',
    paths,
  });
}

export function PickedFile(dispatch: Dispatch) {
  return (position: 'A' | 'B', filename: ?string) => {
    if (filename) {
      fetchApiFileEndpoint(dispatch, filename);
    }

    return dispatch({
      type: 'pickedFile',
      filename,
      position,
    });
  };
}

export function DroppedFile(dispatch: Dispatch) {
  return (filename: string, fileText: string) => {
    let json;
    let files;
    try {
      json = JSON.parse(fileText);
    } catch (error) {
      alert(`JSON parse error. Unable to load stats file.\n\n${String(error)}\n\nCheck the console for full details.`);
      // eslint-disable-next-line no-console
      console.error(error);
      LoadingFailed(dispatch)();
      return;
    }

    try {
      files = getRawStats(filename, json);
    } catch (error) {
      alert(`Invalid stats file.\n\n${String(error)}\n\nCheck the console for full details.`);
      // eslint-disable-next-line no-console
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
  return (field: SortableFields) => dispatch({
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

export function PickedChunk(dispatch: Dispatch) {
  return (position: 'A' | 'B', chunkId: ChunkID) => dispatch({
    type: 'onPickedChunk',
    chunkId,
    position,
  });
}

export function RemovedModule(dispatch: Dispatch) {
  return (moduleID: ModuleID) => dispatch({
    type: 'onRemoveModule',
    moduleID,
  });
}

export function IncludedModule(dispatch: Dispatch) {
  return (moduleID: ModuleID) => dispatch({
    type: 'onIncludeModule',
    moduleID,
  });
}

export function ChangeExpandMode(dispatch: Dispatch) {
  return (mode: 'manual' | 'expand-all' | 'collapse-all') => dispatch({
    type: 'changeExpandRecordsMode',
    mode,
  });
}

export function ExpandRecords(dispatch: Dispatch) {
  return (moduleID: ModuleID) => dispatch({
    type: 'onExpandRecords',
    moduleID,
  });
}

export function CollapseRecords(dispatch: Dispatch) {
  return (moduleID: ModuleID) => dispatch({
    type: 'onCollapseRecords',
    moduleID,
  });
}

export function FocusElement(dispatch: Dispatch) {
  return (elementID: ?string) => dispatch({
    type: 'onFocusChanged',
    elementID,
  });
}
