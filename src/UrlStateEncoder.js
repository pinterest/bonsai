/**
 * @flow
 */

import type { Store } from 'redux';
import type { State } from './reducer';

import {
  ChangedMode,
  PickedFile,
  PickedChunk,
  RemovedModule,
} from './actions';

type Subscription = () => void;

function toQueryString(obj: Object): string {
  return Object.keys(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

export default class UrlStateEncoder {
  _store: Store<*, *>;
  _subscription: ?Subscription = null;

  static instance: ?UrlStateEncoder = null;
  static factory = function(store: Store<*, *>): UrlStateEncoder {
    if (!UrlStateEncoder.instance) {
      UrlStateEncoder.instance = new UrlStateEncoder(store);
    }
    return UrlStateEncoder.instance;
  }

  constructor(store: Store<*, *>) {
    this._store = store;

    const targetState = this.readStateFromHash(window.location.hash);

    // Deprecated: old `#filename=main.js` format.
    if (targetState.filename !== null && targetState.filename !== undefined) {
      PickedFile(store.dispatch)('A', targetState.filename);
      if (targetState.chunk !== null && targetState.chunk !== undefined) {
        PickedChunk(store.dispatch)('A', targetState.chunk);
        if (targetState.rm) {
          const remove = RemovedModule(store.dispatch);
          targetState.rm.split(',').forEach(remove);
        }
      }

      this._subscription = store.subscribe(this.onStoreChanged);
      return;
    } // End Deprecated

    if (targetState.mode === 'diff') {
      ChangedMode(store.dispatch)('diff');
    }

    if (targetState.fileA !== null && targetState.fileA !== undefined) {
      PickedFile(store.dispatch)('A', targetState.fileA);
      if (targetState.chunkA !== null && targetState.chunkA !== undefined) {
        PickedChunk(store.dispatch)('A', targetState.chunkA);
        if (targetState.rm) {
          const remove = RemovedModule(store.dispatch);
          targetState.rm.split(',').forEach(remove);
        }
      }
    }

    if (targetState.fileB !== null && targetState.fileB !== undefined) {
      PickedFile(store.dispatch)('B', targetState.fileB);
      if (targetState.chunkB !== null && targetState.chunkB !== undefined) {
        PickedChunk(store.dispatch)('B', targetState.chunkB);
      }
    }

    this._subscription = store.subscribe(this.onStoreChanged);
  }

  onStoreChanged = () => {
    const newState = this._store.getState();
    window.location.hash = this.encodeStateForHash(newState);
  }

  readStateFromHash(hash: string): Object {
    return hash.replace(/^#/, '')
      .split('&')
      .reduce((map, pair) => {
        const [key, val] = pair.split('=');
        map[key] = decodeURIComponent(val);
        return map;
      }, {});
  }

  encodeStateForHash(state: State): string {
    const vals = {};
    if (state.appMode === 'diff') {
      vals.mode = state.appMode;
    }

    if (state.selectedFilenameA !== null && state.selectedFilenameA !== undefined) {
      vals.fileA = state.selectedFilenameA;
      if (state.selectedChunkIdA !== null && state.selectedChunkIdA !== undefined) {
        vals.chunkA = state.selectedChunkIdA;
        if (state.blacklistedModuleIds && state.blacklistedModuleIds.length) {
          vals.rm = state.blacklistedModuleIds.join(',');
        }
      }
    }
    if (state.selectedFilenameB !== null && state.selectedFilenameB !== undefined) {
      vals.fileB = state.selectedFilenameB;
      if (state.selectedChunkIdB !== null && state.selectedChunkIdB !== undefined) {
        vals.chunkB = state.selectedChunkIdB;
      }
    }
    return toQueryString(vals);
  }

  destroy() {
    if (this._subscription) {
      this._subscription();
      this._subscription = null;
    }
  }
}
