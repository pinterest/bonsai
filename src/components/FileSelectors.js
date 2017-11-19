/*
 * @flow
 */

import type { ChunkID } from '../types/Stats';
import type { Child } from '../stats/getEntryHeirarchy';

import ChunkDropdown from './stats/ChunkDropdown';
import JsonFilePicker from './JsonFilePicker';
import * as React from 'react';

export type StateProps = {
  dataPaths: Array<string>,
  filename: ?string,

  selectedChunkId: ?ChunkID,
  chunksByParent: Array<Child>,
};

export type DispatchProps = {
  onPickedFile: (path: string) => void,
  onSelectChunkId: (chunkId: ChunkID) => void,
};

type Props = DispatchProps & StateProps;

function willStopPropagation(event: SyntheticEvent<>) {
  event.stopPropagation();
}

export default function FileSelectors(props: Props) {
  if (props.dataPaths.length === 0) {
    return null;
  }

  return (
    <div className="row form-horizontal">
      <div className="col-sm-11">
        <div className="form-group">
          <label className="col-sm-1 control-label">Filename</label>
          <div className="col-sm-11" onClick={willStopPropagation}>
            <JsonFilePicker
              id="data-file-picker"
              className="form-control"
              dataPaths={props.dataPaths}
              selected={props.filename}
              onChange={(event: SyntheticInputEvent<>) => {
                if (event.target.value) {
                  props.onPickedFile(event.target.value);
                }
              }}
            />
          </div>
        </div>
        <div className="form-group" onClick={willStopPropagation}>
          <label className="col-sm-1 control-label">Chunk</label>
          <div className="col-sm-11">
            <ChunkDropdown
              chunksByParent={props.chunksByParent}
              selectedChunkId={props.selectedChunkId}
              onSelectChunkId={props.onSelectChunkId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
