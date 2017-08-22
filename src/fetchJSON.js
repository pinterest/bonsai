/*
 * @flow
 */

import type {Dispatch} from './reducer';
import type {ParsedJSON} from './types/Stats';

import {
  InitDataPaths,
  LoadingFailed,
  LoadingFinished,
} from './actions';

const responseCache: {[url: string]: Promise<*>} = {};

export default function fetchJSON(endpoint: string): Promise<ParsedJSON> {
  if (!responseCache[endpoint]) {
    responseCache[endpoint] = fetch(endpoint, {
      headers: new Headers({
        'Accept': 'application/json',
      }),
    }).then((response) => response.json());
  }
  return responseCache[endpoint];
}

export function fetchApiListEndpoint(
  dispatch: Dispatch,
  endpoint: string,
) {
  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line no-console
    console.info('NODE_ENV is \'test\'. Skipping fetchApiListEndpoint()');
    return;
  }

  fetchJSON(endpoint).then((json) => {
    if (!json.paths) {
      // eslint-disable-next-line no-console
      console.error(`Missing field. '${String(endpoint)}' should return '{"paths": []}' key. Got: ${String(Object.keys(json))}`);
    } else if (!Array.isArray(json.paths)) {
      // eslint-disable-next-line no-console
      console.error('Invalid type: `paths`. Expected `paths` to be an array of web urls. Got:', json.paths);
    } else {
      InitDataPaths(dispatch)(json.paths.map(String));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`Failed while fetching json from '${String(endpoint)}'.`, error);
  });
}

export function fetchApiFileEndpoint(
  dispatch: Dispatch,
  endpoint: string,
) {
  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line no-console
    console.info('NODE_ENV is \'test\'. Skipping fetchJsonFile()');
    return;
  }

  fetchJSON(endpoint).then((json: ParsedJSON) => {
    LoadingFinished(dispatch)(endpoint, json);
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(`Failed while fetching json from '${String(endpoint)}'.`, error);
    LoadingFailed(dispatch)();
  });
}
