/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import React, { Component } from 'react';
import EntryGraph from './EntryGraph';

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
    return (
      <div>
        <EntryGraph
          stats={this.props.stats}
          onSelectEntry={this.onSelectEntry}
        />
        <div>
          {this.state.selectedChunkId}
        </div>
      </div>
    );
  }

  onSelectEntry = (chunkId: number) => {
    this.setState({
      selectedChunkId: chunkId,
    });
  };

}
