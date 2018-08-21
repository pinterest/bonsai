/*
 * @flow
 */

import * as React from 'react';

const NBSP = '\u00A0';

type Props = {
  bytes: number,
  className?: string,
  elem?: 'span' | 'td',
};

function formatBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  }
  const k = 1000;
  const dm = 2;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + NBSP + sizes[i];
}

function toInt(n: number) {
  return String(parseInt(n, 10))
    .split('')
    .reverse()
    .map((s, i) => s + (i % 3 ? '' : ','))
    .reverse()
    .join('')
    .slice(0, -1);
}

export default function Unit(props: Props) {
  const Elem = props.elem || 'span';
  return (
    <Elem className={props.className} title={toInt(props.bytes) + ' bytes'}>
      {formatBytes(props.bytes)}
    </Elem>
  );
}
