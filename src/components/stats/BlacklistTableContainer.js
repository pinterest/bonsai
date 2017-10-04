/*
 * @flow
 */

import type { State } from '../../reducer';
import type {ModuleID, ExtendedModule} from '../../types/Stats';

import * as React from 'react';
import BlacklistTable from './BlacklistTable';
import { connect } from 'react-redux';
import { IncludedModule } from '../../actions';

type StateProps = {
  blacklistedModuleIds: Array<ModuleID>,
  moduleData: ?{
    included: Array<ExtendedModule>,
    removed: Array<ExtendedModule>,
  },
};

type DispatchProps = {
  onIncludeModule: (moduleID: ModuleID) => void,
};

type Props = StateProps & DispatchProps;

function BlacklistTableContainer(props: Props) {
  return (
    props.moduleData && props.moduleData.removed.length
      ? <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-danger">
            <div className="panel-heading">
              {props.moduleData.removed.length} Modules Ignored
            </div>
            <BlacklistTable
              blacklistedModulesIds={props.blacklistedModuleIds}
              removedModules={props.moduleData.removed}
              onIncludeModule={props.onIncludeModule}
            />
          </div>
        </div>
      </div>
      : null
  );
}

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
)(BlacklistTableContainer);
