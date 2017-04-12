/*
 * @flow
 */

import React, { Component } from 'react';

type OnChangeCallback = (fileName: string, file: string) => void;

type Props = {
  id?: string,
  className?: string,
  'aria-describedby'?: string,
  style?: string,
  onDragEnter?: () => void,
  onDragLeave?: () => void,
  onLoading: () => void,
  onChange: OnChangeCallback,
  children?: React$Element,
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

export default class DragDropUpload extends Component<void, Props, void> {
  _div: ?HTMLElement;
  _fileInput: ?HTMLInputElement;
  _dragEntered = 0;

  render() {
    return (
      <div
        onClick={this.clickFileInput}
        style={this.props.style}
        ref={(div) => {
          this._div = div;
          if (div) {
            div.addEventListener('dragover', this.onDragOver);
            div.addEventListener('dragenter', this.onDragEnter);
            div.addEventListener('dragleave', this.onDragLeave);
            div.addEventListener('drop', this.onDrop);
          }
        }}>
        <input
          id={this.props.id}
          style={{display: 'none'}}
          className={this.props.className}
          type="file"
          ref={(input) => { this._fileInput = input; }}
        />
        {React.Children.only(this.props.children)}
      </div>
    );
  }

  clickFileInput = () => {
    this._fileInput.click();
  };

  onDragOver = (event: DragEventHandler) => {
    event.preventDefault();
  };

  onDragEnter = (event: DragEventHandler) => {
    this._dragEntered += 1;
    this.props.onDragEnter && this.props.onDragEnter();
  };

  onDragLeave = (event: DragEventHandler) => {
    this._dragEntered -= 1;
    if (this._dragEntered === 0) {
      this.props.onDragLeave && this.props.onDragLeave();
    }
  };

  onDrop = (event: DragEventHandler) => {
    event.preventDefault();
    this.props.onLoading();
    readFile(event.dataTransfer.files[0], this.props.onChange);
  };
}
