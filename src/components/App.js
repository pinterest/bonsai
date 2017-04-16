/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import JsonFilePicker from './JsonFilePicker';
import DragDropUpload from './DragDropUpload';
import React, { Component } from 'react';
import Stats from './Stats';

type State = {
  showHoverFilePanel: boolean,
  dataFiles: Array<string>,
  isDragging: boolean,
  loading: boolean,
  stats: ?{
    file: string,
    raw: RawStats,
  },
};

export default class App extends Component<void, void, State> {
  state: State = {
    showHoverFilePanel: false,
    dataFiles: [],
    isDragging: false,
    expandUploadArea: false,
    loading: false,
    stats: null,
  };

  renderFileInputRow() {
    return (
      <div className="well well-sm clearfix">
        <div className="form-horizontal">
          {!this.state.stats || this.state.isDragging
            ? <div className="form-group col-sm-6">
                <label className="control-label">Drag & Drop your <code>stats.json</code> file here</label>
                <span id="drag-drop-helpblock" className="col-sm-12 help-block">
                  Run <kbd>webpack --json > stats.json</kbd> to get started.
                </span>
              </div>
            : <div className="form-group col-sm-6">
                <label className="col-sm-2 control-label">Loaded</label>
                <div className="col-sm-10">
                  <p className="form-control-static">{this.state.stats.file}</p>
                </div>
              </div>
          }

          <div
            className="form-group col-sm-6"
            onClick={(event: SyntheticEvent) => event.stopPropagation() }>
            <label className="col-sm-2 control-label" htmlFor="data-file-picker">File</label>
              <div className="col-sm-10">
                <JsonFilePicker
                  id="data-file-picker"
                  className="form-control"
                  onLoading={this.onLoading}
                  onChange={this.onDataFilePicked}
                />
              </div>
            {!this.state.stats || this.state.isDragging
              ? <span id="drag-drop-helpblock" className="col-sm-12 help-block">
                  or pick an existing stats file.
                </span>
              : null}
          </div>
        </div>
      </div>
    );
  }

  renderFileDropArea() {
    return (
      <DragDropUpload
        id="drag-drop-upload"
        aria-describedby="drag-drop-helpblock"
        className="form-control"
        onDragEnter={() => this.setState({ isDragging: true })}
        onDragLeave={() => this.setState({ isDragging: false })}
        onLoading={this.onLoading}
        onChange={this.onFileUploaded}>
        {this.renderFileInputRow()}
      </DragDropUpload>
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                Webpack Dependency Size
              </a>
            </div>
          </div>
        </nav>
        <aside className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              {this.renderFileDropArea()}
            </div>
          </div>
        </aside>
        <main className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              {this.state.loading ? <p className="center-block"><em>Loading...</em></p> : null}
              {this.state.stats ? <Stats stats={this.state.stats} /> : null}
            </div>
          </div>
        </main>
      </div>
    );
  }

  onToggleHoverFilePanel = () => {
    this.setState({
      showHoverFilePanel: !this.state.showHoverFilePanel,
    });
  };

  onLoading = () => {
    this.setState({
      showHoverFilePanel: false,
      isDragging: false,
      loading: true,
    });
  };

  onFileUploaded = (fileName: string, fileText: string) => {
    this.setState({
      showHoverFilePanel: false,
      loading: false,
      stats: {
        file: fileName,
        raw: JSON.parse(fileText),
      },
    });
  };

  onDataFilePicked = (fileName: string, json: Object) => {
    this.setState({
      showHoverFilePanel: false,
      loading: false,
      stats: {
        file: fileName,
        raw: json,
      },
    });
  };
}
