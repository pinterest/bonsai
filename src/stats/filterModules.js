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

type FilterMethod = (eModule: ExtendedModule) => boolean;

function makeRecordLikeRegExpFilter(field: string, re: RegExp | ''): FilterMethod {
  return function(eModule: ExtendedModule): boolean {
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
): FilterMethod {
  return function(eModule: ExtendedModule): boolean {
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
    ));
}
