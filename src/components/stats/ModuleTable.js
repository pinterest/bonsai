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
import type { ModuleID } from '../../types/Stats';
import type { ExtendedModule } from '../../types/Stats';

import collapseModulesToRows from '../../stats/collapseModulesToRows';
import filterModules from '../../stats/filterModules';
import ModuleTableBody from './ModuleTableBody';
import ModuleTableHead from './ModuleTableHead';
import React, { Component } from 'react';
import scrollToAndFocus from '../../scrollToAndFocus';
import sortModules from '../../stats/sortModules';

export type OwnProps = {
  extendedModules: Array<ExtendedModule>,
};

export type StateProps = {
  filters: FilterProps,
  sort: SortProps,
  expandMode: 'manual' | 'collapse-all' | 'expand-all',
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

export default class ModuleTable extends Component<Props> {
  componentDidUpdate() {
    if (this.props.focusedRowID) {
      scrollToAndFocus(this.props.focusedRowID);
    }
  }

  render() {
    const props = this.props;

    const rows = collapseModulesToRows(
      sortModules(
        filterModules(
          props.extendedModules,
          props.filters,
        ),
        props.sort,
      ),
    );
    rows.forEach((row) => {
      row.records = sortModules(row.records, props.sort);
    });

    return (
      <table className="table table-hover" cellPadding="0" cellSpacing="0">
        <ModuleTableHead
          filters={props.filters}
          sort={props.sort}
          onSort={props.onSortPicked}
          onFilter={props.onFilterChanged}
        />
        <ModuleTableBody
          rows={rows}
          expandMode={props.expandMode}
          expandedRecords={props.expandedRecords}
          onRemoveModule={props.onRemoveModule}
          onExpandRecords={props.onExpandRecords}
          onCollapseRecords={props.onCollapseRecords}
        />
      </table>
    );
  }
}
