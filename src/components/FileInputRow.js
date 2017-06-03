/*
 * @flow
 */

import DragDropUpload from './DragDropUpload';
import JsonFilePicker from './JsonFilePicker';
import React, { Component } from 'react';

type Props = {
  filename: ?string,
  onLoading: () => void,
  onLoaded: (filename: ?string, stats: ?Object) => void,
};

type State = {
  dataPaths: ?Array<string>,
  isDragging: boolean,
};

function fetchJSON(
  endpoint: string,
  callback: (endpoint: string, json: Object) => void
) {
  return fetch(endpoint).then((response) => {
    return response.json();
  }).then((json) => {
    callback(endpoint, json);
  });
}

export default class FileInputRow extends Component<void, Props, State> {
  state: State = {
    dataPaths: null,
    isDragging: false,
  };

  constructor(props: Props) {
    super(props);

    this.loadPath(process.env.REACT_APP_STATS_URL || null);
  }

  componentDidMount() {
    const endpoint = process.env.REACT_APP_API_LIST_ENDPOINT;
    if (!endpoint) {
      console.info('Env var \'REACT_APP_API_LIST_ENDPOINT\' was empty. Skipping fetch.');
      return;
    }
    if (process.env.NODE_ENV === 'test') {
      console.info('NODE_ENV is \'test\'. Skipping fetchJSON() in FileInputRow::componentDidMount');
      return;
    }

    fetchJSON(endpoint, (fileName, json) => {
      if (!json.paths) {
        console.error(`Missing field. '${endpoint}' should return '{"paths": []}' key. Got: ${String(Object.keys(json))}`);
      } else if (!Array.isArray(json.paths)) {
        console.error('Invalid type: `paths`. Expected `paths` to be an array of web urls. Got:', json.paths);
      } else {
        this.setState({
          dataPaths: json.paths.map(String),
        });
      }
    }).catch((error) => {
      console.error(`Failed while fetching json from '${endpoint}'.`, error);
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
            onChange={this.onStatsFileUploaded}>
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
                      onChange={this.onStatsFilePicked}
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

  onStatsFileUploaded = (filename: string, fileText: string) => {
    try {
      const json = JSON.parse(fileText);
      this.props.onLoaded(
        filename,
        json,
      );
    } catch (error) {
      this.props.onLoaded(null, null);
    }
  };

  onStatsFilePicked = (event: SyntheticInputEvent) => {
    this.loadPath(event.target.value);
  };

  loadPath(path: string | null): void {
    if (path) {
      this.onLoading();
      fetchJSON(path, (filename, json) => {
        this.props.onLoaded(
          filename,
          json,
        );
      }).catch((error) => {
        console.error(`Failed while fetching json from '${String(path)}'.`, error);
        this.props.onLoaded(null, null);
      });
    }
  }
}
