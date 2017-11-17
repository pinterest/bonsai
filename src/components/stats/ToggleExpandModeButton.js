/*
 * @flow
 */

import type { State } from '../../reducer';

import Button from '../Bootstrap/Button';
import Dropdown from '../Bootstrap/Dropdown';
import { getClassName } from '../Bootstrap/GlyphiconNames';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  ChangeExpandMode,
} from '../../actions';

type StateProps = {
  expandMode: 'manual' | 'collapse-all' | 'expand-all',
};

type DispatchProps = {
  onChangedExpandMode: (mode: 'manual' | 'collapse-all' | 'expand-all') => void,
};

export type Props = StateProps & DispatchProps;

function ModeOption(props) {
  const isSetToTarget = props.nextMode === props.expandMode;

  return (
    <li>
      <Button
        color="link"
        size="block"
        style={{textAlign: 'left'}}
        onClick={(e) => {
          e.preventDefault();
          props.onPickMode(props.nextMode);
        }}>
        <span className={getClassName(isSetToTarget ? 'check' : 'unchecked')} />
        {' '}
        {props.nextMode === 'expand-all' ? 'Expand' : 'Collapse'} All
      </Button>
    </li>
  );
}

function ToggleExpandModeButton(props: Props) {
  return (
    <Dropdown
      align='right'
      size='xs'
      getContent={(hideContent) => {
        const pickedMode = (mode) => {
          hideContent();
          props.onChangedExpandMode(mode);
        };

        return [
          <ModeOption
            key='expand-all'
            expandMode={props.expandMode}
            nextMode={'expand-all'}
            onPickMode={pickedMode}
          />,
          <ModeOption
            key='collapse-all'
            expandMode={props.expandMode}
            nextMode={'collapse-all'}
            onPickMode={pickedMode}
          />,
        ];
      }}>
      Unqiue Imports
      {' '}
      <span className="caret"></span>
    </Dropdown>
  );
}

const mapStateToProps = (state: State): StateProps => {
  return {
    expandMode: state.expandMode,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onChangedExpandMode: ChangeExpandMode(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToggleExpandModeButton);
