/**
 * @flow
 */

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
    <App />
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
