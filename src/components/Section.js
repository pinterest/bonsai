/*
 * @flow
 */

import React from 'react';

type Props = {
  children?: string
    | React$Element<any>
    | Array<React$Element<any>>,
};

export default function Section(props: Props) {
  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-xs-12">
          {props.children}
        </div>
      </div>
    </section>
  );
}

