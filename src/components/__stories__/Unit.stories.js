/**
 * @flow
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Unit from '../Unit';

storiesOf('Unit', module)
  .add('2.4 Bytes (b)', () => (
    <Unit bytes={2.4} />
  ))
  .add('2.4 Kilobytes (KB)', () => (
    <Unit bytes={2400} />
  ))
  .add('2.4 Megabytes (MB)', () => (
    <Unit bytes={2400000} />
  ))
  .add('2.4 Gigabytes (GB)', () => (
    <Unit bytes={2400000000} />
  ))
  .add('2.4 Terabytes (TB)', () => (
    <Unit bytes={2400000000000} />
  ));
