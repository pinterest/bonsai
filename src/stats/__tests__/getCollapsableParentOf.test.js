/**
 * @flow
 */

import getCollapsableParentOf from '../getCollapsableParentOf';
import getExtendedModulesById from '../getExtendedModulesById';
import {
  defaultModule,
  reasonFromModule,
} from '../../__test_helpers__/defaults';

const ENTRY_ZERO = defaultModule({
  id: 0,
  reasons: [],
});

const ENTRY_ONE = defaultModule({
  id: 1,
  reasons: [],
});

const ZERO_A = defaultModule({
  id: 2,
  reasons: [
    reasonFromModule(ENTRY_ZERO),
  ],
});

const COMMON = defaultModule({
  id: 3,
  reasons: [
    reasonFromModule(ENTRY_ZERO),
    reasonFromModule(ENTRY_ONE),
  ],
});

const COMMON_UTIL = defaultModule({
  id: 4,
  reasons: [
    reasonFromModule(COMMON),
  ],
});

const BIG_MODULE = defaultModule({
  id: 5,
  reasons: [
    reasonFromModule(ZERO_A),
    reasonFromModule(COMMON),
  ],
});

const ENTRY_ONE_A = defaultModule({
  id: 600,
  reasons: [
    reasonFromModule(ENTRY_ONE),
  ],
});

const ENTRY_ONE_B = defaultModule({
  id: 300,
  reasons: [
    reasonFromModule(ENTRY_ONE_A),
  ],
});

const MODULES = [
  ENTRY_ZERO,
  ENTRY_ONE,
  ZERO_A,
  COMMON,
  COMMON_UTIL,
  BIG_MODULE,
  ENTRY_ONE_A,
  ENTRY_ONE_B,
];

const modulesById = getExtendedModulesById(MODULES);

describe('getCollapsableParentOf', () => {
  it('should return null when the requested moduleid is not in the map', () => {
    expect(getCollapsableParentOf(modulesById, 'foo')).toBeNull();
  });

  it('should return null when the requested module is not required by anything', () => {
    expect(getCollapsableParentOf(modulesById, ENTRY_ZERO.id)).toBeNull();
  });

  it('should return null when many things require this, but it has no children', () => {
    expect(getCollapsableParentOf(modulesById, BIG_MODULE.id)).toBeNull();
  });

  it('should be the collapsable parent when many things require this, and it has children', () => {
    const collapsable = getCollapsableParentOf(modulesById, COMMON.id);
    expect(collapsable).not.toBeNull();
    expect(collapsable).toEqual(expect.objectContaining(COMMON));
  });

  it('should travel up to find the collapsable parent', () => {
    const collapsable = getCollapsableParentOf(modulesById, COMMON_UTIL.id);
    expect(collapsable).not.toBeNull();
    expect(collapsable).toEqual(expect.objectContaining(COMMON));
  });
});
