/*
 * @flow
 */

import type {ParsedJSON, RawStats} from '../types/Stats';

function invariant(condition: boolean, message: string): void {
  if (!condition) {
    // eslint-disable-next-line no-console
    console.warn(`Could not find 'chunks' field.`);
    throw new Error(message);
  }
}

export default function getRawStats(
  json: ParsedJSON,
): Array<RawStats> {
  try {
    const stats = getStatsJson(json);
    return [stats];
  } catch (singleError) {
    console.log('Looks like a multi-config stat file.');
    try {
      const multiStats = getMultiStatsJson(json);
      return multiStats.children;
    } catch (multiError) {
      throw new Error('Unable to find required fields.');
    }
  }
}

export function getStatsJson(
  json: ParsedJSON,
): RawStats {
  invariant(json, 'Empty object found. Stats file must be a populated object.');

  invariant(json.assets, `Could not find 'assets' field.`);
  invariant(json.chunks, `Could not find 'chunks' field.`);
  invariant(json.modules, `Could not find 'modules' field.`);

  invariant(Array.isArray(json.chunks), `Found field 'chunks' but the value is not an array.`);
  invariant(Array.isArray(json.modules), `Found field 'modules' but the value is not an array.`);

  json.modules.forEach((mod) => {
    delete mod.source;
  });

  return json;
}

export function getMultiStatsJson(
  json: ParsedJSON,
): {children: Array<RawStats>} {
  invariant(json, 'Empty object found. Stats file must be a populated object.');

  invariant(json.children, `Could not find 'children' field.`);
  invariant(Array.isArray(json.children), `Found field 'children' but the value is not an array.`);

  json.children.forEach(getStatsJson);

  return json;
}
