/*
 * @flow
 */

import DropdownMenu from '../DropdownMenu';
import getEntryHeirarchy from '../../stats/getEntryHeirarchy';
import React from 'react';
import type {Child} from '../../stats/getEntryHeirarchy';
import type {RawStats} from '../../types/Stats';

type Props = {
  stats: RawStats,
  selectedChunkId: ?number,
  onSelectChunkId: (chunkId: number) => void,
};

const NBSP = '\u00A0';

function getPrefix(indent) {
  return indent === 0
    ? ''
    : NBSP.repeat((indent - 1) * 2) + '↳';
}

export default function ChunkDropdown(props: Props) {
  const chunksByParent = getEntryHeirarchy(props.stats);

  let selectedItem = null;
  const flatChunks = [];
  const visitedChunks = {};

  function appendChildren(children: Array<Child>, indent: number) {
    children.forEach((child) => {
      if (child.id === props.selectedChunkId) {
        selectedItem = {
          id: child.id,
          name: `${child.name} (${child.id})`,
        };
      }

      if (!visitedChunks[child.id]) {
        flatChunks.push({
          id: child.id,
          name: `${getPrefix(indent)}${child.name} (${child.id})`,
        });
        visitedChunks[child.id] = true;
      }

      appendChildren(child.children, indent + 1);
    });
  }

  appendChildren(chunksByParent.children, 0);

  if (!selectedItem) {
    selectedItem = {
      id: -1,
      name: '- pick a chunk -',
    };
    flatChunks.shift(selectedItem);
  }

  return (
    <div className="form-horizontal">
      <div className="form-group">
        <label className="col-sm-1 control-label">Chunk</label>
        <div className="col-sm-11">
          <DropdownMenu
            selectedItem={selectedItem}
            children={flatChunks}
            onClick={props.onSelectChunkId}
          />
        </div>
      </div>
    </div>
  );
}
