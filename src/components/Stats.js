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
  stats: {
    file: string,
    raw: RawStats,
  },
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
    if (this.props.stats.file !== nextProps.stats.file) {
      this.setState({
        selectedChunkId: null,
        blacklistedModuleIds: [],
      });
    }
  }

  render() {
    const moduleData = this.getModuleData(
      this.props.stats.raw,
      this.state.selectedChunkId,
    );

    const blackList = moduleData && moduleData.removed.length
      ? <div className="panel panel-danger">
          <div className="panel-heading">Ignored Modules</div>
          <BlacklistTable
            blacklistedModulesIds={this.state.blacklistedModuleIds}
            removedModules={moduleData.removed}
            onIncludeModule={this.onIncludeModule}
          />
        </div>
      : null;
    const moduleTable = moduleData
      ? <div className="panel panel-primary">
          <div className="panel-heading">All Modules</div>
          <ModuleTable
            extendedModulesById={calculateModuleSizes(getModulesById(moduleData.included))}
            onRemoveModule={this.onRemoveModule}
          />
        </div>
      : null;

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <ChunkDropdown
              stats={this.props.stats.raw}
              selectedChunkId={this.state.selectedChunkId}
              onSelectChunkId={this.onSelectChunkId}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.state.selectedChunkId
              ? <ChunkBreadcrumb
                stats={this.props.stats.raw}
                selectedChunkId={this.state.selectedChunkId}
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

  onSelectChunkId = (chunkId: number) => {
    this.setState({
      selectedChunkId: chunkId,
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
