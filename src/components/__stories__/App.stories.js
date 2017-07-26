/**
 * @flow
 */

import type {RawStats} from '../../types/Stats';

import App from '../App';
import handleAction from '../../reducer';
import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react';

const stats = {
  chunks: [],
  modules: [],
};

const store = createStore(handleAction);

storiesOf('App', module)
  .add('Default View', () => (
    <Provider store={store}>
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
    </Provider>
  ))
  .add('FileInput stacked on Stats', () => (
    <Provider store={store}>
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
    </Provider>
  ));
