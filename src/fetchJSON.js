/*
 * @flow
 */

import type {ParsedJSON} from './types/Stats';

export default function fetchJSON(endpoint: string): Promise<ParsedJSON> {
  return fetch(endpoint).then((response) => response.json());
}
