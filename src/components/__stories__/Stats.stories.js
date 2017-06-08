/**
 * @flow
 */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import Stats from '../Stats';

const stats = {
  chunks: [],
  modules: [],
};

storiesOf('Stats', module)
  .add('Shows stats for stats-2017-03-13.json', () => (
    <Stats json={stats} />
  ));
