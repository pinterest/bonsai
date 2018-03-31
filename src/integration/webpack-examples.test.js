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

function testWithFile(
  testName: string,
  fileName: string,
  callback: (rawStats: Array<RawStats>) => void,
): void {
  try {
    const configs = openExampleStats(fileName);
    it(testName, () => {
      callback(configs);
    });
  } catch (error) {
    // eslint-disable-next-line jest/no-identical-title, jest/no-disabled-tests
    it.skip(testName, () => {
      // empty
    });
  }
}

testWithFile(
  'stats-0-vendor should pass',
  'stats-0-vendor',
  () => {
    const configs = openExampleStats('stats-0-vendor');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 2});
  }
);

testWithFile(
  'stats-1-app should pass',
  'stats-1-app',
  () => {
    const configs = openExampleStats('stats-1-app');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3});
  }
);

testWithFile(
  'stats-aggressive-merging should pass',
  'stats-aggressive-merging',
  () => {
    const configs = openExampleStats('stats-aggressive-merging');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 2, '3': 2, '4': 1});
  }
);

testWithFile(
  'stats-chunkhash should pass',
  'stats-chunkhash',
  () => {
    const configs = openExampleStats('stats-chunkhash');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 4, '2': 2, '3': 3, '4': 0});
  }
);

testWithFile(
  'stats-code-splitted-css-bundle should pass',
  'stats-code-splitted-css-bundle',
  () => {
    const configs = openExampleStats('stats-code-splitted-css-bundle');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 9, '1': 5});
  }
);

testWithFile(
  'stats-code-splitted-require.context-amd should pass',
  'stats-code-splitted-require.context-amd',
  () => {
    const configs = openExampleStats('stats-code-splitted-require.context-amd');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 1});
  }
);

testWithFile(
  'stats-code-splitted-require.context should pass',
  'stats-code-splitted-require.context',
  () => {
    const configs = openExampleStats('stats-code-splitted-require.context');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 1});
  }
);

testWithFile(
  'stats-code-splitting-bundle-loader should pass',
  'stats-code-splitting-bundle-loader',
  () => {
    const configs = openExampleStats('stats-code-splitting-bundle-loader');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 2});
  }
);

testWithFile(
  'stats-code-splitting-harmony should pass',
  'stats-code-splitting-harmony',
  () => {
    const configs = openExampleStats('stats-code-splitting-harmony');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 4, '2': 4, '3': 3});
  }
);

testWithFile(
  'stats-code-splitting-native-import-context should pass',
  'stats-code-splitting-native-import-context',
  () => {
    const configs = openExampleStats('stats-code-splitting-native-import-context');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 3, '3': 2});
  }
);

testWithFile(
  'stats-code-splitting-specify-chunk-name should pass',
  'stats-code-splitting-specify-chunk-name',
  () => {
    const configs = openExampleStats('stats-code-splitting-specify-chunk-name');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 3, '3': 2});
  }
);

testWithFile(
  'stats-code-splitting should pass',
  'stats-code-splitting',
  () => {
    const configs = openExampleStats('stats-code-splitting');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 3});
  }
);

testWithFile(
  'stats-coffee-script should pass',
  'stats-coffee-script',
  () => {
    const configs = openExampleStats('stats-coffee-script');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3});
  }
);

testWithFile(
  'stats-common-chunk-and-vendor-chunk should pass',
  'stats-common-chunk-and-vendor-chunk',
  () => {
    const configs = openExampleStats('stats-common-chunk-and-vendor-chunk');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 7, '2': 6, '3': 6, '4': 3});
  }
);

testWithFile(
  'stats-common-chunk-grandchildren should pass',
  'stats-common-chunk-grandchildren',
  () => {
    const configs = openExampleStats('stats-common-chunk-grandchildren');
    expect(configs).toHaveConfigs(2);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 4, '2': 4, '3': 3});
    expect(configs[1]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 3, '3': 4, '4': 2});
  }
);

testWithFile(
  'stats-commonjs should pass',
  'stats-commonjs',
  () => {
    const configs = openExampleStats('stats-commonjs');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3});
  }
);

testWithFile(
  'stats-css-bundle should pass',
  'stats-css-bundle',
  () => {
    const configs = openExampleStats('stats-css-bundle');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 2});
  }
);

testWithFile(
  'stats-dll-user should pass',
  'stats-dll-user',
  () => {
    const configs = openExampleStats('stats-dll-user');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 9});
  }
);

testWithFile(
  'stats-dll should pass',
  'stats-dll',
  () => {
    const configs = openExampleStats('stats-dll');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 4});
  }
);

testWithFile(
  'stats-explicit-vendor-chunk should pass',
  'stats-explicit-vendor-chunk',
  () => {
    const configs = openExampleStats('stats-explicit-vendor-chunk');
    expect(configs).toHaveConfigs(2);
    expect(configs[0]).toHaveChunksWithModules({'0': 3});
    expect(configs[1]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 1});
  }
);

testWithFile(
  'stats-externals should pass',
  'stats-externals',
  () => {
    const configs = openExampleStats('stats-externals');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3});
  }
);

testWithFile(
  'stats-extra-async-chunk-advanced should pass',
  'stats-extra-async-chunk-advanced',
  () => {
    const configs = openExampleStats('stats-extra-async-chunk-advanced');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 2, '1': 2, '2': 2, '3': 2, '4': 2, '5': 3, '6': 3, '7': 1});
  }
);

testWithFile(
  'stats-extra-async-chunk should pass',
  'stats-extra-async-chunk',
  () => {
    const configs = openExampleStats('stats-extra-async-chunk');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 2, '2': 2, '3': 1});
  }
);

