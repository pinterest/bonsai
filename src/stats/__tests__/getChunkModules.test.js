/*
 * @flow
 */

import stats from './fixtures/stats-2017-03-13.json';

import type {ExtendedModule} from '../../types/Stats';

import getChunkModules from '../getChunkModules';

const selectedChunkId = 195;

describe('getChunkModules', () => {
  it('should extend all the modules', () => {
    const selectedChunkId = 195;
    const modules = getChunkModules(stats, selectedChunkId);

    expect(modules).not.toBeNull();
    expect(modules).toHaveLength(21);
  });
});
