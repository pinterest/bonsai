/*
 * @flow
 */

import type { State } from '../../utils/reducer';
import type { StateProps } from './DebugView';

import DebugView from './DebugView';
import {connect} from 'react-redux';

const mapStateToProps = (state: State): StateProps => {
  return {
    file: state.selectedFilename
      ? state.jsonChildren[state.selectedFilename]
      : null,
  };
};

export default connect(
  mapStateToProps,
)(DebugView);
