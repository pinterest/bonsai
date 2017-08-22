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
  requirementsCountMin: string,
  requirementsCountMax: string,
};

export type FilterableFields = $Keys<FilterProps>;

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

function toNumber(value: string): number | '' {
  return value === '' ? '' : Number(value);
}

function makeRecordRangeFilter(
  field: string,
  min: number | '',
  max: number | '',
) {
  return function(eModule: ExtendedModule) {
    if (min !== '' && max !== '') {
      return eModule[field] >= min && eModule[field] <= max;
    }
    if (min !== '') {
      return eModule[field] >= min;
    }
    if (max !== '') {
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
      toNumber(filters.cumulativeSizeMin),
      toNumber(filters.cumulativeSizeMax),
    ))
    .filter(makeRecordRangeFilter(
      'requiredByCount',
      toNumber(filters.requiredByCountMin),
      toNumber(filters.requiredByCountMax),
    ))
    .filter(makeRecordRangeFilter(
      'requirementsCount',
      toNumber(filters.requirementsCountMin),
      toNumber(filters.requirementsCountMax),
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
