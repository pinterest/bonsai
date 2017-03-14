/*
 * @flow
 */

import React, { Component } from 'react';

type JSONCallback = (fileName: string, json: Object) => void;

type Props = {
  onLoading: () => void,
  onChange: JSONCallback,
};
type State = {
  dataFiles: Array<string>,
};

function fetchJSON(file: string, callback: JSONCallback) {
  fetch(file).then((response) => {
    return response.json();
  }).then((json) => {
    callback(file, json);
  });
}

export default class DataFilePicker extends Component<void, Props, State> {
  state: State = {
    dataFiles: [],
  };

  componentDidMount() {
    fetchJSON('/data/index.json', (fileName, json) => {
      this.setState({
        dataFiles: json.files,
      });
    });
  }

  render() {
    return (
      <select onChange={this.onChange}>
        <option value="">-- ./data files --</option>
        {this.state.dataFiles.map((file) =>
          <option key={file} value={file}>{file}</option>
        )}
      </select>
    );
  }

  onChange = (event: Event) => {
    if (event.target.value) {
      this.props.onLoading();
      fetchJSON(String(event.target.value), (fileName, json) => {
        this.props.onChange(fileName, json);
      });
    }
  };

}
