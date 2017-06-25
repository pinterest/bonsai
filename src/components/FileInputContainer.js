/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import DragDropUpload from './DragDropUpload';
import FileInputRow from './FileInputRow';
import React, { Component } from 'react';

type Props = {
  dataPaths: Array<string>,
  filename: ?string,
  onPickedFile: (filename: ?string) => void,
  onLoadingFailed: () => void,
  onLoaded: (filename: ?string, stats: ?RawStats) => void,
  onDroppedFile: (filename: string, fileText: string) => void,
};

type State = {
  isDragging: boolean,
};

export default class FileInputContainer extends Component<void, Props, State> {
  state: State = {
    isDragging: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.filename !== nextProps.filename) {
      this.setState({
        isDragging: false,
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
            onLoading={this.props.onPickedFile}
            onChange={this.props.onDroppedFile}>
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
}
