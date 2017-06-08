/*
 * @flow
 */

import type {ParsedJSON, RawStats} from '../types/Stats';

import DragDropUpload from './DragDropUpload';
import fetchJSON from '../fetchJSON';
import FileInputRow from './FileInputRow';
import React, { Component } from 'react';
import getRawStatsFiles from '../types/getRawStatsFiles';

type Props = {
  filename: ?string,
  onLoading: () => void,
  onLoaded: (filename: ?string, stats: ?Object) => void,
};

type State = {
  dataPaths: ?Array<string>,
  isDragging: boolean,
  filesSeen: {[name: string]: RawStats},
};

function concatItemToSet(list: Array<string>, item: string): Array<string> {
  return list.includes(item)
    ? list
    : list.concat(item);
}

export default class FileInputContainer extends Component<void, Props, State> {
  state: State = {
    dataPaths: null,
    isDragging: false,
    filesSeen: {},
  };

  componentDidMount() {
    if (process.env.REACT_APP_STATS_URL) {
      this.loadURL(process.env.REACT_APP_STATS_URL);
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

    fetchJSON(endpoint).then((json) => {
      if (!json.paths) {
        console.error(`Missing field. '${endpoint}' should return '{"paths": []}' key. Got: ${String(Object.keys(json))}`);
      } else if (!Array.isArray(json.paths)) {
        console.error('Invalid type: `paths`. Expected `paths` to be an array of web urls. Got:', json.paths);
      } else {
        this.setState({
          dataPaths: json.paths.map(String).reduce(
            concatItemToSet,
            this.state.dataPaths || [],
          ),
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
              onStatsFilePicked={this.loadURL}
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

  didLoad(filename: string, json: ParsedJSON) {
    let files;
    try {
      files = getRawStatsFiles(filename, json);
    } catch (error) {
      alert(`Invalid stats file.\n\n${String(error)}\n\nCheck the console for full details.`);
      console.error(error);
      this.props.onLoaded(null, null);
      return;
    }

    const keys = Object.keys(files);
    const firstKey = keys[0];
    const firstJson = files[firstKey];
    this.props.onLoaded(firstKey, firstJson);

    this.setState({
      isDragging: false,
      dataPaths: keys.reduce(
        concatItemToSet,
        this.state.dataPaths || [],
      ),
      filesSeen: {
        ...this.state.filesSeen,
        ...files,
      },
    });
  }

  onStatsFileUploaded = (filename: string, fileText: string) => {
    try {
      this.didLoad(filename, JSON.parse(fileText));
    } catch (error) {
      alert(`JSON parse error. Unable to load stats file.\n\n${String(error)}\n\nCheck the console for full details.`);
      console.error(error);
      this.props.onLoaded(null, null);
      return;
    }
  };

  loadURL = (url: string) => {
    if (Object.keys(this.state.filesSeen).includes(url)) {
      this.props.onLoaded(url, this.state.filesSeen[url]);
      this.setState({
        isDragging: false,
      });
    } else {
      this.onLoading();
      fetchJSON(url).then((json: ParsedJSON) => {
        this.didLoad(url, json);
      }).catch((error) => {
        console.error(`Failed while fetching json from '${String(url)}'.`, error);
        this.props.onLoaded(null, null);
      });
    }
  };
}
