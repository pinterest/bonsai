/**
 * @flow
 */

import App from '../App';
import React from 'react';
import { storiesOf } from '@storybook/react';

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
      onInitDataPaths={() => undefined}
      onPickedFile={() => undefined}
      onLoadingFailed={() => undefined}
      onLoaded={() => undefined}
      onDroppedFile={() => undefined}
    />
  ))
  .add('FileInput stacked on Stats', () => (
    <App
      dataPaths={[]}
      filename={'stats.json'}
      loading={false}
      json={stats}
      onInitDataPaths={() => undefined}
      onPickedFile={() => undefined}
      onLoadingFailed={() => undefined}
      onLoaded={() => undefined}
      onDroppedFile={() => undefined}
    />
  ));
