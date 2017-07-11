/**
 * @flow
 */

import type {RawStats} from '../../types/Stats';

import React from 'react';
import { storiesOf } from '@storybook/react';

import App from '../App';

const stats = {
  chunks: [],
  modules: [],
};

storiesOf('App', module)
  .add('Default View', () => (
    <App
      dataPaths={[]}
      filename={null}
      loading={false}
      json={null}
      onInitDataPaths={(paths) => undefined}
      onPickedFile={() => undefined}
      onLoadingFailed={() => undefined}
      onLoaded={function(filename, stats) {}}
      onDroppedFile={function(filename, fileText) {}}
    />
  ))
  .add('FileInput stacked on Stats', () => (
    <App
      dataPaths={[]}
      filename={'stats.json'}
      loading={false}
      json={stats}
      onInitDataPaths={(paths) => undefined}
      onPickedFile={() => undefined}
      onLoadingFailed={() => undefined}
      onLoaded={function(filename, stats) {}}
      onDroppedFile={function(filename, fileText) {}}
    />
  ));
