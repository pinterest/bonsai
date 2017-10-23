/*
 * @flow
 */

import type { Dispatch, State } from '../reducer';
import type { DispatchProps, StateProps } from './FileSelectors';

import FileSelectors from './FileSelectors';
import {connect} from 'react-redux';
import {
  ChangedMode,
  PickedFile,
} from '../actions';

const mapStateToProps = (state: State): StateProps => {
  return {
    dataPaths: state.dataPaths,
    appMode: state.appMode,
    filename: state.selectedFilenameA,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onChangedMode: ChangedMode(dispatch),
    onPickedFile: PickedFile(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileSelectors);
