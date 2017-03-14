/*
 * @flow
 */

import React, { Component } from 'react';

type OnChangeCallback = (fileName: string, file: string) => void;

type Props = {
  onLoading: () => void,
  onChange: OnChangeCallback,
};

function readFile(
  file: File,
  callback: OnChangeCallback,
) {
  const reader = new FileReader();

  reader.onloadend = function(event) {
    if (event.target.readyState === reader.DONE) {
      callback(file.name, reader.result);
    }
  };

  reader.readAsText(file);
}

export default class FilePicker extends Component<void, Props, void> {
  render() {
    return (
      <input
        type="file"
        ref={(input) => {
          if (input) {
            input.addEventListener('dragover', this.onDragOver);
            input.addEventListener('drop', this.onDrop);
          }
        }}
      />
    );
  }

  onDragOver = (event: DragEventHandler) => {
    event.preventDefault();
  };

  onDrop = (event: DragEventHandler) => {
    event.preventDefault();
    this.props.onLoading();
    readFile(event.dataTransfer.files[0], this.props.onChange);
  };
}
