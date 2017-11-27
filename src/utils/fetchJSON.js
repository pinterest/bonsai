/*
 * @flow
 */

import type {ParsedJSON} from '../types/Stats';

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
