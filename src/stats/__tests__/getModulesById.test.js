/*
 * @flow
 */

import {defaultExtendedModule} from '../../__test_helpers__/defaults';
import getModulesById from '../getModulesById';

const stats = {
  modules: [
    defaultExtendedModule({id: 1}),
    defaultExtendedModule({id: 2}),
  ],
};

describe('getModulesById', () => {
  it('should list all the chunks', () => {
    const result = getModulesById(stats.modules);

    expect(Object.keys(result)).toHaveLength(2);
    expect(result).toMatchSnapshot();
  });
});
