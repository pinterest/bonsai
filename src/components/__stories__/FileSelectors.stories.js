/**
 * @flow
 */

import FileSelectors from '../FileSelectors';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('FileSelectors', module)
  .add('No filename, empty list', () => (
    <FileSelectors
      dataPaths={[]}
      filename={null}
      onStatsFilePicked={action('on stats file picked')}
    />
  ))
  .add('No filename, items in list', () => (
    <FileSelectors
      dataPaths={['stats.json']}
      filename={null}
      onStatsFilePicked={action('on stats file picked')}
    />
  ))
  .add('Filename picked', () => (
    <FileSelectors
      dataPaths={['stats.json']}
      filename={'stats.json'}
      onStatsFilePicked={action('on stats file picked')}
    />
  ))
  .add('Invalid: empty list, filename picked', () => (
    <FileSelectors
      dataPaths={[]}
      filename={'stats.json'}
      onStatsFilePicked={action('on stats file picked')}
    />
  ));
