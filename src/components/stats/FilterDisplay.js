/*
 * @flow
 */

import * as React from 'react';
import {CloseButton} from '../Bootstrap/Button';

type Props = {
  children: React.Node,
  title: string,
  isFiltered: boolean,
  onClear: (e: MouseEvent) => void,
};

export default function FilterDisplay(props: Props) {
  return (
    <span title={props.title}>
      {props.children}
      {props.isFiltered ?
        <span style={{paddingLeft: '5px'}} title="Clear filter">
          <CloseButton label="Clear" onClick={props.onClear} />
        </span>
        : null}
    </span>
  );
}
