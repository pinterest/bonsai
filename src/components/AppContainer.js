/*
 * @flow
 */

import type {RawStats} from '../types/Stats';
import type {Dispatch, State} from '../reducer';

import App from './App';
import { connect } from 'react-redux'

const mapStateToProps = (state: State) => {
  return {
    loading: state.isLoading,
    filename: state.selectedFilename,
    json: state.selectedFilename
      ? state.json[state.selectedFilename]
      : null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLoading: () => {
      dispatch({
        type: 'startLoading',
      });
    },
    onLoaded: (filename: ?string, stats: ?RawStats) => {
      dispatch({
        type: 'finishedLoading',
        filename,
        stats,
      });
      dispatch({
        type: 'pickedFile',
        filename,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
