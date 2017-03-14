/*
 * @flow
 */

import type {RawStats} from '../types/Stats';

import React, { Component } from 'react';
import './css/App.css';

import FilePicker from './FilePicker';
import StatsTable from './StatsTable';
import HowTo from './HowTo';

function readFile(file, callback) {
  const reader = new FileReader();

  reader.onloadend = function(event) {
    if (event.target.readyState === FileReader.DONE) {
      callback(reader.result);
    }
  };

  reader.readAsText(file);
}

export type State = {
  stats: ?RawStats,
};

class App extends Component {
  state: State = {
    states: null,
  };

  render() {
    const statsTable = this.state.stats
      ? <StatsTable stats={this.state.stats} />
      : <HowTo />;

    return (
      <div className="App">
        <h1>Webpack Dependency Size</h1>
        <FilePicker
          onChange={this.onFileChange}
        />

        {statsTable}
      </div>
    );
  }

  onFileChange = (file) => {
    readFile(file, (fileText) => {
      this.setState({
        stats: JSON.parse(fileText),
      });
    });
  };

}

export default App;
