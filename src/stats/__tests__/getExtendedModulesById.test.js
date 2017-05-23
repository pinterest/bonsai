/*
 * @flow
 */

import stats from './__fixtures__/stats.json';

import type {ExtendedModule} from '../../types/Stats';

import getChunkModules from '../getChunkModules';
import getExtendedModulesById, {calculateModuleSizes} from '../getExtendedModulesById';

describe.skip('getExtendedModulesById', () => {
  it('should extend all the modules', () => {
    const modulesById = getResults();

    expect(modulesById).toMatchSnapshot();
  });

  it('should return the `size` as cumulative for modules without requirements', () => {
    const modulesById = getResults();

    const modulesWithoutRequirements = [
      831, // errorLog
      846, // ClickCapturer
      3134, // ViewportScale
    ];

    modulesWithoutRequirements.forEach((id) => {
      expect(modulesById[id].size).toBeGreaterThan(0);
      expect(modulesById[id].cumulativeSize).toBe(modulesById[id].size);
    });
  });

  it('the sum of the extended modules should make sense', () => {
    const modulesById = getResults();

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

    expect(sumSizes).toBeCloseTo(6735);
    expect(sumCumulativeTopLevelSizes).toBe(6735);
    expect(sumSizes).toBe(sumCumulativeTopLevelSizes);
  });

  it('should extend all the modules', () => {
    const modulesById = getResults();

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

function getResults() {
  const selectedChunkId = 195;

  const modules = getChunkModules(stats, selectedChunkId, []);
  if (!modules) {
    throw Error('getChunkModules returned null which was not expected');
  }

  const modulesById = calculateModuleSizes(getExtendedModulesById(modules));
  if (!modulesById) {
    throw Error('getExtendedModulesById returned null which was not expected');
  }

  expect(modulesById).not.toBeNull();
  expect(Object.keys(modulesById)).toHaveLength(21);

  return modulesById;
}
