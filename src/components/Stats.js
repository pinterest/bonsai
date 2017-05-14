/*
 * @flow
 */

import type {ModuleID, RawStats} from '../types/Stats';

import BlacklistTable from './stats/BlacklistTable';
import ChunkBreadcrumb from './stats/ChunkBreadcrumb';
import ChunkDropdown from './stats/ChunkDropdown';
import fullModuleData from '../stats/fullModuleData';
import ModuleTable from './stats/ModuleTable';
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
    const {
      moduleData,
      extendedModules,
    } = fullModuleData(
      this.props.json,
      this.state.selectedChunkId,
      this.state.blacklistedModuleIds,
    );

    const blackList = moduleData && moduleData.removed.length
      ? <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-danger">
              <div className="panel-heading">
                {moduleData.removed.length} Modules Ignored
              </div>
              <BlacklistTable
                blacklistedModulesIds={this.state.blacklistedModuleIds}
                removedModules={moduleData.removed}
                onIncludeModule={this.onIncludeModule}
              />
            </div>
          </div>
        </div>
      : null;

    const moduleTable = moduleData
      ? <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-primary">
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
          </div>
        </div>
      : null;

    return (
      <main className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <ChunkDropdown
              stats={this.props.json}
              selectedChunkId={this.state.selectedChunkId}
              onSelectChunkId={this.onSelectChunkId}
            />
          </div>
        </div>
        {this.state.selectedChunkId
          ? <div className="row">
              <div className="col-sm-11 col-sm-push-1">
                <ChunkBreadcrumb
                  stats={this.props.json}
                  selectedChunkId={this.state.selectedChunkId}
                  totalModules={
                    (moduleData ? moduleData.included.length : 0) +
                    (moduleData ? moduleData.removed.length : 0)
                  }
                />
              </div>
            </div>
          : null}
        {blackList}
        {moduleTable}
      </main>
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
