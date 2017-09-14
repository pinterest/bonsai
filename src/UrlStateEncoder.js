/**
 * @flow
 */

import type { Store } from 'redux';
import type { State } from './reducer';

import {
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

    if (targetState.filename !== null && targetState.filename !== undefined) {
      PickedFile(store.dispatch)(targetState.filename);
      if (targetState.chunk !== null && targetState.chunk !== undefined) {
        PickedChunk(store.dispatch)(targetState.chunk);
        if (targetState.rm) {
          const remove = RemovedModule(store.dispatch);
          targetState.rm.split(',').forEach(remove);
        }
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
    if (state.selectedFilename !== null && state.selectedFilename !== undefined) {
      vals.filename = state.selectedFilename;
      if (state.selectedChunkId !== null && state.selectedChunkId !== undefined) {
        vals.chunk = state.selectedChunkId;
        if (state.blacklistedModuleIds && state.blacklistedModuleIds.length) {
          vals.rm = state.blacklistedModuleIds.join(',');
        }
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
