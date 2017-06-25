/**
 * @flow
 */

import type {RawStats} from '../../types/Stats';

import React from 'react';
import { storiesOf } from '@storybook/react';

import App from '../App';
import FileInputContainer from '../FileInputContainer';
import Stats from '../Stats';

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
    />
  ))
  .add('FileInput stacked on Stats', () => (
    <div>
      <aside className="container-fluid">
        <FileInputContainer
          dataPaths={[]}
          filename={'stats.json'}
          onInitDataPaths={(paths) => undefined}
          onPickedFile={() => undefined}
          onLoadingFailed={() => undefined}
          onLoaded={function(filename, stats) {}}
        />
      </aside>
      <Stats json={stats} />
    </div>
  ));
