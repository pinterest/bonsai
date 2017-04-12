/*
 * @flow
 */

import type {ModuleID, RawStats} from '../types/Stats';

import BlacklistTable from './stats/BlacklistTable';
import ChunkGraph from './stats/ChunkGraph';
import ChunkParentList from './stats/ChunkParentList';
import getChunkModules from '../stats/getChunkModules';
import getExtendedModulesById, {calculateModuleSizes} from '../stats/getExtendedModulesById';
import ModuleTable from './stats/ModuleTable';
import React, { Component } from 'react';
import ShowablePanel from './ShowablePanel';
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
        <h3>Loaded: {this.props.stats.file}</h3>
        {this.state.selectedChunkId
          ? this.renderSelectedChunk(
            this.props.stats.raw,
            this.state.selectedChunkId,
          )
          : this.renderChunkSelector(this.props.stats.raw)
        }
      </div>
    );
  }

  renderChunkSelector(stats: RawStats) {
    return (
      <fieldset>
        <h4>Chunk Graph</h4>
        <ChunkGraph
          stats={stats}
          selectedChunkId={null}
          onSelectChunkId={this.onSelectChunkId}
        />
      </fieldset>
    );
  }

  renderSelectedChunk(stats: RawStats, selectedChunkId: number) {
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

    const moduleData = splitUnreachableModules(
      extendedModulesById,
      this.state.blacklistedModuleIds,
    );

    // $FlowFixMe: values strikes again
    const removed: Array<ExtendedModule> = Object.values(moduleData.removed);

    return (
      <fieldset>
        <ShowablePanel
          key={'showing' + selectedChunkId}
          trigger={'click'}
          panel={<ChunkGraph
            stats={stats}
            selectedChunkId={selectedChunkId}
            onSelectChunkId={this.onSelectChunkId}
          />}>
          <h4>Chunk Graph - Selected {String(selectedChunkId)}</h4>
          <ChunkParentList
            stats={stats}
            selectedChunkId={selectedChunkId}
          />
        </ShowablePanel>

        <fieldset>
          <h4>Module Table</h4>
          {removed.length
            ? <BlacklistTable
              blacklistedModulesIds={this.state.blacklistedModuleIds}
              removedModules={removed}
              onIncludeModule={this.onIncludeModule}
              />
            : null}
          <ModuleTable
            extendedModulesById={calculateModuleSizes(moduleData.included)}
            onRemoveModule={this.onRemoveModule}
          />
        </fieldset>
      </fieldset>
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
