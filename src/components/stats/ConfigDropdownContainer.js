/*
 * @flow
 */

import type { Dispatch, State } from '../../utils/reducer';
import type { DispatchProps, StateProps } from './ConfigDropdown';

import ConfigDropdown from './ConfigDropdown';
import { connect } from 'react-redux';
import { PickedChild } from '../../utils/actions';

const mapStateToProps = (state: State): StateProps => {
  const children = (state.jsonChildren && state.selectedFilename)
    ? state.jsonChildren[state.selectedFilename]
    : null;

  return {
    childrenIndexes: children ? children.map((k, i) => i) : [],
    selectedChildIndex: state.selectedChildIndex,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onPickedChild: PickedChild(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigDropdown);
