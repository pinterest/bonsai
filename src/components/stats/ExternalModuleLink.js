/*
 * @flow
 */

import type {Module} from '../../types/Stats';

import * as React from 'react';
import {Link} from '../Bootstrap/Button';
import Octicon, { LinkExternal } from '@github/octicons-react';

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
        <Octicon
          icon={LinkExternal}
          ariaLabel="Open in new window" />
      </Link>
    );
  } else {
    return null;
  }
}
