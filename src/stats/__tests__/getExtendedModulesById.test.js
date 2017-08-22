/*
 * @flow
 */

import type {ExtendedModule} from '../../types/Stats';

import {
  defaultModule,
  defaultExtendedModule,
  reasonFromModule,
} from '../../__test_helpers__/defaults';

import getExtendedModulesById, {
  calculateModuleSizes
} from '../getExtendedModulesById';

const ENTRY_ZERO = defaultModule({
  id: 0,
  name: 'Entry Zero',
  size: 100,
  reasons: [],
});

const ENTRY_ONE = defaultModule({
  id: 1,
  name: 'Entry One',
  size: 100,
  reasons: [],
});

const ZERO_A = defaultModule({
  id: 2,
  name: 'Module Zero-A',
  size: 250,
  reasons: [
    reasonFromModule(ENTRY_ZERO),
  ],
});

const COMMON = defaultModule({
  id: 3,
  name: 'Module Common',
  size: 200,
  reasons: [
    reasonFromModule(ENTRY_ZERO),
    reasonFromModule(ENTRY_ONE),
  ],
});

const BIG_MODULE = defaultModule({
  id: 5,
  name: 'Big Module',
  size: 1000,
  reasons: [
    reasonFromModule(ZERO_A),
    reasonFromModule(COMMON),
  ],
});

const ENTRY_ONE_A = defaultModule({
  id: 600,
  name: 'Module One-A',
  size: 600,
  reasons: [
    reasonFromModule(ENTRY_ONE),
  ],
});

const ENTRY_ONE_B = defaultModule({
  id: 300,
  name: 'Module One-B',
  size: 300,
  reasons: [
    reasonFromModule(ENTRY_ONE_A),
  ],
});

const MODULE_COUNT = 7;
const MODULES = [
  ENTRY_ZERO,
  ENTRY_ONE,
  ZERO_A,
  COMMON,
  BIG_MODULE,
  ENTRY_ONE_A,
  ENTRY_ONE_B,
];

describe('getExtendedModulesById', () => {
  it('should extend all the modules', () => {
    const modulesById = getResults(MODULES);

    expect({
      ...modulesById[ENTRY_ZERO.id],
      cumulativeSize: 0, // reset value
      requirements: [], // reset value
      requirementsCount: 0, // reset value
    }).toEqual(defaultExtendedModule(ENTRY_ZERO));
    expect(modulesById).toMatchSnapshot();
  });

  it('should have the right fixture sizes', () => {
    expect(MODULES.map((module) => module.size)).toEqual([
      100, 100, 250, 200, 1000, 600, 300,
    ]);
  });

  it('should have the right cumulative sizes', () => {
    const modulesById = getResults(MODULES);

    expect(modulesById[ENTRY_ZERO.id].cumulativeSize).toBe(1200);
    expect(modulesById[ENTRY_ONE.id].cumulativeSize).toBe(1350);
    expect(modulesById[ZERO_A.id].cumulativeSize).toBe(750);
    expect(modulesById[COMMON.id].cumulativeSize).toBe(700);
    expect(modulesById[BIG_MODULE.id].cumulativeSize).toBe(1000);
    expect(modulesById[ENTRY_ONE_A.id].cumulativeSize).toBe(900);
    expect(modulesById[ENTRY_ONE_B.id].cumulativeSize).toBe(300);
  });

  it('should return the `size` as cumulative for modules without requirements', () => {
    const modulesById = getResults(MODULES);

    const modulesWithoutRequirements = [ENTRY_ONE_B.id, BIG_MODULE.id];

    modulesWithoutRequirements.forEach((id) => {
      expect(modulesById[id].size).toBeGreaterThan(0);
      expect(modulesById[id].cumulativeSize).toBe(modulesById[id].size);
    });
  });

  it('the sum of the extended modules should make sense', () => {
    const modulesById = getResults(MODULES);

    // $FlowFixMe: flow thinks `values` returns `Array<mixed>`
    const resultValues: Array<ExtendedModule> = Object.values(modulesById);

    const sumSizes = resultValues.reduce((sum, eModule) => {
      return sum + eModule.size;
    }, 0);

    const nothingRequires = resultValues.filter((eModule) => {
      return eModule.requiredByCount === 0;
    });
    const sumCumulativeTopLevelSizes = nothingRequires.reduce((sum, eModule) => {
      return sum + eModule.cumulativeSize;
    }, 0);

    const SUM_OF_ALL_MODULES = 2550;
    expect(sumSizes).toBeCloseTo(SUM_OF_ALL_MODULES);
    expect(sumCumulativeTopLevelSizes).toBe(SUM_OF_ALL_MODULES);
    expect(sumSizes).toBe(sumCumulativeTopLevelSizes);
  });

  it('should extend all the trimmed modules', () => {
    const modulesById = getResults(MODULES);

    // $FlowFixMe: flow thinks `values` returns `Array<mixed>`
    const resultValues: Array<ExtendedModule> = Object.values(modulesById);

    const trimResults = resultValues.map((module: ExtendedModule) => {
      return {
        id: module.id,
        identifier: module.identifier,
        size: module.size,
        cumulativeSize: module.cumulativeSize,
        requiredByCount: module.requiredByCount,
        requirements: module.requirements.map((requirement) => {
          const rModule = modulesById[requirement.id];
          return {
            id: rModule.id,
            identifier: rModule.identifier,
            size: rModule.size,
            cumulativeSize: rModule.cumulativeSize,
            requiredByCount: rModule.requiredByCount,
            contributingSize: rModule.cumulativeSize / rModule.requiredByCount,
          };
        }),
      };
    });

    expect(trimResults).toMatchSnapshot();
  });
});

function getResults(modules) {
  const modulesById = calculateModuleSizes(getExtendedModulesById(modules));
  if (!modulesById) {
    throw Error('getExtendedModulesById returned null which was not expected');
  }

  expect(modulesById).not.toBeNull();
  expect(Object.keys(modulesById)).toHaveLength(MODULE_COUNT);

  return modulesById;
}
