/*
 * @flow
 */

import type { ExtendedModule } from '../../types/Stats';
import type { State } from '../../utils/reducer';

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
        <ModuleTableContainer />
      </Panel>
      : null
  );
}

const mapStateToProps = (state: State): Props => {
  if (state.calculatedFullModuleData) {
    return {
      moduleData: state.calculatedFullModuleData.moduleData,
    };
  } else {
    return {
      moduleData: null,
    };
  }
};

export default connect(
  mapStateToProps,
)(ModuleData);
