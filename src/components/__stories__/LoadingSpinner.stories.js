/**
 * @flow
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';

import LoadingSpinner from '../LoadingSpinner';

storiesOf('LoadingSpinner', module)
  .add('Default', () => (
    <LoadingSpinner />
  ));
