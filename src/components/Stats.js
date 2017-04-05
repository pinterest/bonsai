/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import ChunkGraph from './stats/ChunkGraph';
import ChunkParentList from './stats/ChunkParentList';
import getExtendedModulesById from '../stats/getExtendedModulesById';
import ModuleTable from './stats/ModuleTable';
import React, { Component } from 'react';
import ShowablePanel from './ShowablePanel';

type Props = {
  stats: {
    file: string,
    raw: RawStats,
  },
};

type State = {
  selectedChunkId: ?number,
};

export default class Stats extends Component<void, Props, State> {
  state: State = {
    selectedChunkId: null,
  };

  render() {
    return (
      <div>
        <h3>Loaded: {this.props.stats.file}</h3>
        {this.state.selectedChunkId
          ? this.renderSelectedChunk(this.props.stats.raw, this.state.selectedChunkId)
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
    const extendedModulesById = getExtendedModulesById(stats, selectedChunkId);

    if (!extendedModulesById) {
      return null;
    }

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
          <ModuleTable
            extendedModulesById={extendedModulesById}
          />
        </fieldset>
      </fieldset>
    );
  }

  onSelectChunkId = (chunkId: number) => {
    this.setState({
      selectedChunkId: chunkId,
    });
  };

}
