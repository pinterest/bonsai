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

function getAppState(state: State): * {
  if (state.selectedFilename) {
    if (state.json[state.selectedFilename]) {
      return 'loaded';
    } else {
      return 'loading';
    }
  } else {
    return 'empty';
  }
}

const mapStateToProps = (state: State): StateProps => {
  return {
    appState: getAppState(state),
  };
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
