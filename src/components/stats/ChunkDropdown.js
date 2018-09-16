/*
 * @flow
 */

import type {Child} from '../../stats/getEntryHierarchy';
import type {ChunkID} from '../../types/Stats';

import { isSameChunk } from '../../types/Stats';
import { flattenChunksByParent } from '../../stats/getEntryHierarchy';
import Button from '../Bootstrap/Button';
import DropdownList from '../Bootstrap/DropdownList';
import * as React from 'react';

import './ChunkDropdown.css';

export type StateProps = {
  chunksByParent: Array<Child>,
  selectedChunkId: ?ChunkID,
};

export type DispatchProps = {
  onSelectChunkId: (chunkId: ChunkID) => void,
};

type Props = StateProps & DispatchProps;

function willStopPropagation(event: SyntheticEvent<>) {
  event.stopPropagation();
}

export default function ChunkDropdown(props: Props) {
  if (props.chunksByParent.length === 0) {
    return null;
  }

  const chunkList = flattenChunksByParent(props.chunksByParent);
  const selectedChunk = chunkList
    .filter((chunk) => isSameChunk(chunk.id, props.selectedChunkId))
    .pop();
  const label = selectedChunk ? selectedChunk.name : '- pick a chunk -';

  return (
    <div className="row form-group" onClick={willStopPropagation}>
      <label className="col-sm-1 col-form-label">Chunk</label>
      <div className="col-sm-11">
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
      </div>
    </div>
  );
}
