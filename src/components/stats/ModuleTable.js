/*
 * @flow
 */

import type { ExtendedModule } from '../../types/Stats';

import ModuleTableBodyContainer from './ModuleTableBodyContainer';
import ModuleTableHeadContainer from './ModuleTableHeadContainer';
import Panel from '../Bootstrap/Panel';
import ToggleExpandModeButton from './ToggleExpandModeButton';
import * as React from 'react';
import scrollToAndFocus from '../../utils/scrollToAndFocus';

export type Props = {
  moduleData: ?{
    included: Array<ExtendedModule>,
    removed: Array<ExtendedModule>,
  },
  focusedRowID: ?string,
};

export default class ModuleTable extends React.Component<Props> {
  componentDidUpdate() {
    if (this.props.focusedRowID) {
      scrollToAndFocus(this.props.focusedRowID);
    }
  }

  render() {
    const props = this.props;
    if (!props.moduleData) {
      return null;
    }

    return (
      <Panel
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
        <table className="table table-hover" cellPadding="0" cellSpacing="0">
          <ModuleTableHeadContainer />
          <ModuleTableBodyContainer />
        </table>
      </Panel>
    );
  }
}
