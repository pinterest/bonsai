/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import EntryGraph from './EntryGraph';
import ModuleList from './ModuleList';
import parentChunkIds from '../stats/parentChunkIds';
import React, { Component } from 'react';

type Props = {
  stats: RawStats,
};

type State = {
  selectedChunkId: ?number,
};

function list(items) {
  if (!items) {
    return null;
  }
  return (
    <ul>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

export default class StatsTable extends Component<void, Props, State> {
  state: State = {
    selectedChunkId: null,
  };

  render() {
    const chunkData = this.state.selectedChunkId
      ? <div>
          <strong>{this.state.selectedChunkId}</strong>
          {
            list(
              parentChunkIds(this.props.stats, this.state.selectedChunkId)
            )
          }
          <ModuleList modules={[]} />
        </div>
      : null;

    return (
      <div>
        <EntryGraph
          stats={this.props.stats}
          selectedChunkId={this.state.selectedChunkId}
          onSelectChunkId={this.onSelectChunkId}
        />

        {chunkData}
      </div>
    );
  }

  onSelectChunkId = (chunkId: number) => {
    this.setState({
      selectedChunkId: chunkId,
    });
  };

}
