/*
 * @flow
 */

import type {
  FilterableFields,
  FilterProps,
  SortProps,
} from '../../stats/filterModules';
import type {
  ModuleID,
  RowRepresentation,
} from '../../types/Stats';

import ModuleTableBody from './ModuleTableBody';
import ModuleTableHead from './ModuleTableHead';
import React, { Component } from 'react';

export type OwnProps = {
  rows: Array<RowRepresentation>,
};

export type StateProps = {
  filters: FilterProps,
  sort: SortProps,
};

export type DispatchProps = {
  onSortPicked: (field: string) => void,
  onFilterChanged: (changes: {[key: FilterableFields]: string}) => void,
  onRemoveModule: (moduleID: ModuleID) => void,
};

export type Props = OwnProps & StateProps & DispatchProps;

type State = {
  expandRecords: Set<ModuleID>,
};

export default class ModuleTable extends Component<void, Props, State> {
  state: State = {
    expandRecords: new Set(),
  };

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
          expandRecords={this.state.expandRecords}
          onRemoveModule={props.onRemoveModule}
          onExpandRecords={this.onExpandRecords}
          onCollapseRecords={this.onCollapseRecords}
        />
      </table>
    );
  }

  onExpandRecords = (id: ModuleID) => {
    this.setState({
      expandRecords: this.state.expandRecords.add(id),
    });
  }

  onCollapseRecords = (id: ModuleID) => {
    this.state.expandRecords.delete(id);
    this.setState({
      expandRecords: new Set(this.state.expandRecords),
    });
  }
}
