/*
 * @flow
 */

import type {ChunkID} from '../types/Stats';

import {openRawStatsFile} from '../cli/fileSystemHelper';
import fullModuleData from '../stats/fullModuleData';
import getEntryChunks from '../stats/getEntryChunks';

function openExampleStats(name: string): Array<RawStats> {
  return openRawStatsFile(`./dev-server/api/built-webpack-examples/${name}.json`);
}

expect.extend({
  toHaveConfigs(configs: Array<RawStats>, count: number) {
    const pass = configs.length === count;

    const message = pass
      ? () => `expected config not to export ${count} configs, found ${configs.length}`
      : () => `expected config to export ${count} configs, found ${configs.length}`;

    return {actual: configs.length, message, pass};
  },

  toHaveChunksWithModules(stats: RawStats, chunkModuleMap: {[ChunkID]: number}) {
    const entryChunks = getEntryChunks(stats);
    const actualMap = entryChunks.map((chunk) => chunk.id).reduce((map, chunkId) => {
      const fullData = fullModuleData(stats, chunkId, []);
      return {
        ...map,
        [chunkId]: fullData.moduleData
          ? fullData.moduleData.included.length
          : null
      };
    }, {});

    const pass = this.equals(actualMap, chunkModuleMap);

    const message = pass
      ? () => `expected ${this.utils.printReceived(actualMap)} not to match ${this.utils.printExpected(chunkModuleMap)}`
      : () => `expected ${this.utils.printReceived(actualMap)} to match ${this.utils.printExpected(chunkModuleMap)}`;

    return {actual: actualMap, message, pass};
  },
});

