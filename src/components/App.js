/*
 * @flow
 */

import type {ParsedJSON, RawStats} from '../types/Stats';

import DragDropUpload from './DragDropUpload';
import fetchJSON from '../fetchJSON';
import FileInputRow from './FileInputRow';
import Navbar from './Navbar';
import React, { Component } from 'react';
import Stats from './Stats';

import './App.css'

export type StateProps = {
  dataPaths: Array<string>,
  filename: ?string,
  loading: boolean,
  json: ?RawStats,
};

export type DispatchProps = {
  onPickedFile: (filename: ?string) => void,
  onLoadingFailed: () => void,
  onLoaded: (filename: string, stats: RawStats) => void,
  onDroppedFile: (filename: string, fileText: string) => void,
};

type Props = StateProps & DispatchProps;

type State = {
  isDragging: boolean,
};

export default class App extends Component<void, Props, State> {
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

    if (props.filename && !props.json) {
      const url = props.filename;
      fetchJSON(url).then((json: ParsedJSON) => {
        props.onLoaded(url, json);
      }).catch((error) => {
        console.error(`Failed while fetching json from '${String(url)}'.`, error);
        props.onLoadingFailed();
      });
    }

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
              ? <Stats json={props.json} />
              : null}
          </div>
        </div>
      </div>
    );
  }
}
