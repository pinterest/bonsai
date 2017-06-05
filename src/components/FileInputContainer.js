/*
 * @flow
 */

import DragDropUpload from './DragDropUpload';
import FileInputRow from './FileInputRow';
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

export default class FileInputContainer extends Component<void, Props, State> {
  state: State = {
    dataPaths: null,
    isDragging: false,
  };

  componentDidMount() {
    if (process.env.REACT_APP_STATS_URL) {
      this.loadPath(process.env.REACT_APP_STATS_URL);
    }

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
            <FileInputRow
              filename={this.props.filename}
              dataPaths={this.state.dataPaths}
              isDragging={this.state.isDragging}
              onStatsFilePicked={this.loadPath}
            />
          </DragDropUpload>
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
    let json;
    try {
      json = JSON.parse(fileText);
    } catch (error) {
      alert(`JSON parse error. Unable to load stats file.\n\n${error}\n\nCheck the console for full details.`);
      console.error(error);
      this.props.onLoaded(null, null);
      return;
    }

    this.props.onLoaded(
      filename,
      json,
    );
  };

  loadPath = (path: string | null) => {
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
  };
}
