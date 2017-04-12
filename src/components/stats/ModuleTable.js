/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';

import ShowablePanel from '../ShowablePanel';
import ModuleTableBody from './ModuleTableBody';
import React, { Component } from 'react';

type Props = {
  extendedModulesById: {[key: ModuleID]: ExtendedModule},
  onRemoveModule: (moduleID: ModuleID) => void,
};

type State = {
  filters: {
    moduleName: string,
    cumulativeSizeMin: string,
    cumulativeSizeMax: string,
    requiredByCountMin: string,
    requiredByCountMax: string,
  },
  sort: {
    field: string,
    direction: 'ASC' | 'DESC',
  },
};

function makeRecordLikeRegExpFilter(field: string, re: RegExp | '') {
  return function(eModule: ExtendedModule) {
    if (re && !re.test(eModule[field])) {
      return false;
    }
    return true;
  };
}

function makeRecordRangeFilter(
  field: string,
  min: number | '',
  max: number | '',
) {
  return function(eModule: ExtendedModule) {
    if (min && max) {
      return eModule[field] >= min && eModule[field] <= max;
    }
    if (min) {
      return eModule[field] >= min;
    }
    if (max) {
      return eModule[field] <= max;
    }
    return true;
  };
}

export default class ModuleTable extends Component<void, Props, State> {
  state = {
    filters: {
      moduleName: '',
      cumulativeSizeMin: '',
      cumulativeSizeMax: '',
      requiredByCountMin: '',
      requiredByCountMax: '',
    },
    sort: {
      field: 'cumulativeSize',
      direction: 'DESC',
    },
  };

  filterNodes: {
    moduleName?: HTMLInputElement,
    cumulativeSizeMin?: HTMLInputElement,
    cumulativeSizeMax?: HTMLInputElement,
    requiredByCountMin?: HTMLInputElement,
    requiredByCountMax?: HTMLInputElement,
  } = {};

  render() {
    const {filters} = this.state;
    // $FlowFixMe: flow thinks `values()` returns an `Array<mixed>` here
    let extendedModules: Array<ExtendedModule> = Object.values(
      this.props.extendedModulesById,
    );

    extendedModules = extendedModules
      .filter(makeRecordLikeRegExpFilter(
        'name',
        new RegExp(filters.moduleName),
      ))
      .filter(makeRecordRangeFilter(
        'cumulativeSize',
        Number(filters.cumulativeSizeMin),
        Number(filters.cumulativeSizeMax),
      ))
      .filter(makeRecordRangeFilter(
        'requiredByCount',
        Number(filters.requiredByCountMin),
        Number(filters.requiredByCountMax),
      ))
      .sort((a, b) => {
        const {field, direction} = this.state.sort;
        if (a[field] < b[field]) {
          return direction === 'ASC' ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return direction === 'DESC' ? -1 : 1;
        }
        return 0;
      });

    return (
      <table className="table table-hover" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>
              <ShowablePanel
                trigger='hover'
                panel={this.renderModuleNameFilter()}>
                <a href="#" onClick={this.makeSort('name')}>
                  Module Name
                </a>
              </ShowablePanel>
            </th>
            <th>
              <ShowablePanel
                trigger='hover'
                panel={this.renderCumulativeSizeFilter()}>
                <a href="#" onClick={this.makeSort('cumulativeSize')}>
                  Cumulative Size
                </a>
              </ShowablePanel>
            </th>
            <th>Size</th>
            <th>
              <ShowablePanel
                trigger='hover'
                panel={this.renderRequiredByCountFilter()}>
                <a href="#" onClick={this.makeSort('requiredByCount')}>
                  Dependants
                </a>
              </ShowablePanel>
            </th>
            <th>Imports</th>
            <th>Chunks</th>
            <th></th>
          </tr>
          <tr>
            <td>
              {filters.moduleName
                ? filters.moduleName
                : '*'}
            </td>
            <td>
              {filters.cumulativeSizeMin}
              {(filters.cumulativeSizeMin !== ''
                || filters.cumulativeSizeMax !== '')
                ? ' < '
                : null
              }
              {filters.cumulativeSizeMax}
            </td>
            <td></td>
            <td>
              {filters.requiredByCountMin}
              {(filters.requiredByCountMin !== ''
                || filters.requiredByCountMax !== '')
                ? ' < '
                : null
              }
              {filters.requiredByCountMax}
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <ModuleTableBody
          extendedModules={extendedModules}
          onRemoveModule={this.props.onRemoveModule}
        />
      </table>
    );
  }

  renderModuleNameFilter() {
    return (
      <div>
        <label htmlFor="filter-moduleName-like">Matches RegExp</label>
        <code>/<input
          checked
          id="filter-moduleName-like"
          onChange={this.makeOnFilter('moduleName')}
          size="80"
          type="text"
          value={this.state.filters.moduleName || ''}
        />/</code>
      </div>
    );
  }

  renderCumulativeSizeFilter() {
    const {filters} = this.state;

    return (
      <div>
        <label htmlFor="filter-cumulativeSize-min">Min (bytes)</label>
        <input
          id="filter-cumulativeSize-min"
          onChange={this.makeOnFilter('cumulativeSizeMin')}
          type="number"
          value={filters.cumulativeSizeMin}
        />
        <br/>
        <label htmlFor="filter-cumulativeSize-max">Max (bytes)</label>
        <input
          id="filter-cumulativeSize-max"
          onChange={this.makeOnFilter('cumulativeSizeMax')}
          type="number"
          value={filters.cumulativeSizeMax}
         />
      </div>
    );
  }

  renderRequiredByCountFilter() {
    const {filters} = this.state;

    return (
      <div>
        <label htmlFor="filter-requiredByCount-min">Min (bytes)</label>
        <input
          id="filter-requiredByCount-min"
          onChange={this.makeOnFilter('requiredByCountMin')}
          type="number"
          value={filters.requiredByCountMin}
        />
        <br/>
        <label htmlFor="filter-requiredByCount-max">Max (bytes)</label>
        <input
          id="filter-requiredByCount-max"
          onChange={this.makeOnFilter('requiredByCountMax')}
          type="number"
          value={filters.requiredByCountMax}
         />
      </div>
    );
  }

  makeSort(field: string) {
    return (e: SyntheticEvent) => {
      e.preventDefault();
      const sameField = this.state.sort.field === field;
      const otherDirection = this.state.sort.direction === 'ASC'
        ? 'DESC'
        : 'ASC';
      this.setState({
        sort: {
          field,
          direction: sameField ? otherDirection : 'DESC',
        },
      });
    };
  }

  makeOnFilter(field: string) {
    return (event: SyntheticInputEvent) => {
      this.setState({
        filters: {
          ...this.state.filters,
          [field]: event.target.value,
        },
      });
    };
  }

}
