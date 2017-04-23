/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import FileInputRow from './FileInputRow';
import Navbar from './Navbar';
import React, { Component } from 'react';
import Section from './Section';
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
        <Section>
          <FileInputRow
            filename={this.state.filename}
            onLoading={this.onLoading}
            onLoaded={this.onLoaded}
          />
        </Section>
        <Section>
          {this.state.loading
            ? <p className="center-block"><em>Loading...</em></p>
            : null}
          {this.state.json
            ? <Stats json={this.state.json} />
            : null}
        </Section>
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
