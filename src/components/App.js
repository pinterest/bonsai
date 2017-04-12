/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import JsonFilePicker from './JsonFilePicker';
import DragDropUpload from './DragDropUpload';
import React, { Component } from 'react';
import Stats from './Stats';

type State = {
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
    dataFiles: [],
    isDragging: false,
    loading: false,
    stats: null,
  };

  renderFileForms() {
    const dropZoneContaner = {
      margin: '-42px -38px',
    };
    const borderDropZone = {
      border: '2px dashed #adadad',
      borderRadius: '6px',
      padding: '40px 40px 20px 40px',
      boxSizing: 'border-box',
    };
    const borderDropZoneDragging = {
      border: '3px solid #adadad',
      background: '#ddd',
      borderRadius: '6px',
      padding: '40px 40px 20px 40px',
      boxSizing: 'border-box',
    };

    return (
      <div className="jumbotron">
        <div style={dropZoneContaner}>
          <DragDropUpload
            id="drag-drop-upload"
            aria-describedby="drag-drop-helpblock"
            className="form-control"
            onDragEnter={() => this.setState({ isDragging: true })}
            onDragLeave={() => this.setState({ isDragging: false })}
            onLoading={this.onLoading}
            onChange={this.onFileUploaded}>
            <div className="row" style={this.state.isDragging ? borderDropZoneDragging : borderDropZone}>
              <form
                className="col-sm-6 form-horizontal"
                onClick={(event: SyntheticEvent) => event.stopPropagation() }>
                <p>Pick an existing stats file</p>
                <div className="form-group">
                  <label className="col-sm-1 control-label" htmlFor="data-file-picker">File</label>
                  <div className="col-sm-6">
                    <JsonFilePicker
                      id="data-file-picker"
                      className="form-control"
                      onLoading={this.onLoading}
                      onChange={this.onDataFilePicked}
                    />
                  </div>
                </div>
              </form>
              <div className="col-sm-6">
                <p>or Drag & Drop your <code>stats.json</code> file here</p>
                <span id="drag-drop-helpblock" className="col-sm-12 help-block">
                  Run <kbd>webpack --json > stats.json</kbd> to get started.
                </span>
              </div>
            </div>
          </DragDropUpload>
        </div>
      </div>
    );
  }

  render() {
    const style= {
      paddingTop: `${50 + 20}px`,
    };

    return (
      <div style={style}>
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
              {this.renderFileForms()}
            </div>
          </div>
        </aside>
        <main className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              {this.state.loading ? <p><em>Loading...</em></p> : null}
              {this.state.stats ? <Stats stats={this.state.stats} /> : null}
            </div>
          </div>
        </main>
      </div>
    );
  }

  onLoading = () => {
    this.setState({
      isDragging: false,
      loading: true,
    });
  };

  onFileUploaded = (fileName: string, fileText: string) => {
    this.setState({
      loading: false,
      stats: {
        file: fileName,
        raw: JSON.parse(fileText),
      },
    });
  };

  onDataFilePicked = (fileName: string, json: Object) => {
    this.setState({
      loading: false,
      stats: {
        file: fileName,
        raw: json,
      },
    });
  };
}
