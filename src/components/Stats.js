/*
 * @flow
 */

import type {ModuleID, RawStats} from '../types/Stats';

import BlacklistTable from './stats/BlacklistTable';
import ChunkBreadcrumb from './stats/ChunkBreadcrumb';
import ChunkDropdown from './stats/ChunkDropdown';
import getChunkModules from '../stats/getChunkModules';
import getExtendedModulesById, {calculateModuleSizes} from '../stats/getExtendedModulesById';
import getModulesById from '../stats/getModulesById';
import ModuleTable from './stats/ModuleTable';
import React, { Component } from 'react';
import splitUnreachableModules from '../stats/splitUnreachableModules';

type Props = {
  json: RawStats,
};

type State = {
  selectedChunkId: ?number,
  blacklistedModuleIds: Array<ModuleID>,
};

export default class Stats extends Component<void, Props, State> {
  state: State = {
    selectedChunkId: null,
    blacklistedModuleIds: [],
  };

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.json !== nextProps.json) {
      this.setState({
        selectedChunkId: null,
        blacklistedModuleIds: [],
      });
    }
  }

  render() {
    const moduleData = this.getModuleData(
      this.props.json,
      this.state.selectedChunkId,
    );

    const blackList = moduleData && moduleData.removed.length
      ? <div className="panel panel-danger">
          <div className="panel-heading">
            {moduleData.removed.length} Modules Ignored
          </div>
          <BlacklistTable
            blacklistedModulesIds={this.state.blacklistedModuleIds}
            removedModules={moduleData.removed}
            onIncludeModule={this.onIncludeModule}
          />
        </div>
      : null;

    // $FlowFixMe: flow thinks `values()` returns an `Array<mixed>` here
    const extendedModules: Array<ExtendedModule> = moduleData
      ? Object.values(calculateModuleSizes(getModulesById(moduleData.included)))
      : [];

    const moduleTable = moduleData
      ? <div className="panel panel-primary">
          <div className="panel-heading">
            {moduleData.removed.length === 0
              ? 'All'
              : moduleData.included.length} Modules Included
          </div>
          <ModuleTable
            extendedModules={extendedModules}
            onRemoveModule={this.onRemoveModule}
          />
        </div>
      : null;

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <ChunkDropdown
              stats={this.props.json}
              selectedChunkId={this.state.selectedChunkId}
              onSelectChunkId={this.onSelectChunkId}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-11 col-sm-push-1">
            {this.state.selectedChunkId
              ? <ChunkBreadcrumb
                stats={this.props.json}
                selectedChunkId={this.state.selectedChunkId}
                totalModules={
                  (moduleData ? moduleData.included.length : 0) +
                  (moduleData ? moduleData.removed.length : 0)
                }
              />
              : null}
          </div>
        </div>
        {blackList}
        {moduleTable}
      </div>
    );
  }

  getModuleData(stats: RawStats, selectedChunkId: ?number) {
    if (!selectedChunkId) {
      return null;
    }

    const modules = getChunkModules(
      stats,
      selectedChunkId,
    );

    if (!modules) {
      return null;
    }

    const extendedModulesById = getExtendedModulesById(modules);

    if (!extendedModulesById) {
      return null;
    }

    return splitUnreachableModules(
      extendedModulesById,
      this.state.blacklistedModuleIds,
    );
  }

  onSelectChunkId = (chunkId: string | number) => {
    this.setState({
      selectedChunkId: Number(chunkId),
      blacklistedModuleIds: [],
    });
  };

  onRemoveModule = (moduleID: ModuleID) => {
    this.setState({
      blacklistedModuleIds: [
        ...this.state.blacklistedModuleIds,
        moduleID,
      ],
    });
  };

  onIncludeModule = (moduleID: ModuleID) => {
    this.setState({
      blacklistedModuleIds: this.state.blacklistedModuleIds.filter(
        (id) => id !== moduleID,
      ),
    });
  };

}
