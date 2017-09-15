/**
 * @flow
 */

import App from '../App';
import handleAction from '../../reducer';
import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

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
      onInitDataPaths={action('on init data paths')}
      onPickedFile={action('on picked file')}
      onLoadingFailed={action('on loading failed')}
      onLoaded={action('on loaded')}
      onDroppedFile={action('on dropped file')}
    />
  ))
  .add('FileInput stacked on Stats', () => (
    <Provider store={createStore(handleAction)}>
      <App
        dataPaths={[]}
        filename={'stats.json'}
        loading={false}
        json={stats}
        onInitDataPaths={action('on init data paths')}
        onPickedFile={action('on picked file')}
        onLoadingFailed={action('on loading failed')}
        onLoaded={action('on loaded')}
        onDroppedFile={action('on dropped file')}
      />
    </Provider>
  ));
