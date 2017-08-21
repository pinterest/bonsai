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
  children?: React.Element<any>,
};

function readFile(
  file: File,
  callback: OnChangeCallback,
) {
  const reader = new FileReader();
  reader.onload = function(event: {target: {result: string}}) {
    callback(file.name, event.target.result);
  };
  reader.readAsText(file);
}

export default class DragDropUpload extends Component<Props, void> {
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
          onChange={this.onChangeFileInput}
        />
        {React.Children.only(this.props.children)}
      </div>
    );
  }

  clickFileInput = () => {
    this._fileInput && this._fileInput.click();
  };

  onChangeFileInput = (event: SyntheticInputEvent<>) => {
    if (
      this._fileInput &&
      this._fileInput.files &&
      this._fileInput.files[0]
    ) {
      readFile(this._fileInput.files[0], this.props.onChange);
    }
  };

  onDragOver = (event: SyntheticDragEvent<>) => {
    event.preventDefault();
  };

  onDragEnter = (event: SyntheticDragEvent<>) => {
    this._dragEntered += 1;
    this.props.onDragEnter && this.props.onDragEnter();
  };

  onDragLeave = (event: SyntheticDragEvent<>) => {
    this._dragEntered -= 1;
    if (this._dragEntered === 0) {
      this.props.onDragLeave && this.props.onDragLeave();
    }
  };

  onDrop = (event: SyntheticDragEvent<>) => {
    event.preventDefault();
    this.props.onLoading();
    readFile(event.dataTransfer.files[0], this.props.onChange);
  };
}
