/*
 * @flow
 */

import type {Child} from '../../stats/getEntryHeirarchy';
import type {ChunkID} from '../../types/Stats';

import { isSameChunk } from '../../types/Stats';
import Button from '../Bootstrap/Button';
import Dropdown from '../Bootstrap/Dropdown';
import * as React from 'react';

import './ChunkDropdown.css';

type Props = {
  chunksByParent: Array<Child>,
  selectedChunkId: ?ChunkID,
  onSelectChunkId: (chunkId: ChunkID) => void,
};

export default function ChunkDropdown(props: Props) {
  let selectedItem = null;
  const flatChunks: Array<{id: ChunkID, name: string, indent: number}> = [];
  const visitedChunks = {};

  function appendChildren(children: Array<Child>, indent: number) {
    children.forEach((child) => {
      if (isSameChunk(child.id, props.selectedChunkId)) {
        selectedItem = {
          id: child.id,
          name: child.name,
          indent: indent,
        };
      }

      if (!visitedChunks[child.id]) {
        flatChunks.push({
          id: child.id,
          name: child.name,
          indent: indent,
        });
        visitedChunks[child.id] = true;
      }

      appendChildren(child.children, indent + 1);
    });
  }

  appendChildren(props.chunksByParent, 0);

  return (
    <div className="form-horizontal">
      <div className="form-group">
        <label className="col-sm-1 control-label">Chunk</label>
        <div className="col-sm-11">
          <Dropdown
            getContent={(hideContent) => flatChunks.map((chunk) => (
              <li key={chunk.id}>
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
              </li>
            ))}>
            {selectedItem
              ? selectedItem.name
              : '- pick a chunk -'}
            {' '}
            <span className="caret"></span>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
