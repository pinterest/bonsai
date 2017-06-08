/*
 * @flow
 */

import React from 'react';
import {CloseButton} from '../Bootstrap/Button';
import {getClassName} from '../Bootstrap/GlyphiconNames';

const NBSP = '\u00A0';

type Props = {
  children: *,
  title: string,
  isFiltered: boolean,
  onClear: (e: MouseEvent) => void,
};

export default function FilterDisplay(props: Props) {
  return (
    <span title={props.title}>
      <span
        aria-hidden="true"
        className={getClassName('filter')}
      />
      {NBSP}
      {props.children}
      {props.isFiltered ?
        <span style={{paddingLeft: '5px'}} title="Clear filter">
          <CloseButton label="Clear" onClick={props.onClear} />
        </span>
        : null}
    </span>
  );
}
