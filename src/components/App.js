/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import FileInputContainer from './FileInputContainer';
import Navbar from './Navbar';
import React, { Component } from 'react';
import Stats from './Stats';

import './App.css';

type State = {
  loading: boolean,
  filename: ?string,
  json: ?RawStats,
};

export default class App extends Component<void, {}, State> {
  state: State = {
    loading: false,
    filename: null,
    json: null,
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="AppFixed">
          <div className="AppView">
            <aside className="container-fluid">
              <FileInputContainer
                filename={this.state.filename}
                onLoading={this.onLoading}
                onLoaded={this.onLoaded}
              />
            </aside>
              {this.state.loading
                ? <p className="center-block"><em>Loading...</em></p>
                : null}
              {this.state.json
                ? <Stats json={this.state.json} />
                : null}
          </div>
        </div>
      </div>
    );
  }

  onLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onLoaded = (filename: ?string, stats: ?RawStats) => {
    this.setState({
      loading: false,
      filename: filename,
      json: stats,
    });
  };
}
