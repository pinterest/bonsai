/*
 * @flow
 */

import React from 'react';

import './OffsetPageAnchor.css';

type Props = {
  anchor: string,
};

export default function OffsetPageAnchor(props: Props) {
  return (
    <span className="OffsetPageAnchor" id={props.anchor} />
  );
}

