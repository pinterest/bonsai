/*
 * @flow
 */

import getModulesById from '../getModulesById';
import getExtendedModulesById from '../getExtendedModulesById';
import splitUnreachableModules from '../splitUnreachableModules';
import {
  defaultExtendedModule,
  reasonFromModule,
} from '../../__test_helpers__/defaults';

const ENTRY_ZERO = defaultExtendedModule({
  id: 0,
  name: 'Entry Zero',
  size: 100,
  reasons: [],
});

const ENTRY_ONE = defaultExtendedModule({
  id: 1,
  name: 'Entry One',
  size: 100,
  reasons: [],
});

const ZERO_A = defaultExtendedModule({
  id: 2,
  name: 'Module Zero-A',
  size: 250,
  reasons: [
    reasonFromModule(ENTRY_ZERO),
  ],
});

const COMMON = defaultExtendedModule({
  id: 3,
  name: 'Module Common',
  size: 200,
  reasons: [
    reasonFromModule(ENTRY_ZERO),
    reasonFromModule(ENTRY_ONE),
  ],
});

const BIG_MODULE = defaultExtendedModule({
  id: 5,
  name: 'Big Module',
  size: 1000,
  reasons: [
    reasonFromModule(ZERO_A),
    reasonFromModule(COMMON),
  ],
});

const ENTRY_ONE_A = defaultExtendedModule({
  id: 600,
  name: 'Module One-A',
  size: 600,
  reasons: [
    reasonFromModule(ENTRY_ONE),
  ],
});

const ENTRY_ONE_B = defaultExtendedModule({
  id: 300,
  name: 'Module One-B',
  size: 300,
  reasons: [
    reasonFromModule(ENTRY_ONE_A),
  ],
});

const MODULES = [
  ENTRY_ZERO,
  ENTRY_ONE,
  ZERO_A,
  COMMON,
  BIG_MODULE,
  ENTRY_ONE_A,
  ENTRY_ONE_B,
];
const MODULES_BY_ID = getModulesById(MODULES);

function linkRequirements(modules) {
  const modulesById = getModulesById(modules);
  modules.forEach((module) => {
    module.reasons.forEach((reason) => {
      const parent = modulesById[reason.moduleId];
      if (parent) {
        parent.requirements.push(module);
      }
    });
  });
}

linkRequirements(MODULES);

describe('splitUnreachableModules', () => {
  describe('setup', () => {
    it('should have wired up the requirements field', () => {
      expect(ENTRY_ZERO).toEqual(expect.objectContaining({
        requirements: [ZERO_A, COMMON],
      }));

      expect(ENTRY_ONE).toEqual(expect.objectContaining({
        requirements: [COMMON, ENTRY_ONE_A],
      }));

      expect(ZERO_A).toEqual(expect.objectContaining({
        requirements: [BIG_MODULE],
      }));

      expect(COMMON).toEqual(expect.objectContaining({
        requirements: [BIG_MODULE],
      }));

      expect(BIG_MODULE).toEqual(expect.objectContaining({
        requirements: [],
      }));

      expect(ENTRY_ONE_A).toEqual(expect.objectContaining({
        requirements: [ENTRY_ONE_B],
      }));

      expect(ENTRY_ONE_B).toEqual(expect.objectContaining({
        requirements: [],
      }));
    });
  });

  it('should not split anything when nothing is black listed', () => {
    const result = splitUnreachableModules(MODULES_BY_ID, []);

    expect(result.included).toHaveLength(7);
    expect(result.removed).toHaveLength(0);
  });

  it('should remove blacklisted leaf modules', () => {
    const result = splitUnreachableModules(MODULES_BY_ID, [
      ENTRY_ONE_B.id,
    ]);

    expect(result.included).toHaveLength(6);
    expect(result.removed).toHaveLength(1);
    expect(result.removed).toEqual([
      expect.objectContaining({id: ENTRY_ONE_B.id}),
    ]);
  });

  it('should remove multiple blacklisted leaf modules', () => {
    const result = splitUnreachableModules(MODULES_BY_ID, [
      ENTRY_ONE_B.id,
      BIG_MODULE.id,
    ]);

    expect(result.included).toHaveLength(5);
    expect(result.removed).toHaveLength(2);
    expect(result.removed).toEqual([
      expect.objectContaining({id: BIG_MODULE.id}),
      expect.objectContaining({id: ENTRY_ONE_B.id}),
    ]);
  });

  it('should remove a child when the parent is gone', () => {
    const result = splitUnreachableModules(MODULES_BY_ID, [
      ENTRY_ONE_A.id,
    ]);

    expect(result.included).toHaveLength(5);
    expect(result.removed).toHaveLength(2);
    expect(result.removed).toEqual([
      expect.objectContaining({id: ENTRY_ONE_B.id}),
      expect.objectContaining({id: ENTRY_ONE_A.id}),
    ]);
  });

  it('should remove both child and parent when specified', () => {
    const result = splitUnreachableModules(MODULES_BY_ID, [
      ENTRY_ONE_A.id,
      ENTRY_ONE_B.id,
    ]);

    expect(result.included).toHaveLength(5);
    expect(result.removed).toHaveLength(2);
    expect(result.removed).toEqual([
      expect.objectContaining({id: ENTRY_ONE_B.id}),
      expect.objectContaining({id: ENTRY_ONE_A.id}),
    ]);
  });

  it('should remove down to a merge, but not further', () => {
    const result = splitUnreachableModules(MODULES_BY_ID, [
      ENTRY_ZERO.id,
    ]);

    expect(result.included).toHaveLength(5);
    expect(result.removed).toHaveLength(2);
    expect(result.removed).toEqual([
      expect.objectContaining({id: ENTRY_ZERO.id}),
      expect.objectContaining({id: ZERO_A.id}),
    ]);
  });

  it('should remove everything when the top level is specified', () => {
    const result = splitUnreachableModules(MODULES_BY_ID, [
      ENTRY_ZERO.id,
      ENTRY_ONE.id,
    ]);

    expect(result.included).toHaveLength(0);
    expect(result.removed).toHaveLength(7);
    expect(result.removed).toEqual([
      expect.objectContaining({id: ENTRY_ZERO.id}),
      expect.objectContaining({id: ENTRY_ONE.id}),
      expect.objectContaining({id: ZERO_A.id}),
      expect.objectContaining({id: COMMON.id}),
      expect.objectContaining({id: BIG_MODULE.id}),
      expect.objectContaining({id: ENTRY_ONE_B.id}),
      expect.objectContaining({id: ENTRY_ONE_A.id}),
    ]);
  });

  describe('big data', () => {
    it('should be able to iterate over many modules', () => {
      const two: Object = require('../../../dev-server/api/two.json');

      const result = splitUnreachableModules(getExtendedModulesById(two.modules), [
        14, // node_modules/lodash-es/isPlainObject.js
      ]);

      expect(result.included).toHaveLength(272);
      expect(result.removed).toHaveLength(1);
    });
  });
});
