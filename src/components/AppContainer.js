/*
 * @flow
 */

import type { Dispatch, State } from '../reducer';
import type { DispatchProps, StateProps } from './App';

import App from './App';
import {connect} from 'react-redux';
import {
  PickedFile,
  DroppedFile,
} from '../actions';

const mapStateToProps = (state: State): StateProps => {
  if (state.selectedFilenameA) {
    if (state.json[state.selectedFilenameA]) {
      return {
        filename: state.selectedFilenameA,
        loading: false,
        json: state.json[state.selectedFilenameA],
      };
    } else {
      return {
        filename: state.selectedFilenameA,
        loading: true,
        json: null,
      };
    }
  } else {
    return {
      filename: null,
      loading: false,
      json: null,
    };
  }
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onPickedFile: PickedFile(dispatch),
    onDroppedFile: DroppedFile(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
