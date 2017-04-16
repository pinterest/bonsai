/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import FileInputRow from './FileInputRow';
import Navbar from './Navbar';
import React, { Component } from 'react';
import Stats from './Stats';

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
        <aside className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <FileInputRow
                filename={this.state.filename}
                onLoading={this.onLoading}
                onLoaded={this.onLoaded}
              />
            </div>
          </div>
        </aside>
        <main className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              {this.state.loading
                ? <p className="center-block"><em>Loading...</em></p>
                : null}
              {this.state.json
                ? <Stats json={this.state.json} />
                : null}
            </div>
          </div>
        </main>
      </div>
    );
  }

  onLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onLoaded = (filename: string, json: Object) => {
    this.setState({
      loading: false,
      filename: filename,
      json: json,
    });
  };
}
