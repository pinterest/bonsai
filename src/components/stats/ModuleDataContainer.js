/*
 * @flow
 */

import type { ExtendedModule } from '../../types/Stats';
import type { State } from '../../reducer';

import * as React from 'react';
import ModuleTableContainer from './ModuleTableContainer';
import { connect } from 'react-redux';
import Panel from '../Bootstrap/Panel';
import ToggleExpandModeButton from './ToggleExpandModeButton';

export type Props = {
  moduleData: ?{
    included: Array<ExtendedModule>,
    removed: Array<ExtendedModule>,
  },
  extendedModules: Array<ExtendedModule>,
};

function ModuleData(props: Props) {
  return (
    props.moduleData
      ? <Panel
        type='primary'
        heading={(
          <div>
            <div className="pull-right">
              <ToggleExpandModeButton />
            </div>
            {props.moduleData.removed.length === 0
              ? 'All'
              : props.moduleData.included.length} Modules Included
          </div>
        )}>
        <ModuleTableContainer
          extendedModules={props.extendedModules}
        />
      </Panel>
      : null
  );
}

const mapStateToProps = (state: State): Props => {
  if (state.calculatedFullModuleData) {
    return {
      moduleData: state.calculatedFullModuleData.moduleData,
      extendedModules: state.calculatedFullModuleData.extendedModules,
    };
  } else {
    return {
      moduleData: null,
      extendedModules: [],
    };
  }
};

export default connect(
  mapStateToProps,
)(ModuleData);
