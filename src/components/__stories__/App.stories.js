/**
 * @flow
 */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import App from '../App';
import FileInputRow from '../FileInputRow';
import Stats from '../Stats';

const stats = {
  assets: [],
  entrypoints: {},
  chunks: [],
  modules: [],
};

storiesOf('App', module)
  .add('Default View', () => (
    <App />
  ))
  .add('FileInput stacked on Stats', () => (
    <div>
      <aside className="container-fluid">
        <FileInputRow
          filename={'stats.json'}
          onLoading={() => undefined}
          onLoaded={() => undefined}
        />
      </aside>
      <Stats json={stats} />
    </div>
  ));
