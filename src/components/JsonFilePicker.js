/*
 * @flow
 */

import React, { Component } from 'react';

type Props = {
  dataFiles: ?Array<string>,
  id?: string,
  className?: string,
  onChange: (event: SyntheticInputEvent) => void,
};

export default class JsonFilePicker extends Component<void, Props, void> {
  render() {
    if (!this.props.dataFiles) {
      return null;
    }

    return (
      <select
        id={this.props.id}
        className={this.props.className}
        onChange={this.props.onChange}>
        <option value=""></option>
        {this.props.dataFiles.map((file) =>
          <option key={file} value={file}>{file}</option>
        )}
      </select>
    );
  }
}
