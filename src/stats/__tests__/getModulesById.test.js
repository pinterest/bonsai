/*
 * @flow
 */

import stats from '../../../public/data/stats-2017-03-13.json';

import getModulesById from '../getModulesById';

describe('getModulesById', () => {
  it('should list all the chunks', () => {
    const result = getModulesById(stats.modules.slice(0, 10));

    expect(Object.keys(result)).toHaveLength(10);
    expect(result).toMatchSnapshot();
  });
});
