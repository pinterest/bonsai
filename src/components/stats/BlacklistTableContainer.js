/*
 * @flow
 */

import type { State } from '../../reducer';
import type { StateProps, DispatchProps } from './BlacklistTable';

import BlacklistTable from './BlacklistTable';
import { connect } from 'react-redux';
import { IncludedModule } from '../../actions';

const mapStateToProps = (state: State): StateProps => {
  return {
    blacklistedModuleIds: state.blacklistedModuleIds,
    moduleData: state.calculatedFullModuleData
      ? state.calculatedFullModuleData.moduleData
      : null,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onIncludeModule: IncludedModule(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlacklistTable);
