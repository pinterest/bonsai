/*
 * @flow
 */

import type {Module} from '../../types/Stats';

import React from 'react';
import {getClassName} from '../Bootstrap/GlyphiconNames';
import {Link} from '../Bootstrap/Button';

type Props = {
  prefix: ?string,
  module: Module,
};

export default function ExternalModuleLink(props: Props) {
  if (props.prefix) {
    const file = props.module.name;
    const href = props.prefix + file;
    return (
      <Link href={href} newtab={true}>
        <span
          aria-label="Open in new window"
          className={getClassName('new-window')}
        />
      </Link>
    );
  } else {
    return null;
  }
}
