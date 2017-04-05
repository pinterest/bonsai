/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import ChunkGraph from './stats/ChunkGraph';
import ChunkParentList from './stats/ChunkParentList';
import getExtendedModulesById from '../stats/getExtendedModulesById';
import getNodeGraph from '../stats/getNodeGraph';
import ModuleTable from './stats/ModuleTable';
import React, { Component } from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';

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
        <fieldset>
          <h4>Chunk Graph</h4>
          <ChunkGraph
            stats={this.props.stats.raw}
            selectedChunkId={this.state.selectedChunkId}
            onSelectChunkId={this.onSelectChunkId}
          />
        </fieldset>

        {this.state.selectedChunkId
          ? this.renderSelectedChunk(this.props.stats.raw, this.state.selectedChunkId)
          : null}
      </div>
    );
  }

  renderSelectedChunk(stats: RawStats, selectedChunkId: number) {
    const extendedModulesById = getExtendedModulesById(stats, selectedChunkId);

    if (!extendedModulesById) {
      return null;
    }

    // $FlowFixMe: flow thinks `values()` returns an `Array<mixed>` here
    let extendedModules: Array<ExtendedModule> = Object.values(extendedModulesById);
    const nodeGraph = getNodeGraph(extendedModules);
    console.log('getNodeGraph', nodeGraph);

    return (
      <fieldset>
        <h4>Selected Chunk = {String(selectedChunkId)}</h4>

        <fieldset>
          <h4>Showing Modules inside Chunks</h4>
          <ChunkParentList
            stats={stats}
            selectedChunkId={selectedChunkId}
          />
        </fieldset>

        <fieldset>
          <h4>Module Table</h4>
          <ModuleTable
            extendedModulesById={extendedModulesById}
          />
        </fieldset>

        <fieldset>
          <h4>Table for network diagram</h4>

          <Sigma
            immutable={true}

            graph={nodeGraph}
            settings={{
              drawEdges: true,
              defaultEdgeColor: '#000',
            }}>
            <RelativeSize initialSize={15} />
            <RandomizeNodePositions />
          </Sigma>
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
