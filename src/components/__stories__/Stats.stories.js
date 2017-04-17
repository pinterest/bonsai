/**
 * @flow
 */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import stats from '../__fixtures__/stats-2017-03-13.json';
import Stats from '../Stats';

storiesOf('Stats', module)
  .add('Shows stats for stats-2017-03-13.json', () => (
    <Stats json={stats} />
  ));
