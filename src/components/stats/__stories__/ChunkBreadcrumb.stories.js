/**
 * @flow
 */

import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { defaultChunk } from '../../../__test_helpers__/defaults';
import ChunkBreadcrumb from '../ChunkBreadcrumb';
import getEntryHierarchy from '../../../stats/getEntryHierarchy';
import getParentChunks from '../../../stats/getParentChunks';

const stats = {
  chunks: [
    defaultChunk({
      id: 0,
      names: ['chunk-zero'],
    }),
    defaultChunk({
      id: 1,
      names: ['chunk-one'],
      parents: [0],
    }),
    defaultChunk({
      id: 2,
      names: ['chunk-two'],
      parents: [1],
    }),
  ],
  modules: [],
};

const chunksByParent = getEntryHierarchy(stats);

storiesOf('ChunkBreadcrumb', module)
  .add('Empty data', () => (
    <ChunkBreadcrumb
      parentChunks={[]}
      totalModules={3}
    />
  ))
  .add('First module without a parent', () => (
    <ChunkBreadcrumb
      parentChunks={getParentChunks(chunksByParent, 0) || []}
      totalModules={3}
    />
  ))
  .add('All three modules', () => (
    <ChunkBreadcrumb
      parentChunks={getParentChunks(chunksByParent, 2) || []}
      totalModules={3}
    />
  ));
