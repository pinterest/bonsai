/**
 * @flow
 */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import formatModuleName from '../formatModuleName';

const fixtures = {
  'plain filepath': 'components/stats/__stories__/formatModuleName.stories.js',
  'node module': './~/react-dev-utils/webpackHotDevClient.js',
  'loader': './~/html-webpack-plugin/lib/loader.js!./public/index.html',
  'loader with query': "./node_modules/babel-loader/lib/index.js?{\"babelrc\":false,\"presets\":[\"./node_modules/react-scripts/node_modules/babel-preset-react-app/index.js\"],\"cacheDirectory\":true}!./node_modules/eslint-loader/index.js!./src/index.js",
  'multi': 'multi main',
  'main and loader with query': "main ./node_modules/babel-loader/lib/index.js?{\"babelrc\":false,\"presets\":[\"./node_modules/react-scripts/node_modules/babel-preset-react-app/index.js\"],\"cacheDirectory\":true}!./node_modules/eslint-loader/index.js!./src/index.js",
  'delegated dll': 'delegated ./node_modules/classnames/index.js from dll-reference vendor'
};

const stories = storiesOf('formatModuleName', module);

Object.keys(fixtures).forEach((key) =>
  stories.add(key, () => (
    <span>
      {formatModuleName(fixtures[key])}
    </span>
)));
