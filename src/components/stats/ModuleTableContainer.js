/*
 * @flow
 */

import type { State } from '../../utils/reducer';
import type { Props as StateProps } from './ModuleTable';

import { connect } from 'react-redux';
import ModuleTable from './ModuleTable';

const mapStateToProps = (state: State): StateProps => {
  if (state.calculatedFullModuleData) {
    const moduleData = state.calculatedFullModuleData.moduleData;
    if (moduleData) {
      const amount = moduleData.removed.length === 0
        ? 'All'
        : String(moduleData.included.length);
      return {
        modulesIncludedLabel: `${amount} Modules Included`,
        focusedRowID: state.currentlyFocusedElementID,
      };
    }
  }

  return {
    modulesIncludedLabel: null,
    focusedRowID: state.currentlyFocusedElementID,
  };
};

export default connect<StateProps, {||}, _, _, _, _>(
  mapStateToProps,
  () => ({}),
)(ModuleTable);
