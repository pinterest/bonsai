/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import DragDropUpload from './DragDropUpload';
import FileInputRow from './FileInputRow';
import Navbar from './Navbar';
import React, { Component } from 'react';
import SelectedChunkContainer from './SelectedChunkContainer';

import './App.css';

export type StateProps = {
  dataPaths: Array<string>,
  filename: ?string,
  loading: boolean,
  json: ?RawStats,
};

export type DispatchProps = {
  onPickedFile: (filename: ?string) => void,
  onDroppedFile: (filename: string, fileText: string) => void,
};

type Props = StateProps & DispatchProps;

type State = {
  isDragging: boolean,
};

export default class App extends Component<Props, State> {
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
    const props = this.props;

    return (
      <div className="App">
        <Navbar />
        <div className="AppFixed">
          <div className="AppView">
            <aside className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <DragDropUpload
                    id="drag-drop-upload"
                    aria-describedby="drag-drop-helpblock"
                    className="form-control"
                    onDragEnter={() => this.setState({ isDragging: true })}
                    onDragLeave={() => this.setState({ isDragging: false })}
                    onLoading={props.onPickedFile}
                    onChange={props.onDroppedFile}>
                    <FileInputRow
                      filename={props.filename}
                      dataPaths={props.dataPaths.length === 0
                        ? null
                        : props.dataPaths}
                      isDragging={this.state.isDragging}
                      onStatsFilePicked={props.onPickedFile}
                    />
                  </DragDropUpload>
                </div>
              </div>
            </aside>
            {props.loading
              ? <p className="center-block"><em>Loading...</em></p>
              : null}
            {props.json
              ? <SelectedChunkContainer json={props.json} />
              : null}
          </div>
        </div>
      </div>
    );
  }
}
