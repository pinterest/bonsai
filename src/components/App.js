/*
 * @flow
 */

import DragDropUpload from './DragDropUpload';
import FileSelectorsContainer from './FileSelectorsContainer';
import Navbar from './Navbar';
import React, { Component } from 'react';
import SelectedChunk from './stats/SelectedChunk';
import LoadingSpinner from './LoadingSpinner';

import './App.css';

export type StateProps = {
  appState: 'empty' | 'loading' | 'loaded',
};

export type DispatchProps = {
  onPickedFile: (path: string) => void,
  onDroppedFile: (path: string, fileText: string) => void,
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
      return <LoadingSpinner />;
    case 'loaded':
      return <SelectedChunk />;
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
    const showHelp = props.appState === 'empty' || this.state.isDragging;

    return (
      <div className="App">
        <Navbar />
        <div className="AppFixed">
          <div className="AppView container-fluid">
            <aside>
              <DragDropUpload
                id="drag-drop-upload"
                aria-describedby="drag-drop-helpblock"
                className="form-control"
                onDragEnter={() => this.setState({ isDragging: true })}
                onDragLeave={() => this.setState({ isDragging: false })}
                onChange={props.onPickedFile}
                didGetFile={props.onDroppedFile}>
                <FileSelectorsContainer />
                {showHelp
                  ? <div className="card">
                    <div className="card-header">
                      <label className="control-label">Drag & Drop your <code>stats.json</code> file here</label>
                      <p id="drag-drop-helpblock" className="col-sm-12 help-block">
                        Run <kbd>webpack --json &gt; stats.json</kbd> to get started.
                      </p>
                    </div>
                  </div>
                  : null}
              </DragDropUpload>
            </aside>
            <main>
              {getContent(props)}
            </main>
          </div>
        </div>
      </div>
    );
  }
}
