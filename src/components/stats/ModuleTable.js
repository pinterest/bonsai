/*
 * @flow
 */

import type {
  FilterableFields,
  FilterProps,
  SortProps,
} from '../../stats/filterModules';
import type {
  ExtendedModule,
  ModuleID,
} from '../../types/Stats';

import ModuleTableBody from './ModuleTableBody';
import ModuleTableHead from './ModuleTableHead';
import React, { Component } from 'react';

export type ForwardedProps = {
  extendedModules: Array<ExtendedModule>,
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

export type Props = ForwardedProps & StateProps & DispatchProps;

export default class ModuleTable extends Component<void, Props, void> {
  render() {
    return (
      <table className="table table-hover" cellPadding="0" cellSpacing="0">
        <ModuleTableHead
          filters={this.props.filters}
          sort={this.props.sort}
          onSort={this.props.onSortPicked}
          onFilter={this.props.onFilterChanged}
        />
        <ModuleTableBody
          extendedModules={this.props.extendedModules}
          onRemoveModule={this.props.onRemoveModule}
          filters={this.props.filters}
          sort={this.props.sort}
        />
      </table>
    );
  }
}
