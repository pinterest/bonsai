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

  childrenIndexes: ?Array<number>,
  selectedChildIndex: ?number,
  selectedChunkId: ?ChunkID,
  chunksByParent: Array<Child>,
};

export type DispatchProps = {
  onPickedFile: (path: string) => void,
  onPickedChild: (childIndex: number) => void,
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

  const childPicker = (props.childrenIndexes && props.childrenIndexes.length > 1)
    ? (
      <div className="form-group" onClick={willStopPropagation}>
        <label
          className="col-sm-1 control-label"
          htmlFor="data-child-picker">
          Child
        </label>
        <div className="col-sm-11">
          <JsonFilePicker
            id="data-child-picker"
            dataPaths={(props.childrenIndexes || []).map(String)}
            selected={String(props.selectedChildIndex)}
            onChange={(event: SyntheticInputEvent<>) => {
              if (event.target.value) {
                props.onPickedChild(parseInt(event.target.value, 10));
              }
            }}
          />
        </div>
      </div>
    )
    : null;

  const chunkPicker = (props.selectedChildIndex !== null)
    ? (
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
    )
    : null;

  return (
    <div className="row form-horizontal">
      <div className="col-sm-11">
        <div className="form-group">
          <label
            className="col-sm-1 control-label"
            htmlFor="data-file-picker">
            Filename
          </label>
          <div className="col-sm-11" onClick={willStopPropagation}>
            <JsonFilePicker
              id="data-file-picker"
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
        {childPicker}
        {chunkPicker}
      </div>
    </div>
  );
}
