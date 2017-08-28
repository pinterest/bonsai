/**
 * @flow
 */

import type {ExtendedModule} from '../types/Stats';

export type SortableFields = $Keys<ExtendedModule>;
export type SortDirection = 'ASC' | 'DESC';

export type SortProps = {
  field: SortableFields,
  direction: SortDirection,
};

type SortResult = -1 | 0 | 1;

function checkDirection(
  direction: SortDirection,
  sort: SortResult,
): SortResult {
  if (sort === 0 || direction === 'ASC') {
    return sort;
  } else {
    return sort > 0 ? -1 : 1;
  }
}

function compare(a: any, b: any): SortResult {
  return (a === b ? 0 : (a > b ? 1 : -1));
}

export default function sortModules(
  extendedModules: Array<ExtendedModule>,
  sort: SortProps,
) {
  return extendedModules
    .sort((a: ExtendedModule, b: ExtendedModule) => {
      const {field, direction} = sort;

      return checkDirection(direction, compare(a[field], b[field]));
    });
}
