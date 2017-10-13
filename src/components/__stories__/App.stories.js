/**
 * @flow
 */

import App from '../App';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const stats = {
  chunks: [],
  modules: [],
};

storiesOf('App', module)
  .add('No filename, empty list', () => (
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
  .add('No filename, items in list', () => (
    <App
      dataPaths={['stats.json']}
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
  .add('Filename picked, loading', () => (
    <App
      dataPaths={['stats.json']}
      filename={'stats.json'}
      loading={true}
      json={null}
      onInitDataPaths={action('on init data paths')}
      onPickedFile={action('on picked file')}
      onLoadingFailed={action('on loading failed')}
      onLoaded={action('on loaded')}
      onDroppedFile={action('on dropped file')}
    />
  ))
  .add('Filename picked, data available', () => (
    <App
      dataPaths={['stats.json']}
      filename={'stats.json'}
      loading={false}
      json={stats}
      onInitDataPaths={action('on init data paths')}
      onPickedFile={action('on picked file')}
      onLoadingFailed={action('on loading failed')}
      onLoaded={action('on loaded')}
      onDroppedFile={action('on dropped file')}
    />
  ));