function runTests() {
  it('stats-0-vendor should pass', () => {
    const configs = openExampleStats('stats-0-vendor');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 2});
  });

  it('stats-1-app should pass', () => {
    const configs = openExampleStats('stats-1-app');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3});
  });

  it('stats-aggressive-merging should pass', () => {
    const configs = openExampleStats('stats-aggressive-merging');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 2, '3': 2, '4': 1});
  });

  it('stats-chunkhash should pass', () => {
    const configs = openExampleStats('stats-chunkhash');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 4, '2': 2, '3': 3, '4': 0});
  });

  it('stats-code-splitted-css-bundle should pass', () => {
    const configs = openExampleStats('stats-code-splitted-css-bundle');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 9, '1': 5});
  });

  it('stats-code-splitted-require.context-amd should pass', () => {
    const configs = openExampleStats('stats-code-splitted-require.context-amd');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 1});
  });

  it('stats-code-splitted-require.context should pass', () => {
    const configs = openExampleStats('stats-code-splitted-require.context');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 1});
  });

  it('stats-code-splitting-bundle-loader should pass', () => {
    const configs = openExampleStats('stats-code-splitting-bundle-loader');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 2});
  });

  it('stats-code-splitting-harmony should pass', () => {
    const configs = openExampleStats('stats-code-splitting-harmony');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 4, '2': 4, '3': 3});
  });

  it('stats-code-splitting-native-import-context should pass', () => {
    const configs = openExampleStats('stats-code-splitting-native-import-context');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 3, '3': 2});
  });

  it('stats-code-splitting-specify-chunk-name should pass', () => {
    const configs = openExampleStats('stats-code-splitting-specify-chunk-name');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 3, '3': 2});
  });

  it('stats-code-splitting should pass', () => {
    const configs = openExampleStats('stats-code-splitting');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 3});
  });

  it('stats-coffee-script should pass', () => {
    const configs = openExampleStats('stats-coffee-script');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3});
  });

  it('stats-common-chunk-and-vendor-chunk should pass', () => {
    const configs = openExampleStats('stats-common-chunk-and-vendor-chunk');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 7, '2': 6, '3': 6, '4': 3});
  });

  it('stats-common-chunk-grandchildren should pass', () => {
    const configs = openExampleStats('stats-common-chunk-grandchildren');
    expect(configs).toHaveConfigs(2);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 4, '2': 4, '3': 3});
    expect(configs[1]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 3, '3': 4, '4': 2});
  });

  it('stats-commonjs should pass', () => {
    const configs = openExampleStats('stats-commonjs');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3});
  });

  it('stats-css-bundle should pass', () => {
    const configs = openExampleStats('stats-css-bundle');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 2});
  });

  it('stats-dll-user should pass', () => {
    const configs = openExampleStats('stats-dll-user');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 9});
  });

  it('stats-dll should pass', () => {
    const configs = openExampleStats('stats-dll');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 4});
  });

  it('stats-explicit-vendor-chunk should pass', () => {
    const configs = openExampleStats('stats-explicit-vendor-chunk');
    expect(configs).toHaveConfigs(2);
    expect(configs[0]).toHaveChunksWithModules({'0': 3});
    expect(configs[1]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 1});
  });

  it('stats-externals should pass', () => {
    const configs = openExampleStats('stats-externals');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3});
  });

  it('stats-extra-async-chunk-advanced should pass', () => {
    const configs = openExampleStats('stats-extra-async-chunk-advanced');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 2, '1': 2, '2': 2, '3': 2, '4': 2, '5': 3, '6': 3, '7': 1});
  });

  it('stats-extra-async-chunk should pass', () => {
    const configs = openExampleStats('stats-extra-async-chunk');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 2, '2': 2, '3': 1});
  });

  it('stats-harmony-interop should pass', () => {
    const configs = openExampleStats('stats-harmony-interop');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5});
  });

  it('stats-harmony-library should pass', () => {
    const configs = openExampleStats('stats-harmony-library');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 1});
  });

  it('stats-harmony-unused should pass', () => {
    const configs = openExampleStats('stats-harmony-unused');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4});
  });

  it('stats-harmony should pass', () => {
    const configs = openExampleStats('stats-harmony');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 3});
  });

  it('stats-http2-aggressive-splitting should pass', () => {
    const configs = openExampleStats('stats-http2-aggressive-splitting');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 38, '1': 32, '10': 19, '11': 19, '12': 15, '13': 13, '14': 3, '2': 32, '3': 31, '4': 30, '5': 26, '6': 26, '7': 24, '8': 21, '9': 21});
  });

  it('stats-hybrid-routing should pass', () => {
    const configs = openExampleStats('stats-hybrid-routing');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 6, '1': 6, '2': 7, '3': 7, '4': 5});
  });

  it('stats-i18n should pass', () => {
    const configs = openExampleStats('stats-i18n');
    expect(configs).toHaveConfigs(2);
    expect(configs[0]).toHaveChunksWithModules({'0': 1});
    expect(configs[1]).toHaveChunksWithModules({'0': 1});
  });

  it('stats-loader should pass', () => {
    const configs = openExampleStats('stats-loader');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4});
  });

  it('stats-mixed should pass', () => {
    const configs = openExampleStats('stats-mixed');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 8, '1': 4});
  });

  it('stats-move-to-parent should pass', () => {
    const configs = openExampleStats('stats-move-to-parent');
    expect(configs).toHaveConfigs(4);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 4, '2': 3, '3': 2, '4': 1});
    expect(configs[1]).toHaveChunksWithModules({'0': 5, '1': 4, '2': 3, '3': 2});
    expect(configs[2]).toHaveChunksWithModules({'0': 5, '1': 4, '2': 3});
    expect(configs[3]).toHaveChunksWithModules({'0': 5, '1': 4});
  });

  it('stats-multi-compiler should pass', () => {
    const configs = openExampleStats('stats-multi-compiler');
    expect(configs).toHaveConfigs(2);
    expect(configs[0]).toHaveChunksWithModules({'0': 2});
    expect(configs[1]).toHaveChunksWithModules({'0': 1});
  });

  it('stats-multi-part-library should pass', () => {
    const configs = openExampleStats('stats-multi-part-library');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 1, '1': 1});
  });

  it('stats-multiple-commons-chunks should pass', () => {
    const configs = openExampleStats('stats-multiple-commons-chunks');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 4, '2': 4, '3': 3, '4': 3, '5': 4, '6': 4, '7': 2, '8': 1});
  });

  it('stats-multiple-entry-points-commons-chunk-css-bundle should pass', () => {
    const configs = openExampleStats('stats-multiple-entry-points-commons-chunk-css-bundle');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 2, '3': 1});
  });

  it('stats-multiple-entry-points should pass', () => {
    const configs = openExampleStats('stats-multiple-entry-points');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 2, '2': 2, '3': 1});
  });

  it('stats-named-chunks should pass', () => {
    const configs = openExampleStats('stats-named-chunks');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 4, '2': 2});
  });

  it('stats-require.context should pass', () => {
    const configs = openExampleStats('stats-require.context');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5});
  });

  it('stats-require.resolve should pass', () => {
    const configs = openExampleStats('stats-require.resolve');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 2});
  });

  it('stats-scope-hoisting should pass', () => {
    const configs = openExampleStats('stats-scope-hoisting');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 2});
  });

  it('stats-source-map should pass', () => {
    const configs = openExampleStats('stats-source-map');
    expect(configs).toHaveConfigs(10);
    expect(configs[0]).toHaveChunksWithModules({'0': 1, '1': 0});
    expect(configs[1]).toHaveChunksWithModules({'0': 1, '1': 0});
    expect(configs[2]).toHaveChunksWithModules({'0': 1, '1': 0});
    expect(configs[3]).toHaveChunksWithModules({'0': 1, '1': 0});
    expect(configs[4]).toHaveChunksWithModules({'0': 1, '1': 0});
    expect(configs[5]).toHaveChunksWithModules({'0': 1, '1': 0});
    expect(configs[6]).toHaveChunksWithModules({'0': 1, '1': 0});
    expect(configs[7]).toHaveChunksWithModules({'0': 1, '1': 0});
    expect(configs[8]).toHaveChunksWithModules({'0': 1, '1': 0});
    expect(configs[9]).toHaveChunksWithModules({'0': 1, '1': 0});
  });

  it('stats-two-explicit-vendor-chunks should pass', () => {
    const configs = openExampleStats('stats-two-explicit-vendor-chunks');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 5, '2': 5, '3': 5, '4': 2});
  });

  it('stats-web-worker should pass', () => {
    const configs = openExampleStats('stats-web-worker');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 2});
  });
}

try {
  describe('Webpack Example Integration tests', runTests);
} catch (error) {
  // eslint-disable-next-line jest/no-identical-title, jest/no-disabled-tests
  describe.skip('Webpack Example Integration tests', () => {
    // empty
  });
}
