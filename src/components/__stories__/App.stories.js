/**
 * @flow
 */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import App from '../App';
import FileInputRow from '../FileInputRow';
import stats from '../__fixtures__/stats-2017-03-13.json';
import Stats from '../Stats';

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
