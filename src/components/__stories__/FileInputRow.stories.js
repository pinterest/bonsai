/**
 * @flow
 */

import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import FileInputRow from '../FileInputRow';

storiesOf('FileInputRow', module)
  .add('No file', () => (
    <FileInputRow
      filename={null}
      dataPaths={null}
      isDragging={false}
      onStatsFilePicked={(path: string | null) => undefined}
    />
  ))
  .add('File loaded', () => (
    <FileInputRow
      filename={'stats.json'}
      dataPaths={null}
      isDragging={false}
      onStatsFilePicked={(path: string | null) => undefined}
    />
  ))
  .add('With dataPaths', () => (
    <FileInputRow
      filename={null}
      dataPaths={['example.json']}
      isDragging={false}
      onStatsFilePicked={(path: string | null) => undefined}
    />
  ))
  .add('With dataPaths and a file picked', () => (
    <FileInputRow
      filename={'stats.json'}
      dataPaths={['example.json']}
      isDragging={false}
      onStatsFilePicked={(path: string | null) => undefined}
    />
  ));
