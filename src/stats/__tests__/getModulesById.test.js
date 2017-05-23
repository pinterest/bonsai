/*
 * @flow
 */

import stats from './__fixtures__/stats.json';

import getModulesById from '../getModulesById';

describe.skip('getModulesById', () => {
  it('should list all the chunks', () => {
    const result = getModulesById(stats.modules.slice(0, 10));

    expect(Object.keys(result)).toHaveLength(10);
    expect(result).toMatchSnapshot();
  });
});
