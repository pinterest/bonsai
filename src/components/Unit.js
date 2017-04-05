/*
 * @flow
 */

import React from 'react';

const NBSP = '\u00A0';

type Props = {
  bytes: number,
};

function formatBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  }
  var k = 1000;
  var dm = 0;
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + NBSP + sizes[i];
}

export default function Unit(props: Props) {
  return (
    <span title={props.bytes}>
      {formatBytes(props.bytes)}
    </span>
  );
}

