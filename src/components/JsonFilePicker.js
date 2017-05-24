/*
 * @flow
 */

import React from 'react';

type Props = {
  dataPaths: ?Array<string>,
  id?: string,
  className?: string,
  onChange: (event: SyntheticInputEvent) => void,
};

export default function JsonFilePicker(props: Props) {
  if (!props.dataPaths) {
    return null;
  }

  return (
    <select
      id={props.id}
      className={props.className}
      onChange={props.onChange}>
      <option value=""></option>
      {props.dataPaths.map((file) =>
        <option key={file} value={file}>{file}</option>
      )}
    </select>
  );
}
