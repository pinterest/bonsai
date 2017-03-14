/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import ChunkData from './ChunkData';
import EntryGraph from './EntryGraph';
import React, { Component } from 'react';

type Props = {
  stats: RawStats,
};

type State = {
  selectedChunkId: ?number,
};

export default class StatsTable extends Component<void, Props, State> {
  state: State = {
    selectedChunkId: null,
  };

  render() {
    const selectedChunkData = this.state.selectedChunkId
      ? <ChunkData
        stats={this.props.stats}
        selectedChunkId={this.state.selectedChunkId}
      />
      : null;

    return (
      <div>
        <EntryGraph
          stats={this.props.stats}
          selectedChunkId={this.state.selectedChunkId}
          onSelectChunkId={this.onSelectChunkId}
        />

        {selectedChunkData}
      </div>
    );
  }

  onSelectChunkId = (chunkId: number) => {
    this.setState({
      selectedChunkId: chunkId,
    });
  };

}
