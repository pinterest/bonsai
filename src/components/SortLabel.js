/*
 * @flow
 */

import * as React from 'react';

import type { SortProps } from '../stats/sortModules';

import Octicon, { ArrowDown, ArrowUp } from '@github/octicons-react';

const NBSP = '\u00A0';

export type SortType = 'alpha' | 'order' | 'size';

type Props = {
  field: string,
  fieldType?: SortType,
  sort: SortProps,
  children?: string | React.Element<any>,
};

export default function SortLabel(props: Props) {
  const isSameField = props.sort.field === props.field;

  return (
    <div>
      {isSameField
        ? <Octicon icon={props.sort.direction == 'ASC' ? ArrowUp : ArrowDown} />
        : null}
      {isSameField ? NBSP : null}
      {props.children}
    </div>
  );
}
