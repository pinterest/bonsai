/*
 * @flow
 */

import type {ParsedJSON, RawStats} from '../types/Stats';

function invariant(condition: boolean, message: string): void {
  if (!condition) {
    // eslint-disable-next-line no-console
    console.error(message);
    throw new Error(message);
  }
}

export default function getRawStats(
  filename: string,
  json: ParsedJSON,
): {[filename: string]: RawStats} {
  try {
    const stats = getStatsJson(json);
    return {
      [filename]: stats,
    };
  } catch (singleError) {
    try {
      const multiStats = getMultiStatsJson(json);
      return multiStats.children.reduce((multi, json, index) => {
        const suffix = multiStats.children.length > 1 ? ` (multi ${index})` : '';
        multi[filename + suffix] = json;
        return multi;
      }, {});
    } catch (multiError) {
      throw new Error('Unable to find required fields.');
    }
  }
}

export function getStatsJson(
  json: ParsedJSON,
): RawStats {
  invariant(json, 'Empty object found. Stats file must be a populated object.');

  invariant(json.chunks, `Could not find 'chunks' field.`);
  invariant(json.modules, `Could not find 'modules' field.`);

  invariant(Array.isArray(json.chunks), `Found field 'chunks' but the value is not an array.`);
  invariant(Array.isArray(json.modules), `Found field 'modules' but the value is not an array.`);

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
