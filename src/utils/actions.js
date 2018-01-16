/**
 * @flow
 */

import type {ChunkID, ModuleID, ParsedJSON} from '../types/Stats';
import type {Dispatch} from './reducer';
import type {FilterableFields} from '../stats/filterModules';
import type {SortableFields} from '../stats/sortModules';

import fetchJSON from './fetchJSON';
import getRawStats from '../types/getRawStats';
import invariant from 'invariant';

export function DiscoveredDataPaths(dispatch: Dispatch) {
  return (paths: Array<string>) => dispatch({
    type: 'discoveredDataPaths',
    paths,
  });
}

export function PickDataPath(dispatch: Dispatch) {
  return (path: string) => dispatch({
    type: 'pickDataPath',
    path,
  });
}

export function DroppedDataFile(dispatch: Dispatch) {
  return (path: string, fileText: string) => {
    try {
      const json = JSON.parse(fileText);
      return LoadedStatsAtPath(dispatch)(path, json);
    } catch (error) {
      alert(`JSON parse error. Unable to load stats file.\n\n${String(error)}\n\nCheck the console for full details.`);
      return ErroredAtPath(dispatch)(path, error);
    }
  };
}

export function RequestedDataAtPath(dispatch: Dispatch) {
  return (path: string) => dispatch({
    type: 'requestedDataAtPath',
    path,
  });
}

export function LoadedStatsAtPath(dispatch: Dispatch) {
  return (path: string, json: ParsedJSON) => {
    try {
      const children = getRawStats(json);
      return dispatch({
        type: 'loadedStatsAtPath',
        path,
        children,
      });
    } catch (error) {
      alert(`Invalid stats file.\n\n${String(error)}\n\nCheck the console for full details.`);
      return ErroredAtPath(dispatch)(path, error);
    }
  };
}

export function ErroredAtPath(dispatch: Dispatch) {
  return (path: string, error: Error | string) => dispatch({
    type: 'erroredAtPath',
    path,
    error,
  });
}

export function fetchApiList(dispatch: Dispatch) {
  return (endpoint: string) => {
    fetchJSON(endpoint).then((json: ParsedJSON) => {
      invariant(
        json.paths,
        `Missing field. Expected '{"paths": []}' key. Got: ${String(Object.keys(json))}`
      );
      invariant(
        Array.isArray(json.paths),
        `Invalid type. Expected "paths" to be an array of web urls. Got: ${JSON.stringify(json.paths)}`
      );

      DiscoveredDataPaths(dispatch)(json.paths.map(String));
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(`Failed while fetching json from '${String(endpoint)}'.`, error);
    });
  };
}

export function fetchDataFile(dispatch: Dispatch) {
  return (endpoint: string) => {
    PickDataPath(dispatch)(endpoint);
    RequestedDataAtPath(dispatch)(endpoint);
    fetchJSON(endpoint).then((json: ParsedJSON) => {
      LoadedStatsAtPath(dispatch)(endpoint, json);
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(`Failed while fetching json from '${String(endpoint)}'.`, error);
      ErroredAtPath(dispatch)(endpoint, error);
    });
  };
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

export function PickedChild(dispatch: Dispatch) {
  return (childIndex: number) => dispatch({
    type: 'onPickedChild',
    childIndex,
  });
}

export function PickedChunk(dispatch: Dispatch) {
  return (chunkId: ChunkID) => dispatch({
    type: 'onPickedChunk',
    chunkId,
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
