/**
 * @flow
 */

import type {ExtendedModule} from '../types/Stats';

export type FilterProps = {
  moduleName: string,
  cumulativeSizeMin: string,
  cumulativeSizeMax: string,
  requiredByCountMin: string,
  requiredByCountMax: string,
};

export type SortDirection = 'ASC' | 'DESC';
export type SortProps = {
  field: string,
  direction: SortDirection,
};

function makeRecordLikeRegExpFilter(field: string, re: RegExp | '') {
  return function(eModule: ExtendedModule) {
    if (re && !re.test(eModule[field])) {
      return false;
    }
    return true;
  };
}

function makeRecordRangeFilter(
  field: string,
  min: number | '',
  max: number | '',
) {
  return function(eModule: ExtendedModule) {
    if (min && max) {
      return eModule[field] >= min && eModule[field] <= max;
    }
    if (min) {
      return eModule[field] >= min;
    }
    if (max) {
      return eModule[field] <= max;
    }
    return true;
  };
}

export default function filterModules(
  extendedModules: Array<ExtendedModule>,
  filters: FilterProps,
  sort: SortProps,
) {
  return extendedModules
    .filter(makeRecordLikeRegExpFilter(
      'name',
      new RegExp(filters.moduleName),
    ))
    .filter(makeRecordRangeFilter(
      'cumulativeSize',
      Number(filters.cumulativeSizeMin),
      Number(filters.cumulativeSizeMax),
    ))
    .filter(makeRecordRangeFilter(
      'requiredByCount',
      Number(filters.requiredByCountMin),
      Number(filters.requiredByCountMax),
    ))
    .sort((a, b) => {
      const {field, direction} = sort;
      if (a[field] < b[field]) {
        return direction === 'ASC' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === 'DESC' ? -1 : 1;
      }
      return 0;
    });
}
