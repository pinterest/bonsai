/*
 * @flow
 */

import type { ModeType } from '../reducer';

import JsonFilePicker from './JsonFilePicker';
import * as React from 'react';

export type StateProps = {
  appMode: ModeType,
  dataPaths: Array<string>,
  filename: ?string,
};

export type DispatchProps = {
  onPickedFile: (position: 'A' | 'B', path: string) => void,
  onChangedMode: (mode: ModeType) => void,
};

type Props = DispatchProps & StateProps;

function willStopPropagation(event: SyntheticEvent<>) {
  event.stopPropagation();
}

function FileSelectorGroup(
  props: {
    dataPaths: Array<string>,
    filename: ?string,
    label: string,
    onPickedFile: (path: string) => void,
    children?: ?React.Node,
  },
) {
  return (
    <div className="form-group">
      <label className="col-sm-1 control-label">{props.label}</label>
      <div className="col-sm-10" onClick={willStopPropagation}>
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

      <div className="col-sm-1" onClick={willStopPropagation}>
        {props.children}
      </div>
    </div>
  );
}

function DiffModeToggle(props: {onClick: Function}) {
  return (
    <div className="checkbox">
      <label htmlFor="enable-diff">
        <input
          id="enable-diff"
          type="checkbox"
          onChange={props.onClick}
        />
        &nbsp;Diff
      </label>
    </div>
  );
}

export default function FileSelectors(props: Props) {
  if (!props.filename && props.dataPaths.length === 0) {
    return null;
  }

  const firstLabel = {
    single: 'Filename',
    diff: 'File A',
  }[props.appMode];

  return (
    <div className="form-horizontal">
      <FileSelectorGroup
        label={firstLabel}
        filename={props.filename}
        dataPaths={props.dataPaths}
        onPickedFile={props.onPickedFile.bind(null, 'A')}>
        <DiffModeToggle onClick={(event: SyntheticInputEvent<>) => {
          props.onChangedMode(event.target.checked ? 'diff' : 'single');
        }} />
      </FileSelectorGroup>

      {props.appMode === 'diff'
        ? <FileSelectorGroup
          label="File B"
          filename={props.filename}
          dataPaths={props.dataPaths}
          onPickedFile={props.onPickedFile.bind(null, 'B')}
        />
        : null}
    </div>
  );
}
