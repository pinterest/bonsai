/*
 * @flow
 */

import type {ParsedJSON} from './types/Stats';

export default function fetchJSON(endpoint: string): Promise<ParsedJSON> {
  return fetch(endpoint).then((response) => response.json());
}

export function fetchApiListEndpoint(
  endpoint: ?string,
  callback: (paths: Array<string>) => void,
) {
  if (!endpoint) {
    console.info('Env var \'REACT_APP_API_LIST_ENDPOINT\' was empty. Skipping fetch.');
    return;
  }
  if (process.env.NODE_ENV === 'test') {
    console.info('NODE_ENV is \'test\'. Skipping fetchJSON() in FileInputRow::componentDidMount');
    return;
  }

  fetchJSON(endpoint).then((json) => {
    if (!json.paths) {
      console.error(`Missing field. '${String(endpoint)}' should return '{"paths": []}' key. Got: ${String(Object.keys(json))}`);
    } else if (!Array.isArray(json.paths)) {
      console.error('Invalid type: `paths`. Expected `paths` to be an array of web urls. Got:', json.paths);
    } else {
      callback(json.paths.map(String));
    }
  }).catch((error) => {
    console.error(`Failed while fetching json from '${String(endpoint)}'.`, error);
  });
}
