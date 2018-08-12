/**
 * @flow
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Unit from '../Unit';

storiesOf('Unit/sizes', module)
  .add('0 Bytes (b)', () => (
    <Unit bytes={0} />
  ))
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
storiesOf('Unit/html', module)
  .add('with className', () => (
    <Unit bytes={2400} className="pull-right" />
  ))
  .add('with elem=table-cell', () => (
    <table className="table table-bordered">
      <tbody>
        <tr><Unit elem='td' bytes={2400} /></tr>
      </tbody>
    </table>
  ));
