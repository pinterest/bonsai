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

        {this.state.selectedChunkId
          ? this.renderSelectedChunk(
              this.props.stats.raw,
              this.state.selectedChunkId,
            )
          : null
        }
      </div>
    );
  }

  getModuleData(stats: RawStats, selectedChunkId: number) {
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

  renderSelectedChunk(stats: RawStats, selectedChunkId: number) {
    const moduleData = this.getModuleData(stats, selectedChunkId);

    if (!moduleData) {
      return null;
    }

    return (
      <div>
        {moduleData.removed.length
          ? <BlacklistTable
            blacklistedModulesIds={this.state.blacklistedModuleIds}
            removedModules={moduleData.removed}
            onIncludeModule={this.onIncludeModule}
            />
          : null}
        <ModuleTable
          extendedModulesById={calculateModuleSizes(getModulesById(moduleData.included))}
          onRemoveModule={this.onRemoveModule}
        />
      </div>
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
