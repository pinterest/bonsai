/*
 * @flow
 */

import type {ModuleID, RawStats} from '../types/Stats';

import SelectedChunk from './stats/SelectedChunk';
import React, { Component } from 'react';

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
    return (
      <SelectedChunk
        json={this.props.json}
        selectedChunkId={this.state.selectedChunkId}
        blacklistedModuleIds={this.state.blacklistedModuleIds}

        onSelectChunkId={this.onSelectChunkId}
        onRemoveModule={this.onRemoveModule}
        onIncludeModule={this.onIncludeModule}
      />
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
