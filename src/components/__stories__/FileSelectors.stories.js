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
      fileA={null}
      selectedChunkIdA={null}
      fileB={null}
      selectedChunkIdB={null}
      chunksByParent={[]}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
      onSelectChunkId={action('on select chunk id')}
    />
  ))
  .add('No filename, items in list', () => (
    <FileSelectors
      appMode='single'
      dataPaths={['stats.json']}
      fileA={null}
      selectedChunkIdA={null}
      fileB={null}
      selectedChunkIdB={null}
      chunksByParent={[]}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
      onSelectChunkId={action('on select chunk id')}
    />
  ))
  .add('Filename picked', () => (
    <FileSelectors
      appMode='single'
      dataPaths={['stats.json']}
      fileA={'stats.json'}
      selectedChunkIdA={null}
      fileB={null}
      selectedChunkIdB={null}
      chunksByParent={[]}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
      onSelectChunkId={action('on select chunk id')}
    />
  ))
  .add('Invalid: empty list, filename picked', () => (
    <FileSelectors
      appMode='single'
      dataPaths={[]}
      fileA={'stats.json'}
      selectedChunkIdA={null}
      fileB={null}
      selectedChunkIdB={null}
      chunksByParent={[]}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
      onSelectChunkId={action('on select chunk id')}
    />
  ));

storiesOf('FileSelectors - Diff Mode', module)
  .add('No filename, empty list', () => (
    <FileSelectors
      appMode='diff'
      dataPaths={[]}
      fileA={null}
      selectedChunkIdA={null}
      fileB={null}
      selectedChunkIdB={null}
      chunksByParent={[]}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
      onSelectChunkId={action('on select chunk id')}
    />
  ))
  .add('No filename, items in list', () => (
    <FileSelectors
      appMode='diff'
      dataPaths={['stats.json']}
      fileA={null}
      selectedChunkIdA={null}
      fileB={null}
      selectedChunkIdB={null}
      chunksByParent={[]}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
      onSelectChunkId={action('on select chunk id')}
    />
  ))
  .add('Filename A picked', () => (
    <FileSelectors
      appMode='diff'
      dataPaths={['stats.json']}
      fileA={'stats.json'}
      selectedChunkIdA={null}
      fileB={'stats.json'}
      selectedChunkIdB={null}
      chunksByParent={[]}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
      onSelectChunkId={action('on select chunk id')}
    />
  ))
  .add('Filename A & B picked', () => (
    <FileSelectors
      appMode='diff'
      dataPaths={['stats.json']}
      fileA={'stats-one.json'}
      selectedChunkIdA={null}
      fileB={'stats-two.json'}
      selectedChunkIdB={null}
      chunksByParent={[]}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
      onSelectChunkId={action('on select chunk id')}
    />
  ))
  .add('Invalid: empty list, filename picked', () => (
    <FileSelectors
      appMode='diff'
      dataPaths={[]}
      fileA={'stats-one.json'}
      selectedChunkIdA={null}
      fileB={'stats-two.json'}
      selectedChunkIdB={null}
      chunksByParent={[]}
      onChangedMode={action('on change mode')}
      onPickedFile={action('on stats file picked')}
      onSelectChunkId={action('on select chunk id')}
    />
  ));
