/*
 * @flow
 */

import React from 'react';

type Props = {
  anchor: string,
};

export default function OffsetPageAnchor(props: Props) {
  return (
    <span className="OffsetPageAnchor" id={props.anchor} />
  );
}

