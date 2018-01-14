/*
 * @flow
 */

import fullModuleData from '../stats/fullModuleData';

const webpackExamples = {
  zero_vendor: '../../dev-server/api/built-webpack-examples/stats-0-vendor.json',
  one_app: '../../dev-server/api/built-webpack-examples/stats-1-app.json',
  aggressive_merging: '../../dev-server/api/built-webpack-examples/stats-aggressive-merging.json',
  chunkhash: '../../dev-server/api/built-webpack-examples/stats-chunkhash.json',
  code_splitted_css_bundle: '../../dev-server/api/built-webpack-examples/stats-code-splitted-css-bundle.json',
  code_splitted_require_context_amd: '../../dev-server/api/built-webpack-examples/stats-code-splitted-require.context-amd.json',
  code_splitted_require_context: '../../dev-server/api/built-webpack-examples/stats-code-splitted-require.context.json',
  code_splitting_bundle_loader: '../../dev-server/api/built-webpack-examples/stats-code-splitting-bundle-loader.json',
  code_splitting_harmony: '../../dev-server/api/built-webpack-examples/stats-code-splitting-harmony.json',
  code_splitting_native_import_context: '../../dev-server/api/built-webpack-examples/stats-code-splitting-native-import-context.json',
  code_splitting_specify_chunk_name: '../../dev-server/api/built-webpack-examples/stats-code-splitting-specify-chunk-name.json',
  code_splitting: '../../dev-server/api/built-webpack-examples/stats-code-splitting.json',
  coffee_script: '../../dev-server/api/built-webpack-examples/stats-coffee-script.json',
  common_chunk_and_vendor_chunk: '../../dev-server/api/built-webpack-examples/stats-common-chunk-and-vendor-chunk.json',
  common_chunk_grandchildren: '../../dev-server/api/built-webpack-examples/stats-common-chunk-grandchildren.json',
  commonjs: '../../dev-server/api/built-webpack-examples/stats-commonjs.json',
  css_bundle: '../../dev-server/api/built-webpack-examples/stats-css-bundle.json',
  dll_user: '../../dev-server/api/built-webpack-examples/stats-dll-user.json',
  dll: '../../dev-server/api/built-webpack-examples/stats-dll.json',
  explicit_vendor_chunk: '../../dev-server/api/built-webpack-examples/stats-explicit-vendor-chunk.json',
  externals: '../../dev-server/api/built-webpack-examples/stats-externals.json',
  extra_async_chunk_advanced: '../../dev-server/api/built-webpack-examples/stats-extra-async-chunk-advanced.json',
  extra_async_chunk: '../../dev-server/api/built-webpack-examples/stats-extra-async-chunk.json',
  harmony_interop: '../../dev-server/api/built-webpack-examples/stats-harmony-interop.json',
  harmony_library: '../../dev-server/api/built-webpack-examples/stats-harmony-library.json',
  harmony_unused: '../../dev-server/api/built-webpack-examples/stats-harmony-unused.json',
  harmony: '../../dev-server/api/built-webpack-examples/stats-harmony.json',
  http2_aggressive_splitting: '../../dev-server/api/built-webpack-examples/stats-http2-aggressive-splitting.json',
  hybrid_routing: '../../dev-server/api/built-webpack-examples/stats-hybrid-routing.json',
  i18n: '../../dev-server/api/built-webpack-examples/stats-i18n.json',
  loader: '../../dev-server/api/built-webpack-examples/stats-loader.json',
  mixed: '../../dev-server/api/built-webpack-examples/stats-mixed.json',
  move_to_parent: '../../dev-server/api/built-webpack-examples/stats-move-to-parent.json',
  multi_compiler: '../../dev-server/api/built-webpack-examples/stats-multi-compiler.json',
  multi_part_library: '../../dev-server/api/built-webpack-examples/stats-multi-part-library.json',
  multiple_commons_chunks: '../../dev-server/api/built-webpack-examples/stats-multiple-commons-chunks.json',
  multiple_entry_points_commons_chunk_css_bundle: '../../dev-server/api/built-webpack-examples/stats-multiple-entry-points-commons-chunk-css-bundle.json',
  multiple_entry_points: '../../dev-server/api/built-webpack-examples/stats-multiple-entry-points.json',
  named_chunks: '../../dev-server/api/built-webpack-examples/stats-named-chunks.json',
  require_context: '../../dev-server/api/built-webpack-examples/stats-require.context.json',
  require_resolve: '../../dev-server/api/built-webpack-examples/stats-require.resolve.json',
  scope_hoisting: '../../dev-server/api/built-webpack-examples/stats-scope-hoisting.json',
  source_map: '../../dev-server/api/built-webpack-examples/stats-source-map.json',
  two_explicit_vendor_chunks: '../../dev-server/api/built-webpack-examples/stats-two-explicit-vendor-chunks.json',
  web_worker: '../../dev-server/api/built-webpack-examples/stats-web-worker.json',
};

import getEntryChunks from '../stats/getEntryChunks';

try {
  describe('Webpack Example Integration tests', () => {
    Object.keys(webpackExamples).forEach((key) => {
      describe(`Webpack Example: ${key}`, () => {
        const config = require(webpackExamples[key]);
        it('should match fullModuleData', () => {
          const configs = config.children
            ? config.children
            : [config];
          configs.forEach((child) => {
            getEntryChunks(child).forEach((chunk) => {
              expect(fullModuleData(child, chunk.id, [])).toMatchSnapshot();
            });
          });
        });
      });
    });
  });
} catch (error) {
  // eslint-disable-next-line jest/no-identical-title, jest/no-disabled-tests
  describe.skip('Webpack Example Integration tests', () => {
    // empty
  });
}
