/*
 * @flow
 */

import type { Dispatch, State } from '../reducer';
import type { DispatchProps, StateProps } from './App';

import App from './App';
import {connect} from 'react-redux'
import {
  PickedFile,
  LoadingFailed,
  Loaded,
  DroppedFile,
} from '../actions';

const mapStateToProps = (state: State): StateProps => {
  if (state.selectedFilename) {
    if (state.json[state.selectedFilename]) {
      return {
        dataPaths: state.dataPaths,
        filename: state.selectedFilename,
        loading: false,
        json: state.json[state.selectedFilename],
      };
    } else {
      return {
        dataPaths: state.dataPaths,
        filename: state.selectedFilename,
        loading: true,
        json: null,
      };
    }
  } else {
    return {
      dataPaths: state.dataPaths,
      filename: null,
      loading: false,
      json: null,
    };
  }
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onPickedFile: PickedFile(dispatch),
    onLoadingFailed: LoadingFailed(dispatch),
    onLoaded: Loaded(dispatch),
    onDroppedFile: DroppedFile(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
