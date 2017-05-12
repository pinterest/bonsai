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
  dataPaths: ?Array<string>,
  isDragging: boolean,
};

function fetchJSON(
  endpoint: string,
  callback: (endpoint: string, paths: Array<string>) => void
) {
  fetch(endpoint).then((response) => {
    return response.json();
  }).then((json) => {
    if (!json.paths) {
      console.error('Missing field. `REACT_APP_LIST_ENDPOINT` should return `paths` key. Got:', Object.keys(json));
    } else if (!Array.isArray(json.paths)) {
      console.error('Invalid type: `paths`. Expected `paths` to be an array of web urls. Got:', json.paths);
    } else {
      callback(endpoint, json.paths.map(String));
    }
  }).catch((error) => {
    console.error('Failed to fetch existing stats paths.');
  });
}

export default class App extends Component<void, Props, State> {
  state: State = {
    dataPaths: null,
    isDragging: false,
  };

  componentDidMount() {
    const endpoint = process.env.REACT_APP_API_LIST_ENDPOINT;
    if (endpoint) {
      fetchJSON(endpoint, (fileName, paths) => {
        this.setState({
          dataPaths: paths,
        });
      });
    }
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

          {this.state.dataPaths
            ? <div
                className="form-group col-sm-6"
                onClick={(event: SyntheticEvent) => event.stopPropagation() }>
                <label className="col-sm-2 control-label" htmlFor="data-file-picker">File</label>
                  <div className="col-sm-10">
                    <JsonFilePicker
                      id="data-file-picker"
                      className="form-control"
                      dataPaths={this.state.dataPaths}
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
