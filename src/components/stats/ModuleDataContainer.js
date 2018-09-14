/*
 * @flow
 */

import type { State } from '../../utils/reducer';
import type { Props as StateProps } from './ModuleTable';

import { connect } from 'react-redux';
import ModuleTable from './ModuleTable';

const mapStateToProps = (state: State): StateProps => {
  if (state.calculatedFullModuleData) {
    return {
      moduleData: state.calculatedFullModuleData.moduleData,
      focusedRowID: state.currentlyFocusedElementID,
    };
  } else {
    return {
      moduleData: null,
      focusedRowID: state.currentlyFocusedElementID,
    };
  }
};

export default connect(
  mapStateToProps,
)(ModuleTable);