testWithFile(
  'stats-harmony-interop should pass',
  'stats-harmony-interop',
  () => {
    const configs = openExampleStats('stats-harmony-interop');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5});
  }
);

testWithFile(
  'stats-harmony-library should pass',
  'stats-harmony-library',
  () => {
    const configs = openExampleStats('stats-harmony-library');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 1});
  }
);

testWithFile(
  'stats-harmony-unused should pass',
  'stats-harmony-unused',
  () => {
    const configs = openExampleStats('stats-harmony-unused');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4});
  }
);

testWithFile(
  'stats-harmony should pass',
  'stats-harmony',
  () => {
    const configs = openExampleStats('stats-harmony');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 3});
  }
);

testWithFile(
  'stats-http2-aggressive-splitting should pass',
  'stats-http2-aggressive-splitting',
  () => {
    const configs = openExampleStats('stats-http2-aggressive-splitting');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 38, '1': 32, '10': 19, '11': 19, '12': 15, '13': 13, '14': 3, '2': 32, '3': 31, '4': 30, '5': 26, '6': 26, '7': 24, '8': 21, '9': 21});
  }
);

testWithFile(
  'stats-hybrid-routing should pass',
  'stats-hybrid-routing',
  () => {
    const configs = openExampleStats('stats-hybrid-routing');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 6, '1': 6, '2': 7, '3': 7, '4': 5});
  }
);

testWithFile(
  'stats-i18n should pass',
  'stats-i18n',
  () => {
    const configs = openExampleStats('stats-i18n');
    expect(configs).toHaveConfigs(2);
    expect(configs[0]).toHaveChunksWithModules({'0': 1});
    expect(configs[1]).toHaveChunksWithModules({'0': 1});
  }
);

testWithFile(
  'stats-loader should pass',
  'stats-loader',
  () => {
    const configs = openExampleStats('stats-loader');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4});
  }
);

testWithFile(
  'stats-mixed should pass',
  'stats-mixed',
  () => {
    const configs = openExampleStats('stats-mixed');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 8, '1': 4});
  }
);

testWithFile(
  'stats-move-to-parent should pass',
  'stats-move-to-parent',
  () => {
    const configs = openExampleStats('stats-move-to-parent');
    expect(configs).toHaveConfigs(4);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 4, '2': 3, '3': 2, '4': 1});
    expect(configs[1]).toHaveChunksWithModules({'0': 5, '1': 4, '2': 3, '3': 2});
    expect(configs[2]).toHaveChunksWithModules({'0': 5, '1': 4, '2': 3});
    expect(configs[3]).toHaveChunksWithModules({'0': 5, '1': 4});
  }
);

testWithFile(
  'stats-multi-compiler should pass',
  'stats-multi-compiler',
  () => {
    const configs = openExampleStats('stats-multi-compiler');
    expect(configs).toHaveConfigs(2);
    expect(configs[0]).toHaveChunksWithModules({'0': 2});
    expect(configs[1]).toHaveChunksWithModules({'0': 1});
  }
);

testWithFile(
  'stats-multi-part-library should pass',
  'stats-multi-part-library',
  () => {
    const configs = openExampleStats('stats-multi-part-library');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 1, '1': 1});
  }
);

testWithFile(
  'stats-multiple-commons-chunks should pass',
  'stats-multiple-commons-chunks',
  () => {
    const configs = openExampleStats('stats-multiple-commons-chunks');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 4, '2': 4, '3': 3, '4': 3, '5': 4, '6': 4, '7': 2, '8': 1});
  }
);

testWithFile(
  'stats-multiple-entry-points-commons-chunk-css-bundle should pass',
  'stats-multiple-entry-points-commons-chunk-css-bundle',
  () => {
    const configs = openExampleStats('stats-multiple-entry-points-commons-chunk-css-bundle');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 3, '2': 2, '3': 1});
  }
);

testWithFile(
  'stats-multiple-entry-points should pass',
  'stats-multiple-entry-points',
  () => {
    const configs = openExampleStats('stats-multiple-entry-points');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 3, '1': 2, '2': 2, '3': 1});
  }
);

testWithFile(
  'stats-named-chunks should pass',
  'stats-named-chunks',
  () => {
    const configs = openExampleStats('stats-named-chunks');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5, '1': 4, '2': 2});
  }
);

testWithFile(
  'stats-require.context should pass',
  'stats-require.context',
  () => {
    const configs = openExampleStats('stats-require.context');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 5});
  }
);

testWithFile(
  'stats-require.resolve should pass',
  'stats-require.resolve',
  () => {
    const configs = openExampleStats('stats-require.resolve');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 2});
  }
);

testWithFile(
  'stats-scope-hoisting should pass',
  'stats-scope-hoisting',
  () => {
    const configs = openExampleStats('stats-scope-hoisting');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 2});
  }
);

testWithFile(
  'stats-source-map should pass',
  'stats-source-map',
  () => {
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
  }
);

testWithFile(
  'stats-two-explicit-vendor-chunks should pass',
  'stats-two-explicit-vendor-chunks',
  () => {
    const configs = openExampleStats('stats-two-explicit-vendor-chunks');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 4, '1': 5, '2': 5, '3': 5, '4': 2});
  }
);

testWithFile(
  'stats-web-worker should pass',
  'stats-web-worker',
  () => {
    const configs = openExampleStats('stats-web-worker');
    expect(configs).toHaveConfigs(1);
    expect(configs[0]).toHaveChunksWithModules({'0': 2});
  }
);
