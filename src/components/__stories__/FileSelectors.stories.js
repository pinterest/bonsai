/**
 * @flow
 */

import FileSelectors from '../FileSelectors';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('FileSelectors - Single Mode', module)
  .add('No filename, empty list', () => (
    <FileSelectors
      appMode='single'
      dataPaths={[]}
      filename={null}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
    />
  ))
  .add('No filename, items in list', () => (
    <FileSelectors
      appMode='single'
      dataPaths={['stats.json']}
      filename={null}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
    />
  ))
  .add('Filename picked', () => (
    <FileSelectors
      appMode='single'
      dataPaths={['stats.json']}
      filename={'stats.json'}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
    />
  ))
  .add('Invalid: empty list, filename picked', () => (
    <FileSelectors
      appMode='single'
      dataPaths={[]}
      filename={'stats.json'}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
    />
  ));

storiesOf('FileSelectors - Diff Mode', module)
  .add('No filename, empty list', () => (
    <FileSelectors
      appMode='diff'
      dataPaths={[]}
      filename={null}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
    />
  ))
  .add('No filename, items in list', () => (
    <FileSelectors
      appMode='diff'
      dataPaths={['stats.json']}
      filename={null}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
    />
  ))
  .add('Filename picked', () => (
    <FileSelectors
      appMode='diff'
      dataPaths={['stats.json']}
      filename={'stats.json'}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
    />
  ))
  .add('Invalid: empty list, filename picked', () => (
    <FileSelectors
      appMode='diff'
      dataPaths={[]}
      filename={'stats.json'}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
    />
  ));
