/*
 * @flow
 */

import type { ItemValue } from './Bootstrap/DropdownList';

import DropdownList from './Bootstrap/DropdownList';
import * as React from 'react';

export type StateProps = {
  dataPaths: Array<string>,
  filename: ?string,
};

export type DispatchProps = {
  onPickedFile: (path: string) => void,
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
    <div className="row form-group">
      <label
        className="col-sm-1 col-form-label"
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
  );
}
