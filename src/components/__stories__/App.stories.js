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
      loading={false}
      filename={null}
      json={null}
      onLoading={function() {}}
      onLoaded={function(filename: ?string, stats: ?RawStats) {}}
    />
  ))
  .add('FileInput stacked on Stats', () => (
    <div>
      <aside className="container-fluid">
        <FileInputContainer
          filename={'stats.json'}
          onLoading={() => undefined}
          onLoaded={() => undefined}
        />
      </aside>
      <Stats json={stats} />
    </div>
  ));
