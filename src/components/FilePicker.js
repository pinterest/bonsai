/*
 * @flow
 */

import React, { Component } from 'react';

type Props = {
  onChange: (file: Object) => void,
};

export default class FilePicker extends Component<void, Props, void> {
  render() {
    return (
      <div className="FilePicker">
        <input
          type="file"
          ref={(input) => {
            if (input) {
              input.addEventListener('dragover', this.onDragOver);
              input.addEventListener('drop', this.onDrop);
            }
          }}
        />
      </div>
    );
  }

  onDragOver = (event) => {
    event.preventDefault();
  };

  onDrop = (event) => {
    event.preventDefault();
    this.props.onChange(event.dataTransfer.files[0]);
  };
}
