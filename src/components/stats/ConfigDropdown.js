/*
 * @flow
 */

import type { ItemValue } from '../Bootstrap/DropdownList';

import * as React from 'react';
import DropdownList from '../Bootstrap/DropdownList';

export type StateProps = {
  childrenIndexes: Array<number>,
  selectedChildIndex: ?number,
};

export type DispatchProps = {
  onPickedChild: (childIndex: number) => void,
};

type Props = StateProps & DispatchProps;

function willStopPropagation(event: SyntheticEvent<>) {
  event.stopPropagation();
}

export default function ConfigDropdown(props: Props) {
  if (props.childrenIndexes.length <= 1) {
    return null;
  }

  return (
    <div className="row form-group" onClick={willStopPropagation}>
      <label
        className="col-sm-1 col-form-label"
        htmlFor="data-child-picker">
        Config
      </label>
      <div className="col-sm-11">
        <DropdownList
          items={(props.childrenIndexes || []).map((index) => ({
            label: String(index),
            value: index,
          }))}
          onItemPicked={(value: ItemValue) => {
            props.onPickedChild(Number(value));
          }}
        >
          {String(props.selectedChildIndex || '- pick a config -')}
        </DropdownList>
      </div>
    </div>
  );
}
