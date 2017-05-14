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
      onLoading={() => undefined}
      onLoaded={(s: ?string, o: ?Object) => undefined}
    />
  ))
  .add('File loaded', () => (
    <FileInputRow
      filename={'stats.json'}
      onLoading={() => undefined}
      onLoaded={(s: ?string, o: ?Object) => undefined}
    />
  ));
