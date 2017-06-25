/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import DragDropUpload from './DragDropUpload';
import {fetchApiListEndpoint} from '../fetchJSON';
import FileInputRow from './FileInputRow';
import React, { Component } from 'react';
import getRawStatsFiles from '../types/getRawStatsFiles';

type Props = {
  dataPaths: Array<string>,
  filename: ?string,
  onInitDataPaths: (paths: Array<string>) => void,
  onPickedFile: (filename: ?string) => void,
  onLoadingFailed: () => void,
  onLoaded: (filename: ?string, stats: ?RawStats) => void,
};

type State = {
  isDragging: boolean,
};

export default class FileInputContainer extends Component<void, Props, State> {
  state: State = {
    isDragging: false,
  };

  componentDidMount() {
    if (process.env.REACT_APP_STATS_URL) {
      this.props.onPickedFile(process.env.REACT_APP_STATS_URL);
    }

    fetchApiListEndpoint(
      process.env.REACT_APP_API_LIST_ENDPOINT,
      (paths: Array<string>) => {
        this.props.onInitDataPaths(paths);
      },
    );
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
              dataPaths={this.props.dataPaths.length === 0
                ? null
                : this.props.dataPaths}
              isDragging={this.state.isDragging}
              onStatsFilePicked={this.props.onPickedFile}
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
    this.props.onPickedFile();
  };

  onStatsFileUploaded = (filename: string, fileText: string) => {
    let json;
    let files;
    try {
      json = JSON.parse(fileText);
    } catch (error) {
      alert(`JSON parse error. Unable to load stats file.\n\n${String(error)}\n\nCheck the console for full details.`);
      console.error(error);
      this.props.onLoadingFailed();
      return;
    }

    try {
      files = getRawStatsFiles(filename, json);
    } catch (error) {
      alert(`Invalid stats file.\n\n${String(error)}\n\nCheck the console for full details.`);
      console.error(error);
      this.props.onLoadingFailed();
      return;
    }

    const keys = Object.keys(files);
    const firstKey = keys[0];
    const firstJson = files[firstKey];
    this.props.onLoaded(firstKey, firstJson);

    this.setState({
      isDragging: false,
    });
  };
}
