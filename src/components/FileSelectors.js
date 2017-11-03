/*
 * @flow
 */

import type { ChunkID } from '../types/Stats';
import type { Child } from '../stats/getEntryHeirarchy';
import type { ModeType } from '../reducer';

import ChunkDropdown from './stats/ChunkDropdown';
import JsonFilePicker from './JsonFilePicker';
import * as React from 'react';

export type StateProps = {
  appMode: ModeType,
  dataPaths: Array<string>,
  fileA: ?string,
  fileB: ?string,

  selectedChunkIdA: ?ChunkID,
  selectedChunkIdB: ?ChunkID,
  chunksByParent: Array<Child>,
};

export type DispatchProps = {
  onPickedFile: (position: 'A' | 'B', path: string) => void,
  onChangedMode: (mode: ModeType) => void,
  onSelectChunkId: (position: 'A' | 'B', chunkId: ChunkID) => void,
};

type Props = DispatchProps & StateProps;

function willStopPropagation(event: SyntheticEvent<>) {
  event.stopPropagation();
}

function DiffModeToggle(
  props: {
    appMode: ModeType,
    onChange: (mode: 'single' | 'diff') => void,
  },
) {
  return (
    <div className="checkbox">
      <label htmlFor="enable-diff">
        <input
          id="enable-diff"
          type="checkbox"
          checked={props.appMode === 'diff'}
          onChange={(event: SyntheticInputEvent<>) =>
            props.onChange(event.target.checked ? 'diff' : 'single')
          }
        />
        &nbsp;Diff
      </label>
    </div>
  );
}

function SingleFileSelector(props: Props) {
  return (
    <div className="col-sm-11">
      <div className="form-group">
        <label className="col-sm-1 control-label">Filename</label>
        <div className="col-sm-11" onClick={willStopPropagation}>
          <JsonFilePicker
            id="data-file-picker"
            className="form-control"
            dataPaths={props.dataPaths}
            selected={props.fileA}
            onChange={(event: SyntheticInputEvent<>) => {
              if (event.target.value) {
                props.onPickedFile('A', event.target.value);
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
            selectedChunkId={props.selectedChunkIdA}
            onSelectChunkId={props.onSelectChunkId.bind(null, 'A')}
          />
        </div>
      </div>
    </div>
  );
}

function DiffFileSelector(props: Props) {
  return (
    <div className="col-sm-11">
      <div className="form-group">
        <label className="col-sm-1 control-label">File A</label>
        <div className="col-sm-6" onClick={willStopPropagation}>
          <JsonFilePicker
            id="data-file-picker"
            className="form-control"
            dataPaths={props.dataPaths}
            selected={props.fileA}
            onChange={(event: SyntheticInputEvent<>) => {
              if (event.target.value) {
                props.onPickedFile('A', event.target.value);
              }
            }}
          />
        </div>
        <div className="col-sm-5" onClick={willStopPropagation}>
          <ChunkDropdown
            chunksByParent={props.chunksByParent}
            selectedChunkId={props.selectedChunkIdA}
            onSelectChunkId={props.onSelectChunkId.bind(null, 'A')}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-sm-1 control-label">File B</label>
        <div className="col-sm-6" onClick={willStopPropagation}>
          <JsonFilePicker
            id="data-file-picker"
            className="form-control"
            dataPaths={props.dataPaths}
            selected={props.fileB}
            onChange={(event: SyntheticInputEvent<>) => {
              if (event.target.value) {
                props.onPickedFile('B', event.target.value);
              }
            }}
          />
        </div>
        <div className="col-sm-5" onClick={willStopPropagation}>
          <ChunkDropdown
            chunksByParent={props.chunksByParent}
            selectedChunkId={props.selectedChunkIdB}
            onSelectChunkId={props.onSelectChunkId.bind(null, 'B')}
          />
        </div>
      </div>
    </div>
  );
}

function getSelectorLayout(props: Props) {
  switch(props.appMode) {
    case 'single':
      return <SingleFileSelector {...props} />;
    case 'diff':
      return <DiffFileSelector {...props} />;
    default:
      throw new Error(`Invalid appMode: ${JSON.stringify(props.appMode)}`);
  }
}

export default function FileSelectors(props: Props) {
  if (props.dataPaths.length === 0) {
    return null;
  }

  return (
    <div className="row form-horizontal">
      {getSelectorLayout(props)}
      <div className="col-sm-1" onClick={willStopPropagation}>
        <DiffModeToggle
          appMode={props.appMode}
          onChange={props.onChangedMode}
        />
      </div>
    </div>
  );
}
