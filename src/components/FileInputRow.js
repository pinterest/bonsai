/*
 * @flow
 */

import JsonFilePicker from './JsonFilePicker';
import React from 'react';

type Props = {
  filename: ?string,
  dataPaths: ?Array<string>,
  isDragging: boolean,
  onStatsFilePicked: (path: string) => void,
};

export default function FileInputRow(props: Props) {
  const showHelp = !props.filename || props.isDragging;

  return (
    <div
      className={[
        showHelp ? 'well' : null,
        showHelp ? 'well-sm' : null,
        'clearfix',
      ].filter(Boolean).join(' ')}>
      {!props.filename && !props.dataPaths
        ? null
        : <div className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-1 control-label">Filename</label>
            <div className="col-sm-11"
              onClick={(event: SyntheticEvent) => {
                event.stopPropagation();
              }}>
              <JsonFilePicker
                id="data-file-picker"
                className="form-control"
                dataPaths={props.dataPaths}
                selected={props.filename}
                onChange={(event: SyntheticInputEvent) => {
                  if (event.target.value) {
                    props.onStatsFilePicked(event.target.value);
                  }
                }}
              />
            </div>
          </div>
        </div>}
      {showHelp
        ? <div className="form-group col-sm-12">
          <label className="control-label">Drag & Drop your <code>stats.json</code> file here</label>
          <span id="drag-drop-helpblock" className="col-sm-12 help-block">
              Run <kbd>webpack --json &gt; stats.json</kbd> to get started.
          </span>
        </div>
        : null}
    </div>
  );
}
