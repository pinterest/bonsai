/*
 * @flow
 */

import DragDropUpload from './DragDropUpload';
import FileSelectorsContainer from './FileSelectorsContainer';
import Navbar from './Navbar';
import React, { Component } from 'react';
import SelectedChunkContainer from './SelectedChunkContainer';

import './App.css';

export type StateProps = {
  appState: 'empty' | 'loading' | 'loaded',
};

export type DispatchProps = {
  onPickedFile: (position: 'A' | 'B', filename: ?string) => void,
  onDroppedFile: (filename: string, fileText: string) => void,
};

type Props = StateProps & DispatchProps;

type State = {
  isDragging: boolean,
};

function getContent(props: Props) {
  switch(props.appState) {
    case 'empty':
      return null;
    case 'loading':
      return <p className="center-block"><em>Loading...</em></p>;
    case 'loaded':
      return <SelectedChunkContainer />;
    default:
      throw new Error(`Invalid appState: ${JSON.stringify(props.appState)}`);
  }
}

export default class App extends Component<Props, State> {
  state: State = {
    isDragging: false,
  };

  render() {
    const props = this.props;
    const showHelp = !props.appState === 'empty' || this.state.isDragging;

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
                    onLoading={props.onPickedFile.bind(null, 'A')}
                    onChange={props.onDroppedFile}>
                    <FileSelectorsContainer />
                    {showHelp
                      ? <div className="well well-sm clearfix">
                        <div className="col-sm-12">
                          <label className="control-label">Drag & Drop your <code>stats.json</code> file here</label>
                          <span id="drag-drop-helpblock" className="col-sm-12 help-block">
                            Run <kbd>webpack --json &gt; stats.json</kbd> to get started.
                          </span>
                        </div>
                      </div>
                      : null}
                  </DragDropUpload>
                </div>
              </div>
            </aside>
            {getContent(props)}
          </div>
        </div>
      </div>
    );
  }
}
