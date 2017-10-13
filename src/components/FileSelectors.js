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
        <div className="col-sm-11"
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
      </div>
    </div>
  );
}
