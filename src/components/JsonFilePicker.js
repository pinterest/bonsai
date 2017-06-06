/*
 * @flow
 */

import React from 'react';

type Props = {
  dataPaths: ?Array<string>,
  selected: ?string,
  id?: string,
  className?: string,
  onChange: (event: SyntheticInputEvent) => void,
};

export default function JsonFilePicker(props: Props) {
  if (!props.dataPaths) {
    return (
      <p className="form-control-static">
        {props.selected}
      </p>
    );
  }

  return (
    <select
      id={props.id}
      value={props.selected || ''}
      className={props.className}
      onChange={props.onChange}>
      <option value=""></option>
      {props.dataPaths.map((file) =>
        <option key={file} value={file}>
          {file}
        </option>
      )}
    </select>
  );
}
