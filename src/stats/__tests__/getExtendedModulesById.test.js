/*
 * @flow
 */

import stats from '../../../public/data/stats-2017-03-13.json';

import getExtendedModulesById from '../getExtendedModulesById';

describe('getExtendedModulesById', () => {
  it('should extend all the modules', () => {
    const selectedChunkId = 195;
    const result = getExtendedModulesById(stats, selectedChunkId);

    expect(Object.keys(result)).toHaveLength(21);
    expect(result).toMatchSnapshot();
  });

  it('should return sizes for all the requested modules', () => {
    const result = getResults();

    expect(Object.keys(result)).toHaveLength(21);
  });

  it('should return the `size` as cumulative for modules without requirements', () => {
    const result = getResults();

    const modulesWithoutRequirements = [
      831, // errorLog
      846, // ClickCapturer
      3134, // ViewportScale
    ];

    modulesWithoutRequirements.forEach((id) => {
      expect(result[id].size).toBeGreaterThan(0);
      expect(result[id].cumulativeSize).toBe(result[id].size);
    });
  });

  it('the sum of the extended modules should make sense', () => {
    const result = getResults();

    expect(Object.keys(result)).toHaveLength(21);

    const resultValues: Array<ExtendedModule> = Object.values(result);

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
    const result = getResults();

    expect(Object.keys(result)).toHaveLength(21);

    const resultValues: Array<ExtendedModule> = Object.values(result);

    const trimResults = resultValues.map((module: ExtendedModule) => {
      return {
        id: module.id,
        identifier: module.identifier,
        size: module.size,
        cumulativeSize: module.cumulativeSize,
        requiredByCount: module.requiredByCount,
        requirements: module.requirements.map((requirement) => {
          const rModule = result[requirement.id];
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
  const testData = getExtendedModulesById(stats, selectedChunkId);

  if (!testData) {
    throw Error('getExtendedModulesById returned null which was not expected');
  }

  return testData;
}
