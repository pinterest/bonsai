#!/usr/bin/env node

/**
 * @flow
 */

import getParser from './cli/getParser';
import main from './cli/main';
import resolveArgs from './cli/resolveArgs';

const parser = getParser();

main(
  resolveArgs(
    parser.parseArgs()
  )
);
