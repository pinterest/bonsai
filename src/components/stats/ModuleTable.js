/*
 * @flow
 */

import * as React from 'react';
import ModuleTableBodyContainer from './ModuleTableBodyContainer';
import ModuleTableHeadContainer from './ModuleTableHeadContainer';
import Panel from '../Bootstrap/Panel';
import scrollToAndFocus from '../../utils/scrollToAndFocus';
import ToggleExpandModeButton from './ToggleExpandModeButton';

export type Props = {
  modulesIncludedLabel: ?string,
  focusedRowID: ?string,
};

export default class ModuleTable extends React.PureComponent<Props> {
  componentDidUpdate() {
    if (this.props.focusedRowID) {
      scrollToAndFocus(this.props.focusedRowID);
    }
  }

  render() {
    const props = this.props;
    if (!props.modulesIncludedLabel) {
      return null;
    }

    return (
      <Panel
        className="my-3"
        type='primary'
        heading={(
          <div>
            <div className="float-right">
              <ToggleExpandModeButton />
            </div>
            {props.modulesIncludedLabel}
          </div>
        )}>
        <table className="table table-sm table-bordered table-hover" cellPadding="0" cellSpacing="0">
          <ModuleTableHeadContainer />
          <ModuleTableBodyContainer />
        </table>
      </Panel>
    );
  }
}
