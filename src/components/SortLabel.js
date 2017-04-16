/*
 * @flow
 */

import React from 'react';

import type {SortProps, SortDirection} from '../stats/filterModules';

const NBSP = '\u00A0';

export type SortType = 'alpha' | 'order' | 'size';

type Props = {
  field: string,
  fieldType: ?SortType,
  sort: SortProps,
  children?: string | React$Element<any>,
};

function getSortIconClass(direction: SortDirection, type: ?SortType) {
  switch(type) {
    case 'alpha':
      return direction === 'ASC'
        ? 'glyphicon glyphicon-sort-by-alphabet'
        : 'glyphicon glyphicon-sort-by-alphabet-alt'

    case 'order':
      return direction === 'ASC'
        ? 'glyphicon glyphicon-sort-by-order'
        : 'glyphicon glyphicon-sort-by-order-alt'
    case 'size':
    default:
      return direction === 'ASC'
        ? 'glyphicon glyphicon-sort-by-attributes'
        : 'glyphicon glyphicon-sort-by-attributes-alt'
  }
}

export default function SortLabel(props: Props) {
  const isSameField = props.sort.field === props.field;

  return (
    <span>
      {isSameField
        ? <span
            aria-hidden="true"
            className={getSortIconClass(props.sort.direction, props.fieldType)}
          />
        : null}
      {isSameField ? NBSP : null}
      {props.children}
    </span>
  );
}
