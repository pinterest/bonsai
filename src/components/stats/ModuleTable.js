/*
 * @flow
 */

import type {
  FilterableFields,
  FilterProps,
} from '../../stats/filterModules';
import type {
  SortableFields,
  SortProps,
} from '../../stats/sortModules';
import type {
  ModuleID,
  RowRepresentation,
} from '../../types/Stats';

import ModuleTableBody from './ModuleTableBody';
import ModuleTableHead from './ModuleTableHead';
import React, { Component } from 'react';
import scrollToAndFocus from '../../scrollToAndFocus';

export type OwnProps = {
  rows: Array<RowRepresentation>,
};

export type StateProps = {
  filters: FilterProps,
  sort: SortProps,
  expandedRecords: Set<ModuleID>,
  focusedRowID: ?string,
};

export type DispatchProps = {
  onSortPicked: (field: SortableFields) => void,
  onFilterChanged: (changes: {[key: FilterableFields]: string}) => void,
  onRemoveModule: (moduleID: ModuleID) => void,
  onExpandRecords: (moduleID: ModuleID) => void,
  onCollapseRecords: (moduleID: ModuleID) => void,
};

export type Props = OwnProps & StateProps & DispatchProps;

export default class ModuleTable extends Component {
  componentDidUpdate() {
    if (this.props.focusedRowID !== null) {
      scrollToAndFocus(this.props.focusedRowID);
    }
  }

  render() {
    const props = this.props;
    return (
      <table className="table table-hover" cellPadding="0" cellSpacing="0">
        <ModuleTableHead
          filters={props.filters}
          sort={props.sort}
          onSort={props.onSortPicked}
          onFilter={props.onFilterChanged}
        />
        <ModuleTableBody
          rows={props.rows}
          expandedRecords={props.expandedRecords}
          onRemoveModule={props.onRemoveModule}
          onExpandRecords={props.onExpandRecords}
          onCollapseRecords={props.onCollapseRecords}
        />
      </table>
    );
  }
}
