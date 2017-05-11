/*
 * @flow
 */

import DragDropUpload from './DragDropUpload';
import JsonFilePicker from './JsonFilePicker';
import React, { Component } from 'react';

type Props = {
  filename: ?string,
  onLoading: () => void,
  onLoaded: (filename: string, json: Object) => void,
};

type State = {
  dataFiles: ?Array<string>,
  isDragging: boolean,
};

function fetchJSON(file: string, callback: JSONCallback) {
  fetch(file).then((response) => {
    return response.json();
  }).then((json) => {
    callback(file, json);
  }).catch((error) => {
    console.log('Failed to fetch existing stats files');
  });
}

export default class App extends Component<void, Props, State> {
  state: State = {
    dataFiles: null,
    isDragging: false,
  };

  componentDidMount() {
    fetchJSON('/data/index.json', (fileName, json) => {
      this.setState({
        dataFiles: json.files,
      });
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <DragDropUpload
            id="drag-drop-upload"
            aria-describedby="drag-drop-helpblock"
            className="form-control"
            onDragEnter={() => this.setState({ isDragging: true })}
            onDragLeave={() => this.setState({ isDragging: false })}
            onLoading={this.onLoading}
            onChange={this.onFileUploaded}>
            {this.renderFileInputRow(
              this.props.filename,
              this.state.isDragging,
            )}
          </DragDropUpload>
        </div>
      </div>
    );
  }

  renderFileInputRow(filename: ?string, isDragging: boolean) {
    if (filename) {
      return (
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-1 control-label">Filename</label>
            <div className="col-sm-11">
              <p className="form-control-static">{filename}</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="well well-sm clearfix">
        <div className="form-horizontal">
          {!filename || isDragging
            ? <div className="form-group col-sm-6">
                <label className="control-label">Drag & Drop your <code>stats.json</code> file here</label>
                <span id="drag-drop-helpblock" className="col-sm-12 help-block">
                  Run <kbd>webpack --json > stats.json</kbd> to get started.
                </span>
              </div>
            : <div className="form-group col-sm-6">
                <label className="col-sm-2 control-label">Loaded</label>
                <div className="col-sm-10">
                  <p className="form-control-static">{filename}</p>
                </div>
              </div>
          }

          {this.state.dataFiles
            ? <div
                className="form-group col-sm-6"
                onClick={(event: SyntheticEvent) => event.stopPropagation() }>
                <label className="col-sm-2 control-label" htmlFor="data-file-picker">File</label>
                  <div className="col-sm-10">
                    <JsonFilePicker
                      id="data-file-picker"
                      className="form-control"
                      dataFiles={this.state.dataFiles}
                      onChange={this.onDataFilePicked}
                    />
                  </div>
                {!filename || isDragging
                  ? <span id="drag-drop-helpblock" className="col-sm-12 help-block">
                      or pick an existing stats file.
                    </span>
                  : null}
              </div>
            : null}
        </div>
      </div>
    );
  }

  onLoading = () => {
    this.setState({
      isDragging: false,
    });
    this.props.onLoading();
  };

  onFileUploaded = (filename: string, fileText: string) => {
    this.props.onLoaded(
      filename,
      JSON.parse(fileText),
    );
  };

  onDataFilePicked = (event: SyntheticInputEvent) => {
    if (event.target.value) {
      this.onLoading();
      fetchJSON(String(event.target.value), (filename, json) => {
        this.props.onLoaded(
          filename,
          json,
        );
      });
    }
  };
}
