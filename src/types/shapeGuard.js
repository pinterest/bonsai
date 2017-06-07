/*
 * @flow
 */

import type {ParsedJSON, RawStats} from '../types/Stats';

function invariant(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

export default function isStatsJson(json: ParsedJSON): RawStats {
  invariant(json, 'Empty object found. Stats file must be a populated object.');

  invariant(json.assets, `Could not find 'assets' field.`);
  invariant(json.entrypoints, `Could not find 'entrypoints' field.`);
  invariant(json.chunks, `Could not find 'chunks' field.`);
  invariant(json.modules, `Could not find 'modules' field.`);

  invariant(Array.isArray(json.assets), `Found field 'assets' but the value is not an array.`);
  invariant(Array.isArray(json.chunks), `Found field 'chunks' but the value is not an array.`);
  invariant(Array.isArray(json.modules), `Found field 'modules' but the value is not an array.`);

  return json;
}
