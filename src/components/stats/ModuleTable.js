/*
 * @flow
 */

import type {ModuleID, ExtendedModule} from '../../types/Stats';

import ShowablePanel from '../ShowablePanel';
import ModuleTableBody from './ModuleTableBody';
import React, { Component } from 'react';

import './css/ModuleTable.css';

type Props = {
  extendedModulesById: {[key: ModuleID]: ExtendedModule},
};

type State = {
  filters: {
    moduleName: RegExp | '',
    cumulativeSizeMin: number | '',
    cumulativeSizeMax: number | '',
  },
  sort: {
    field: string,
    direction: 'ASC' | 'DESC',
  },
};

type Callback = Function;

function makeRecordLikeRegExpFilter(field: string, re: RegExp | '') {
  return function(eModule: ExtendedModule) {
    if (re && !re.test(eModule[field])) {
      return false;
    }
    return true;
  };
}

function makeRecordRangeFilter(field: string, min: number | '', max: number | '') {
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
  } = {};

  render() {
    // $FlowFixMe: flow thinks `values()` returns an `Array<mixed>` here
    let extendedModules: Array<ExtendedModule> = Object.values(this.props.extendedModulesById);

    extendedModules = extendedModules
      .filter(makeRecordLikeRegExpFilter(
        'name',
        this.state.filters.moduleName,
      ))
      .filter(makeRecordRangeFilter(
        'cumulativeSize',
        this.state.filters.cumulativeSizeMin,
        this.state.filters.cumulativeSizeMax,
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
      <table className="ModuleTable" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>
              <ShowablePanel
                trigger='hover'
                panel={this.renderModuleNameFilter(this.onFilter)}>
                <a href="#" onClick={this.makeSort('name')}>
                  Module Name
                </a>
              </ShowablePanel>
            </th>
            <th>
              <ShowablePanel
                trigger='hover'
                panel={this.renderCumulativeSizeFilter(this.onFilter)}>
                <a href="#" onClick={this.makeSort('cumulativeSize')}>
                  Cumulative Size
                </a>
              </ShowablePanel>
            </th>
            <th>Size</th>
            <th>Dependants</th>
            <th>Imports</th>
            <th>Chunks</th>
          </tr>
        </thead>
        <ModuleTableBody
          extendedModules={extendedModules}
        />
      </table>
    );
  }

  renderModuleNameFilter(callback: Callback) {
    return (
      <div>
        <label htmlFor="filter-moduleName-like">Matches RegExp</label>
        <code>/<input
          checked
          id="filter-moduleName-like"
          onChange={callback}
          ref={n => this.filterNodes.moduleName = n}
          size="80"
          type="text"
          value={this.state.filters.moduleName
            ? this.state.filters.moduleName.source
            : ''}
        />/</code>
      </div>
    );
  }

  renderCumulativeSizeFilter(callback: Callback) {
    return (
      <div>
        <label htmlFor="filter-cumulativeSize-min">Min (bytes)</label>
        <input
          id="filter-cumulativeSize-min"
          onChange={callback}
          ref={n => this.filterNodes.cumulativeSizeMin = n}
          type="number"
          value={this.state.filters.cumulativeSizeMin}
        />
        <br/>
        <label htmlFor="filter-cumulativeSize-max">Max (bytes)</label>
        <input
          id="filter-cumulativeSize-max"
          onChange={callback}
          ref={n => this.filterNodes.cumulativeSizeMax = n}
          type="number"
          value={this.state.filters.cumulativeSizeMax}
         />
      </div>
    );
  }

  makeSort(field: string) {
    return (e: SyntheticEvent) => {
      e.preventDefault();
      const sameField = this.state.sort.field === field;
      const otherDirection = this.state.sort.direction === 'ASC' ? 'DESC' : 'ASC';
      this.setState({
        sort: {
          field,
          direction: sameField ? otherDirection : 'DESC',
        },
      });
    };
  }

  onFilter = () => {
    this.setState({
      filters: {
        moduleName: this.filterNodes.moduleName && this.filterNodes.moduleName.value
          ? new RegExp(this.filterNodes.moduleName.value)
          : '',
        cumulativeSizeMin: this.filterNodes.cumulativeSizeMin && this.filterNodes.cumulativeSizeMin.value !== ''
          ? Number(this.filterNodes.cumulativeSizeMin.value)
          : '',
        cumulativeSizeMax: this.filterNodes.cumulativeSizeMax && this.filterNodes.cumulativeSizeMax.value !== ''
          ? Number(this.filterNodes.cumulativeSizeMax.value)
          : '',
      },
    });
  };

}
