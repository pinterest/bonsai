/*
 * @flow
 */

import JsonFilePicker from './JsonFilePicker';
import * as React from 'react';

type Props = {
  filename: ?string,
  dataPaths: ?Array<string>,
  onStatsFilePicked: (path: string) => void,
};

export default function FileSelector(props: Props) {
  return (
    <div className="form-horizontal">
      <div className="form-group">
        <label className="col-sm-1 control-label">Filename</label>
        <div className="col-sm-10"
          onClick={(event: SyntheticEvent<>) => {
            event.stopPropagation();
          }}>
          <JsonFilePicker
            id="data-file-picker"
            className="form-control"
            dataPaths={props.dataPaths}
            selected={props.filename}
            onChange={(event: SyntheticInputEvent<>) => {
              if (event.target.value) {
                props.onStatsFilePicked(event.target.value);
              }
            }}
          />
        </div>
        <div className="col-sm-1"
          onClick={(event: SyntheticEvent<>) => {
            event.stopPropagation();
          }}>
          <input type="checkbox" id="enable-diff" />
          <label htmlFor="enable-diff" className="control-label">Diff</label>
        </div>
      </div>
    </div>
  );
}
