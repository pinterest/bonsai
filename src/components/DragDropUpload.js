/*
 * @flow
 */

import * as React from 'react';

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
  children: ?React.Node,
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

export default class DragDropUpload extends React.Component<Props, void> {
  _div: ?HTMLElement;
  _fileInput: ?HTMLInputElement;
  _dragEntered = 0;

  render() {
    return (
      <div
        onClick={this.clickFileInput}
        style={this.props.style}
        ref={(div: ?HTMLDivElement) => {
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
        {this.props.children}
      </div>
    );
  }

  clickFileInput = () => {
    this._fileInput && this._fileInput.click();
  };

  onChangeFileInput = () => {
    if (
      this._fileInput &&
      this._fileInput.files &&
      this._fileInput.files[0]
    ) {
      readFile(this._fileInput.files[0], this.props.onChange);
    }
  };

  onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  onDragEnter = () => {
    this._dragEntered += 1;
    this.props.onDragEnter && this.props.onDragEnter();
  };

  onDragLeave = () => {
    this._dragEntered -= 1;
    if (this._dragEntered === 0) {
      this.props.onDragLeave && this.props.onDragLeave();
    }
  };

  onDrop = (event: DragEvent) => {
    event.preventDefault();
    this.props.onLoading();
    if (event.dataTransfer) {
      readFile(event.dataTransfer.files[0], this.props.onChange);
    } else {
      // eslint-disable-next-line no-console
      console.warn('No mouse-drop data found.');
    }
  };
}
