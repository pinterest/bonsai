/*
 * @flow
 */

import React from 'react';

import type {SortProps, SortDirection} from '../stats/filterModules';

import {getClassName} from './Bootstrap/GlyphiconNames';

const NBSP = '\u00A0';

export type SortType = 'alpha' | 'order' | 'size';

type Props = {
  field: string,
  fieldType?: SortType,
  sort: SortProps,
  children?: string | React$Element<any>,
};

function getSortIconClass(direction: SortDirection, type: ?SortType) {
  switch(type) {
    case 'alpha':
      return direction === 'ASC'
        ? getClassName('sort-by-alphabet')
        : getClassName('sort-by-alphabet-alt')

    case 'order':
      return direction === 'ASC'
        ? getClassName('sort-by-order')
        : getClassName('sort-by-order-alt')
    case 'size':
    default:
      return direction === 'ASC'
        ? getClassName('sort-by-attributes')
        : getClassName('sort-by-attributes-alt')
  }
}

export default function SortLabel(props: Props) {
  const isSameField = props.sort.field === props.field;

  return (
    <div className="text-left">
      {isSameField
        ? <span
            aria-hidden="true"
            className={getSortIconClass(props.sort.direction, props.fieldType)}
          />
        : null}
      {isSameField ? NBSP : null}
      {props.children}
    </div>
  );
}
