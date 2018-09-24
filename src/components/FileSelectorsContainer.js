/*
 * @flow
 */

import type { Dispatch, State } from '../utils/reducer';
import type { DispatchProps, StateProps } from './FileSelectors';

import FileSelectors from './FileSelectors';
import {connect} from 'react-redux';
import {
  fetchDataFile,
} from '../utils/actions';

const mapStateToProps = (state: State): StateProps => {
  return {
    dataPaths: Object.keys(state.dataPaths),
    filename: state.selectedFilename,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onPickedFile: fetchDataFile(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileSelectors);
