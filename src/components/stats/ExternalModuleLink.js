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
  // https://phabricator.pinadmin.com/diffusion/P/browse/master/webapp/app/mobile/index.js$20
  // https://phabricator.pinadmin.com/diffusion/P/browse/master/
  // ../../../../../app/analytics/modules/SelectButtonWrapper/SelectButtonWrapper.js
  // ../../../../../app/analytics/modules/SelectButtonWrapper/SelectButtonWrapper.js

  // REACT_APP_FILE_URL_PREFIX=https://phabricator.pinadmin.com/diffusion/P/browse/master/webapp/a/b/c/d/e/

  // https://phabricator.pinadmin.com/diffusion/P/browse/master/webapp/a/b/c/d/e/../../../../../app/analytics/modules/SelectButtonWrapper/SelectButtonWrapper.js
  if (props.prefix) {
    const file = props.module.name;
    const href = props.prefix + file;
    return (
      <Link href={href} newtab={true}>
        <span className={getClassName('new-window')} />
      </Link>
    );
  } else {
    return null;
  }
}
