/*
 * @flow
 */

import type {Child} from '../../stats/getEntryHeirarchy';
import type {ChunkID} from '../../types/Stats';

import { isSameChunk } from '../../types/Stats';
import { flattenChunksByParent } from '../../stats/getEntryHeirarchy';
import Button from '../Bootstrap/Button';
import DropdownList from '../Bootstrap/DropdownList';
import * as React from 'react';

import './ChunkDropdown.css';

type Props = {
  chunksByParent: Array<Child>,
  selectedChunkId: ?ChunkID,
  onSelectChunkId: (chunkId: ChunkID) => void,
};

export default function ChunkDropdown(props: Props) {
  const chunkList = flattenChunksByParent(props.chunksByParent);
  const selectedChunk = chunkList
    .filter((chunk) => isSameChunk(chunk.id, props.selectedChunkId))
    .pop();
  const label = selectedChunk ? selectedChunk.name : '- pick a chunk -';

  return (
    <DropdownList
      scrollable={true}
      disabled={chunkList.length === 0}
      filter="default"
      items={chunkList.map((chunk) => ({
        node(hideContent) {
          return (
            <Button
              color="link"
              display="block"
              style={chunk.indent ? {paddingLeft: chunk.indent + 'em'} : {}}
              onClick={() => {
                hideContent();
                props.onSelectChunkId(chunk.id);
              }}>
              <div
                className={[
                  'text-left',
                  chunk.indent ? 'ChunkDropdownPrefix' : '',
                ].join(' ')}>
                {chunk.name} ({chunk.id})
              </div>
            </Button>
          );
        },
        value: chunk.id,
      }))}>
      {label}
    </DropdownList>
  );
}
