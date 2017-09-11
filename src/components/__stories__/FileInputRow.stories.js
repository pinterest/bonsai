/**
 * @flow
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';

import FileInputRow from '../FileInputRow';

storiesOf('FileInputRow', module)
  .add('No file picked', () => (
    <FileInputRow
      filename={null}
      dataPaths={null}
      isDragging={false}
      onStatsFilePicked={() => undefined}
    />
  ))
  .add('File picked, no data paths', () => (
    // This never happens in practice
    <FileInputRow
      filename={'stats.json'}
      dataPaths={null}
      isDragging={false}
      onStatsFilePicked={() => undefined}
    />
  ))
  .add('No file picked, but has dataPaths', () => (
    <FileInputRow
      filename={null}
      dataPaths={['example.json']}
      isDragging={false}
      onStatsFilePicked={() => undefined}
    />
  ))
  .add('With dataPaths and a file picked', () => (
    <FileInputRow
      filename={'example.json'}
      dataPaths={['example.json']}
      isDragging={false}
      onStatsFilePicked={() => undefined}
    />
  ))
  .add('No file picked - dragging', () => (
    <FileInputRow
      filename={null}
      dataPaths={null}
      isDragging={true}
      onStatsFilePicked={() => undefined}
    />
  ))
  .add('No file picked, but has dataPaths - dragging', () => (
    <FileInputRow
      filename={null}
      dataPaths={['example.json']}
      isDragging={true}
      onStatsFilePicked={() => undefined}
    />
  ))
  .add('With dataPaths and a file picked - dragging', () => (
    <FileInputRow
      filename={'example.json'}
      dataPaths={['example.json']}
      isDragging={true}
      onStatsFilePicked={() => undefined}
    />
  ));
