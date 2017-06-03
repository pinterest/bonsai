/*
 * @flow
 */

import JsonFilePicker from './JsonFilePicker';
import React from 'react';

type Props = {
  filename: ?string,
  dataPaths: ?Array<string>,
  isDragging: boolean,
  onStatsFilePicked: (path: string | null) => void,
};

export default function FileInputRow(props: Props) {
  if (props.filename) {
    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-1 control-label">Filename</label>
          <div className="col-sm-11">
            <p className="form-control-static">{props.filename}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="well well-sm clearfix">
      <div className="form-horizontal">
        {!props.filename || props.isDragging
          ? <div className="form-group col-sm-6">
              <label className="control-label">Drag & Drop your <code>stats.json</code> file here</label>
              <span id="drag-drop-helpblock" className="col-sm-12 help-block">
                Run <kbd>webpack --json > stats.json</kbd> to get started.
              </span>
            </div>
          : <div className="form-group col-sm-6">
              <label className="col-sm-2 control-label">Loaded</label>
              <div className="col-sm-10">
                <p className="form-control-static">{props.filename}</p>
              </div>
            </div>
        }

        {props.dataPaths
          ? <div
              className="form-group col-sm-6"
              onClick={(event: SyntheticEvent) => event.stopPropagation() }>
              <label className="col-sm-2 control-label" htmlFor="data-file-picker">File</label>
                <div className="col-sm-10">
                  <JsonFilePicker
                    id="data-file-picker"
                    className="form-control"
                    dataPaths={props.dataPaths}
                    onChange={(event: SyntheticInputEvent) => props.onStatsFilePicked(event.target.value)}
                  />
                </div>
              {!props.filename || props.isDragging
                ? <span id="drag-drop-helpblock" className="col-sm-12 help-block">
                    or pick an existing stats file.
                  </span>
                : null}
            </div>
          : null}
      </div>
    </div>
  );
}
