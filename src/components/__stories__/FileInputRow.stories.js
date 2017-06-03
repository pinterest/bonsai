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
  ));
