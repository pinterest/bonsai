/*
 * @flow
 */

import type { ChunkID } from '../types/Stats';
import type { Child } from '../stats/getEntryHeirarchy';
import type { ItemValue } from './Bootstrap/DropdownList';

import ChunkDropdown from './stats/ChunkDropdown';
import DropdownList from './Bootstrap/DropdownList';
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
          Config
        </label>
        <div className="col-sm-11">
          <DropdownList
            items={(props.childrenIndexes || []).map((index) => ({
              label: String(index),
              value: index,
            }))}
            onItemPicked={(value: ItemValue) => {
              props.onPickedChild(Number(value));
            }}
          >
            {String(props.selectedChildIndex || '- pick a config -')}
          </DropdownList>
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
            <DropdownList
              filter="default"
              items={props.dataPaths.map((path) => ({
                label: path,
                value: path,
              }))}
              onItemPicked={(value: ItemValue) => {
                props.onPickedFile(String(value));
              }}
            >
              {props.filename}
            </DropdownList>
          </div>
        </div>
        {childPicker}
        {chunkPicker}
      </div>
    </div>
  );
}
